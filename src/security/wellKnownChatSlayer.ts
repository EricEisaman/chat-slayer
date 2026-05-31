import {BACKEND_PUBLIC_URL} from '../constants/runtime';
import {
  getServerFingerprintConfig,
  type ServerFingerprintConfig,
} from '../config/serverFingerprint';
import {getCachedLiveTlsFingerprint} from './tlsFingerprintProbe';

export const WELL_KNOWN_CHAT_SLAYER_PATH = '/.well-known/chat-slayer.json';

export function isWellKnownChatSlayerPath(path: string): boolean {
  return path === WELL_KNOWN_CHAT_SLAYER_PATH;
}

export interface WellKnownChatSlayerDocument {
  readonly publicUrl: string;
  readonly tlsFingerprintSha256: string | null;
  readonly tlsFingerprintBackupSha256: string | null;
  readonly pinEnforced: boolean;
}

export function buildWellKnownChatSlayerDocument(
  config: ServerFingerprintConfig = getServerFingerprintConfig(
    BACKEND_PUBLIC_URL,
  ),
): WellKnownChatSlayerDocument {
  const live = getCachedLiveTlsFingerprint();
  return {
    publicUrl: BACKEND_PUBLIC_URL.replace(/\/$/, ''),
    tlsFingerprintSha256: live ?? config.primaryPin ?? null,
    tlsFingerprintBackupSha256: config.backupPin ?? null,
    pinEnforced: config.pinEnforced,
  };
}

export function buildWellKnownChatSlayerJson(): string {
  return JSON.stringify(buildWellKnownChatSlayerDocument(), null, 2);
}
