import {isDeployProduction} from './deployMode';
import {parseNonEmptyString} from '../fi/cs/core/types/String';
import {isArray} from '../fi/cs/core/types/Array';
import {isString} from '../fi/cs/core/types/String';
import {isRegularObject} from '../fi/cs/core/types/RegularObject';

export const CHAT_SLAYER_CLIENT_ID_HEADER = 'x-chat-slayer-client-id';

/** Default browser demo client id (served at `/` on the same origin). */
export const DEMO_WEB_CLIENT_ID = 'web-demo';

export interface AllowedClientConfig {
  readonly id: string;
  readonly label?: string;
  readonly origins: readonly string[];
  readonly allowWithoutOrigin: boolean;
}

export interface AllowedClientsConfig {
  readonly clients: readonly AllowedClientConfig[];
  readonly enforced: boolean;
}

function parseBooleanEnv(
  raw: string | undefined,
  defaultValue: boolean,
): boolean {
  if (raw === undefined) {
    return defaultValue;
  }
  const lower = raw.toLowerCase();
  if (lower === 'true' || lower === '1') {
    return true;
  }
  if (lower === 'false' || lower === '0') {
    return false;
  }
  return defaultValue;
}

function isAllowedClientEntry(value: unknown): value is AllowedClientConfig {
  if (!isRegularObject(value)) {
    return false;
  }
  const origins = value.origins;
  return (
    isString(value.id) &&
    value.id.length > 0 &&
    (value.label === undefined || isString(value.label)) &&
    (origins === undefined ||
      (isArray(origins) && origins.every(o => isString(o)))) &&
    (value.allowWithoutOrigin === undefined ||
      typeof value.allowWithoutOrigin === 'boolean')
  );
}

/**
 * Normalize origin/referer to scheme://host:port (no path, no trailing slash).
 */
export function normalizeOrigin(value: string | undefined): string | undefined {
  if (!value || !value.trim()) {
    return undefined;
  }
  const trimmed = value.trim();
  try {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const url = new URL(trimmed);
      return url.origin;
    }
    const url = new URL(trimmed, 'http://placeholder');
    if (url.hostname === 'placeholder') {
      return undefined;
    }
    return url.origin;
  } catch {
    return undefined;
  }
}

function withPublicUrlOrigin(
  clients: readonly AllowedClientConfig[],
  publicUrl: string | undefined,
): readonly AllowedClientConfig[] {
  const origin = normalizeOrigin(publicUrl);
  if (!origin) {
    return clients;
  }
  return clients.map(client => {
    if (client.id !== DEMO_WEB_CLIENT_ID) {
      return client;
    }
    if (client.origins.includes(origin)) {
      return client;
    }
    return {
      ...client,
      origins: [...client.origins, origin],
    };
  });
}

function defaultDemoClientForPublicUrl(
  publicUrl: string | undefined,
): AllowedClientConfig | undefined {
  const origin = normalizeOrigin(publicUrl);
  if (!origin) {
    return undefined;
  }
  return {
    id: DEMO_WEB_CLIENT_ID,
    label: 'Web demo',
    origins: [origin],
    allowWithoutOrigin: false,
  };
}

function normalizeClientEntry(entry: AllowedClientConfig): AllowedClientConfig {
  const origins = (entry.origins ?? [])
    .map(o => normalizeOrigin(o) ?? o)
    .filter(o => o.length > 0);
  return {
    id: entry.id.trim(),
    label: entry.label,
    origins,
    allowWithoutOrigin: entry.allowWithoutOrigin === true,
  };
}

/**
 * Parse ALLOWED_CLIENTS JSON. Throws on invalid JSON or schema.
 */
export function parseAllowedClientsJson(
  json: string,
): readonly AllowedClientConfig[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (err) {
    throw new TypeError(`ALLOWED_CLIENTS is not valid JSON: ${err}`);
  }
  if (!isArray(parsed)) {
    throw new TypeError('ALLOWED_CLIENTS must be a JSON array');
  }
  const clients: AllowedClientConfig[] = [];
  const seenIds = new Set<string>();
  for (let i = 0; i < parsed.length; i += 1) {
    const item = parsed[i];
    if (!isAllowedClientEntry(item)) {
      throw new TypeError(`ALLOWED_CLIENTS[${i}] is not a valid client entry`);
    }
    const normalized = normalizeClientEntry({
      id: item.id,
      label: item.label,
      origins: item.origins ?? [],
      allowWithoutOrigin: item.allowWithoutOrigin === true,
    });
    if (seenIds.has(normalized.id)) {
      throw new TypeError(
        `ALLOWED_CLIENTS: duplicate client id "${normalized.id}"`,
      );
    }
    seenIds.add(normalized.id);
    clients.push(normalized);
  }
  return clients;
}

let cachedAllowedClientsConfig: AllowedClientsConfig | undefined;

export function getAllowedClientsConfig(): AllowedClientsConfig {
  if (!cachedAllowedClientsConfig) {
    cachedAllowedClientsConfig = loadAllowedClientsConfig();
  }
  return cachedAllowedClientsConfig;
}

/** Reset cached config (tests). */
export function resetAllowedClientsConfigCache(): void {
  cachedAllowedClientsConfig = undefined;
}

export function loadAllowedClientsConfig(): AllowedClientsConfig {
  const rawJson = parseNonEmptyString(process?.env?.ALLOWED_CLIENTS);
  const publicUrl = parseNonEmptyString(process?.env?.BACKEND_PUBLIC_URL);
  const enforcedDefault = isDeployProduction();
  const enforced = parseBooleanEnv(
    parseNonEmptyString(process?.env?.CLIENT_ACCESS_ENFORCED),
    enforcedDefault,
  );

  if (!rawJson) {
    const demoClient = defaultDemoClientForPublicUrl(publicUrl);
    return {
      clients: demoClient ? [demoClient] : [],
      enforced,
    };
  }

  return {
    clients: withPublicUrlOrigin(
      parseAllowedClientsJson(rawJson),
      publicUrl,
    ),
    enforced,
  };
}

export function findAllowedClientById(
  clients: readonly AllowedClientConfig[],
  clientId: string | undefined,
): AllowedClientConfig | undefined {
  if (!clientId?.trim()) {
    return undefined;
  }
  const id = clientId.trim();
  return clients.find(c => c.id === id);
}

export function clientAllowsOrigin(
  client: AllowedClientConfig,
  origin: string | undefined,
): boolean {
  if (!origin) {
    return client.allowWithoutOrigin;
  }
  if (client.origins.length === 0) {
    return client.allowWithoutOrigin;
  }
  return client.origins.includes(origin);
}
