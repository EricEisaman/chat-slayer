import {normalizeRoomDisplayName} from '../fi/cs/matrix/server/roomSlug';

/** Comma-separated display names from {@link BACKEND_INITIAL_ROOMS}. */
export function parseInitialRoomNames(
  raw: string | undefined,
): ReadonlySet<string> {
  const set = new Set<string>();
  if (!raw) {
    return set;
  }
  for (const part of raw.split(',')) {
    const trimmed = part.trim();
    if (trimmed) {
      set.add(normalizeRoomDisplayName(trimmed));
    }
  }
  return set;
}

export function isPreconfiguredPrivateRoomsEnabled(
  names: ReadonlySet<string>,
): boolean {
  return names.size > 0;
}
