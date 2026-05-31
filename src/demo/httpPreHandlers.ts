import type {IncomingMessage, ServerResponse} from 'http';
import {tryServeDemoStatic, tryServeHealth, tryServeWellKnown} from './serveDemoStatic';
import {handleClientAccessGate} from '../security/ClientAccessGate';
import {applySecurityResponseHeaders} from '../security/securityResponseHeaders';
import {tryHandleDemoRequest} from './DemoHttpHandler';

export type HttpPreHandlerResult = 'continue' | 'handled';

/**
 * Client access gate (CORS + client id), then health, demo API, well-known, static, Matrix.
 */
export async function handleHttpPreRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<HttpPreHandlerResult> {
  applySecurityResponseHeaders(res);
  const gateResult = await handleClientAccessGate(req, res);
  if (gateResult === 'handled') {
    return 'handled';
  }
  if (tryServeHealth(req, res)) {
    return 'handled';
  }
  if (await tryHandleDemoRequest(req, res)) {
    return 'handled';
  }
  if (tryServeWellKnown(req, res)) {
    return 'handled';
  }
  if (tryServeDemoStatic(req, res)) {
    return 'handled';
  }
  return 'continue';
}
