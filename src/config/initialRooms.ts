import {normalizeRoomDisplayName} from '../fi/cs/matrix/server/roomSlug';
import {
  BACKEND_INITIAL_ROOMS,
  BACKEND_PRIVATE_ROOMS,
} from '../constants/runtime';

/** Comma-separated display names from env (trimmed originals, order preserved). */
export function parseRoomNameList(
  raw: string | undefined,
): readonly string[] {
  const names: string[] = [];
  if (!raw) {
    return names;
  }
  for (const part of raw.split(',')) {
    const trimmed = part.trim();
    if (trimmed) {
      names.push(trimmed);
    }
  }
  return names;
}

export function toNormalizedRoomNameSet(
  displayNames: readonly string[],
): ReadonlySet<string> {
  return new Set(displayNames.map((name) => normalizeRoomDisplayName(name)));
}

/** Public boot-seeded rooms from {@link BACKEND_INITIAL_ROOMS}. */
export function parseInitialRoomNames(
  raw: string | undefined = BACKEND_INITIAL_ROOMS,
): ReadonlySet<string> {
  return toNormalizedRoomNameSet(parseRoomNameList(raw));
}

/** Hidden private rooms from {@link BACKEND_PRIVATE_ROOMS}. */
export function parsePrivateRoomNames(
  raw: string | undefined = BACKEND_PRIVATE_ROOMS,
): ReadonlySet<string> {
  return toNormalizedRoomNameSet(parseRoomNameList(raw));
}

export interface PreconfiguredRoomsConfig {
  readonly publicDisplayNames: readonly string[];
  readonly privateDisplayNames: readonly string[];
  readonly publicNames: ReadonlySet<string>;
  readonly privateNames: ReadonlySet<string>;
}

/**
 * Resolves public (`BACKEND_INITIAL_ROOMS`) and private (`BACKEND_PRIVATE_ROOMS`) lists.
 * Throws if the same normalized name appears in both sets.
 */
export function resolvePreconfiguredRoomsConfig(
  initialRaw: string | undefined = BACKEND_INITIAL_ROOMS,
  privateRaw: string | undefined = BACKEND_PRIVATE_ROOMS,
): PreconfiguredRoomsConfig {
  const publicDisplayNames = parseRoomNameList(initialRaw);
  const privateDisplayNames = parseRoomNameList(privateRaw);
  const publicNames = toNormalizedRoomNameSet(publicDisplayNames);
  const privateNames = toNormalizedRoomNameSet(privateDisplayNames);
  for (const normalized of publicNames) {
    if (privateNames.has(normalized)) {
      throw new Error(
        `Room display name conflicts across BACKEND_INITIAL_ROOMS and BACKEND_PRIVATE_ROOMS (normalized: ${normalized})`,
      );
    }
  }
  return {
    publicDisplayNames,
    privateDisplayNames,
    publicNames,
    privateNames,
  };
}

export function isPreconfiguredPrivateRoomsEnabled(
  names: ReadonlySet<string>,
): boolean {
  return names.size > 0;
}
