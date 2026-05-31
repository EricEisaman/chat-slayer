import {isDeployProduction} from './deployMode';
import {parseNonEmptyString} from '../fi/cs/core/types/String';

/** Response header exposing the live TLS SPKI SHA-256 pin. */
export const TLS_FINGERPRINT_HEADER = 'x-chat-slayer-tls-fingerprint-sha256';

const SHA256_HEX_RE = /^[a-f0-9]{64}$/;

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

export function isLocalDevPublicUrl(publicUrl: string): boolean {
  const lower = publicUrl.trim().toLowerCase();
  return (
    lower.startsWith('http://localhost') ||
    lower.startsWith('http://127.0.0.1')
  );
}

/**
 * Normalize a SHA-256 fingerprint to lowercase 64 hex chars.
 * Accepts optional "sha256/" or "SHA256 " prefix.
 */
export function normalizeSha256Hex(
  value: string | undefined,
): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }
  let normalized = value.trim().toLowerCase();
  if (normalized.startsWith('sha256/')) {
    normalized = normalized.slice('sha256/'.length);
  }
  if (normalized.startsWith('sha256 ')) {
    normalized = normalized.slice('sha256 '.length);
  }
  if (!SHA256_HEX_RE.test(normalized)) {
    throw new TypeError(
      `Invalid SHA-256 fingerprint "${value}" (expected 64 hex characters)`,
    );
  }
  return normalized;
}

export function isValidSha256Hex(value: string): boolean {
  return SHA256_HEX_RE.test(value.trim().toLowerCase());
}

export interface ServerFingerprintConfig {
  readonly primaryPin: string | undefined;
  readonly backupPin: string | undefined;
  readonly pinEnforced: boolean;
  readonly autoDisableOnPinFailure: boolean;
}

export function loadServerFingerprintConfig(
  publicUrl: string,
): ServerFingerprintConfig {
  const primaryRaw = parseNonEmptyString(
    process?.env?.BACKEND_TLS_FINGERPRINT_SHA256,
  );
  const backupRaw = parseNonEmptyString(
    process?.env?.BACKEND_TLS_FINGERPRINT_BACKUP_SHA256,
  );
  const localDev = isLocalDevPublicUrl(publicUrl);
  const defaultPinEnforced = isDeployProduction() && !localDev;
  const pinEnforced = parseBooleanEnv(
    parseNonEmptyString(process?.env?.BACKEND_TLS_PIN_ENFORCED),
    defaultPinEnforced,
  );
  const autoDisableOnPinFailure = parseBooleanEnv(
    parseNonEmptyString(process?.env?.BACKEND_AUTO_DISABLE_ON_PIN_FAILURE),
    isDeployProduction(),
  );
  const primaryPin = primaryRaw ? normalizeSha256Hex(primaryRaw) : undefined;
  const backupPin = backupRaw ? normalizeSha256Hex(backupRaw) : undefined;
  return {
    primaryPin,
    backupPin,
    pinEnforced,
    autoDisableOnPinFailure,
  };
}

let cachedConfig: ServerFingerprintConfig | undefined;

export function getServerFingerprintConfig(
  publicUrl: string,
): ServerFingerprintConfig {
  if (!cachedConfig) {
    cachedConfig = loadServerFingerprintConfig(publicUrl);
  }
  return cachedConfig;
}

export function resetServerFingerprintConfigCache(): void {
  cachedConfig = undefined;
}

/** True when observed pin matches primary or backup configured pin. */
export function configuredPinMatches(
  config: ServerFingerprintConfig,
  observed: string,
): boolean {
  const obs = observed.toLowerCase();
  if (config.primaryPin && config.primaryPin === obs) {
    return true;
  }
  if (config.backupPin && config.backupPin === obs) {
    return true;
  }
  return false;
}
