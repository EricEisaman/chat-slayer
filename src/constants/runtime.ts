import {
  loadAllowedClientsConfig,
  type AllowedClientsConfig,
} from '../config/allowedClients';
import {loadDemoSseConfig, type DemoSseConfig} from '../config/demoSse';
import {resolveBackendJwtSecret} from '../config/secrets';
import {parseNonEmptyString} from '../fi/cs/core/types/String';
import {LogLevel, parseLogLevel} from '../fi/cs/core/types/LogLevel';
import {BUILD_COMMAND_NAME, BUILD_LOG_LEVEL} from './build';

const DEFAULT_PORT = '8008';
const listenPort = parseNonEmptyString(process?.env?.PORT) ?? DEFAULT_PORT;

function defaultBackendUrl(): string {
  return `http://0.0.0.0:${listenPort}`;
}

function defaultFederationUrl(): string {
  const federationPort =
    parseNonEmptyString(process?.env?.FEDERATION_PORT) ?? '8443';
  return `http://0.0.0.0:${federationPort}`;
}

function parseFederationEnabled(): boolean {
  const raw = parseNonEmptyString(
    process?.env?.FEDERATION_ENABLED,
  )?.toLowerCase();
  if (raw === 'true' || raw === '1') return true;
  if (raw === 'false' || raw === '0') return false;
  return false;
}

export const BACKEND_LOG_LEVEL: LogLevel =
  parseLogLevel(
    parseNonEmptyString(process?.env?.BACKEND_LOG_LEVEL) ??
      parseNonEmptyString(BUILD_LOG_LEVEL),
  ) ?? LogLevel.INFO;
export const BACKEND_SCRIPT_NAME: string =
  parseNonEmptyString(process?.env?.BACKEND_SCRIPT_NAME) ?? BUILD_COMMAND_NAME;
export const BACKEND_URL: string =
  parseNonEmptyString(process?.env?.BACKEND_URL) ?? defaultBackendUrl();
export const FEDERATION_URL: string =
  parseNonEmptyString(process?.env?.FEDERATION_URL) ?? defaultFederationUrl();
export const FEDERATION_ENABLED: boolean = parseFederationEnabled();
export const BACKEND_PUBLIC_URL: string =
  parseNonEmptyString(process?.env?.BACKEND_PUBLIC_URL) ??
  'http://localhost:8008';
export const BACKEND_HOSTNAME: string =
  parseNonEmptyString(process?.env?.BACKEND_HOSTNAME) ?? 'localhost';
export const BACKEND_JWT_SECRET: string = resolveBackendJwtSecret();
export const BACKEND_JWT_ALG: string =
  parseNonEmptyString(process?.env?.BACKEND_JWT_ALG) ?? 'HS256';
export const BACKEND_DEFAULT_LANGUAGE: string =
  parseNonEmptyString(process?.env?.BACKEND_DEFAULT_LANGUAGE) ?? 'en';
export const BACKEND_EMAIL_CONFIG: string =
  parseNonEmptyString(process?.env?.BACKEND_EMAIL_CONFIG) ??
  'smtp://localhost:25';
export const BACKEND_EMAIL_FROM: string =
  parseNonEmptyString(process?.env?.BACKEND_EMAIL_FROM) ??
  'Chat Slayer <noreply@localhost>';
export const BACKEND_INITIAL_USERS: string | undefined = parseNonEmptyString(
  process?.env?.BACKEND_INITIAL_USERS,
);

/** Comma-separated private room display names (hidden until a user discovers each name). */
export const BACKEND_INITIAL_ROOMS: string | undefined = parseNonEmptyString(
  process?.env?.BACKEND_INITIAL_ROOMS,
);

function parseDemoE2eeEnabled(): boolean {
  const raw = parseNonEmptyString(process?.env?.DEMO_E2EE_ENABLED)?.toLowerCase();
  if (raw === 'false' || raw === '0') {
    return false;
  }
  if (raw === 'true' || raw === '1') {
    return true;
  }
  return true;
}

/** Demo browser encryption on send (default true; set DEMO_E2EE_ENABLED=false to disable). */
export const DEMO_E2EE_ENABLED: boolean = parseDemoE2eeEnabled();

/**
 * Expiration time in minutes
 */
export const BACKEND_ACCESS_TOKEN_EXPIRATION_TIME: string =
  parseNonEmptyString(process?.env?.BACKEND_ACCESS_TOKEN_EXPIRATION_TIME) ??
  '3600';

const _allowedClientsConfig: AllowedClientsConfig = loadAllowedClientsConfig();

export const ALLOWED_CLIENTS_CONFIG: AllowedClientsConfig =
  _allowedClientsConfig;

export const CLIENT_ACCESS_ENFORCED: boolean = _allowedClientsConfig.enforced;

export const DEMO_SSE_CONFIG: DemoSseConfig = loadDemoSseConfig();
