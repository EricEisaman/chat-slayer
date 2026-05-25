/**
 * Runtime-checked boundaries: use only after validation or persistence layer checks.
 */

export function asString(value: unknown): string {
  return `${value}`;
}

export function asObject(value: unknown): object {
  return value as object;
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>;
}

export function asIndexKey(value: unknown): string | number {
  return value as string | number;
}
