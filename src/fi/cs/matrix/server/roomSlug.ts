/** Normalize room display name for uniqueness (case-insensitive). */
export function normalizeRoomDisplayName(name: string): string {
  return name.trim().toLowerCase();
}

/** Matrix localpart from a human-readable room name. */
export function slugFromRoomName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._=-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-._=]+|[-._=]+$/g, '');
  if (slug.length < 3) {
    throw new Error('Room name must yield at least 3 slug characters');
  }
  if (slug.length > 64) {
    return slug.slice(0, 64);
  }
  return slug;
}
