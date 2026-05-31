import {parseNonEmptyString} from '../fi/cs/core/types/String';

export const DEFAULT_ROOM_HISTORY_LIMIT = 20;
export const MAX_ROOM_HISTORY_LIMIT = 500;

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  if (!raw) {
    return fallback;
  }
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value) || value < 1) {
    return fallback;
  }
  return value;
}

/** Server-wide max recent messages returned per room history fetch. */
export function loadRoomHistoryLimit(
  raw: string | undefined = process?.env?.BACKEND_ROOM_HISTORY_LIMIT,
): number {
  const parsed = parsePositiveInt(parseNonEmptyString(raw), DEFAULT_ROOM_HISTORY_LIMIT);
  return Math.min(parsed, MAX_ROOM_HISTORY_LIMIT);
}

export function clampRoomHistoryLimit(
  requested: number,
  serverMax: number,
): number {
  if (!Number.isFinite(requested) || requested < 1) {
    return Math.min(DEFAULT_ROOM_HISTORY_LIMIT, serverMax);
  }
  return Math.min(Math.floor(requested), serverMax);
}
