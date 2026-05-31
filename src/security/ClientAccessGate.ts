import type {IncomingMessage, ServerResponse} from 'http';
import {
  type AllowedClientsConfig,
  CHAT_SLAYER_CLIENT_ID_HEADER,
  clientAllowsOrigin,
  findAllowedClientById,
  getAllowedClientsConfig,
  normalizeOrigin,
} from '../config/allowedClients';
import {
  isDemoStaticPath,
  isHealthCheckPath,
} from '../demo/serveDemoStatic';
import {isWellKnownChatSlayerPath} from './wellKnownChatSlayer';
import {isClientDisabled} from './DisabledClientsRegistry';
import {
  applyCorsHeaders,
  setCorsAllowOrigin,
} from '../fi/cs/node/CorsResponseContext';
import {createMatrixErrorDTO} from '../fi/cs/matrix/types/response/error/MatrixErrorDTO';
import {MatrixErrorCode} from '../fi/cs/matrix/types/response/error/types/MatrixErrorCode';

export interface ClientAccessDecision {
  readonly allowed: boolean;
  readonly reason?: string;
  readonly corsOrigin?: string;
  readonly clientId?: string;
}

export {resetAllowedClientsConfigCache} from '../config/allowedClients';

function getRequestPath(req: IncomingMessage): string {
  const url = req.url ?? '/';
  const q = url.indexOf('?');
  return q >= 0 ? url.substring(0, q) : url;
}

function isHealthPublicRequest(req: IncomingMessage): boolean {
  const method = req.method?.toUpperCase();
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    return false;
  }
  return isHealthCheckPath(getRequestPath(req));
}

function isWellKnownPublicRequest(req: IncomingMessage): boolean {
  const method = req.method?.toUpperCase();
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    return false;
  }
  return isWellKnownChatSlayerPath(getRequestPath(req));
}

function isDemoPublicRequest(req: IncomingMessage): boolean {
  const method = req.method?.toUpperCase();
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    return false;
  }
  return isDemoStaticPath(getRequestPath(req));
}

function isMatrixPath(path: string): boolean {
  return path.startsWith('/_matrix/') || path.startsWith('/_synapse/');
}

function getHeader(req: IncomingMessage, name: string): string | undefined {
  const raw = req.headers[name.toLowerCase()];
  if (raw === undefined) {
    return undefined;
  }
  return Array.isArray(raw) ? raw[0] : raw;
}

function resolveRequestOrigin(req: IncomingMessage): string | undefined {
  const origin = normalizeOrigin(getHeader(req, 'origin'));
  if (origin) {
    return origin;
  }
  return normalizeOrigin(getHeader(req, 'referer'));
}

export function evaluateClientAccess(
  req: IncomingMessage,
  config: AllowedClientsConfig = getAllowedClientsConfig(),
): ClientAccessDecision {
  if (isHealthPublicRequest(req)) {
    const origin = resolveRequestOrigin(req);
    return {allowed: true, corsOrigin: origin};
  }

  if (isDemoPublicRequest(req)) {
    const origin = resolveRequestOrigin(req);
    return {allowed: true, corsOrigin: origin};
  }

  if (isWellKnownPublicRequest(req)) {
    const origin = resolveRequestOrigin(req);
    return {allowed: true, corsOrigin: origin};
  }

  if (!config.enforced) {
    const origin = resolveRequestOrigin(req);
    return {allowed: true, corsOrigin: origin};
  }

  if (config.clients.length === 0) {
    return {
      allowed: false,
      reason: 'Client access is enforced but ALLOWED_CLIENTS is empty',
    };
  }

  const clientId = getHeader(req, CHAT_SLAYER_CLIENT_ID_HEADER)?.trim();
  if (isClientDisabled(clientId)) {
    return {
      allowed: false,
      reason: clientId
        ? `Client "${clientId}" is disabled due to a TLS fingerprint security alert`
        : 'Client is disabled due to a TLS fingerprint security alert',
      clientId,
    };
  }
  const client = findAllowedClientById(config.clients, clientId);
  if (!client) {
    return {
      allowed: false,
      reason: clientId
        ? `Unknown or missing client id in ${CHAT_SLAYER_CLIENT_ID_HEADER}`
        : `Missing required header ${CHAT_SLAYER_CLIENT_ID_HEADER}`,
    };
  }

  const origin = resolveRequestOrigin(req);
  if (origin) {
    if (!clientAllowsOrigin(client, origin)) {
      return {
        allowed: false,
        reason: `Origin "${origin}" is not allowed for client "${client.id}"`,
        clientId: client.id,
      };
    }
    return {allowed: true, corsOrigin: origin, clientId: client.id};
  }

  if (!client.allowWithoutOrigin) {
    return {
      allowed: false,
      reason: `Client "${client.id}" requires a browser Origin or Referer`,
      clientId: client.id,
    };
  }

  return {allowed: true, clientId: client.id};
}

function writeDeniedResponse(
  req: IncomingMessage,
  res: ServerResponse,
  decision: ClientAccessDecision,
): void {
  const path = getRequestPath(req);
  const message = decision.reason ?? 'Client not allowed';
  const body = isMatrixPath(path)
    ? JSON.stringify(
        createMatrixErrorDTO(MatrixErrorCode.M_FORBIDDEN, message),
        null,
        2,
      )
    : JSON.stringify({error: message}, null, 2);

  res.statusCode = 403;
  res.setHeader('Content-Type', 'application/json');
  res.end(body);
}

function writeOptionsResponse(res: ServerResponse, corsOrigin: string): void {
  applyCorsHeaders(res, corsOrigin);
  res.statusCode = 204;
  res.end();
}

/**
 * Request pre-handler for RequestServerImpl. Returns handled when response was sent.
 */
export async function handleClientAccessGate(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<'continue' | 'handled'> {
  const decision = evaluateClientAccess(req);

  if (!decision.allowed) {
    writeDeniedResponse(req, res, decision);
    return 'handled';
  }

  if (decision.corsOrigin) {
    setCorsAllowOrigin(res, decision.corsOrigin);
  }

  if (req.method?.toUpperCase() === 'OPTIONS') {
    if (decision.corsOrigin) {
      writeOptionsResponse(res, decision.corsOrigin);
      return 'handled';
    }
    res.statusCode = 204;
    res.end();
    return 'handled';
  }

  return 'continue';
}
