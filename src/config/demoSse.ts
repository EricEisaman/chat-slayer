import {parseNonEmptyString} from '../fi/cs/core/types/String';

function parsePositiveInt(
  raw: string | undefined,
  fallback: number,
): number {
  if (!raw) {
    return fallback;
  }
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value) || value < 1) {
    return fallback;
  }
  return value;
}

function parseBoolean(raw: string | undefined, fallback: boolean): boolean {
  if (!raw) {
    return fallback;
  }
  const lower = raw.trim().toLowerCase();
  if (lower === 'true' || lower === '1') {
    return true;
  }
  if (lower === 'false' || lower === '0') {
    return false;
  }
  return fallback;
}

export interface DemoSseConfig {
  readonly inactiveResyncMinutes: number;
  readonly idleCheckIntervalMs: number;
  readonly keepalive: boolean;
}

export function loadDemoSseConfig(): DemoSseConfig {
  return {
    inactiveResyncMinutes: parsePositiveInt(
      parseNonEmptyString(process?.env?.DEMO_SSE_INACTIVE_RESYNC_MINUTES),
      10,
    ),
    idleCheckIntervalMs: parsePositiveInt(
      parseNonEmptyString(process?.env?.DEMO_SSE_IDLE_CHECK_INTERVAL_MS),
      30_000,
    ),
    keepalive: parseBoolean(
      parseNonEmptyString(process?.env?.DEMO_SSE_KEEPALIVE),
      true,
    ),
  };
}
