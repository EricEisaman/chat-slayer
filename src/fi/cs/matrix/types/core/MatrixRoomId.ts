import {isString} from '../../../core/types/String';

/**
 * Size must not exceed 255 bytes.
 */
export type MatrixRoomId = string;

export function isMatrixRoomId(value: unknown): value is MatrixRoomId {
  return isString(value) && !!value && value[0] === '!';
}

export function assertMatrixRoomId(value: unknown): void {
  if (!isString(value)) {
    throw new TypeError(`value was not string: "${value}"`);
  }

  if (!value) {
    throw new TypeError(`value was empty: "${value}"`);
  }

  if (!(value[0] === '!')) {
    throw new TypeError(`value did not start with !: "${value}"`);
  }
}

export function explainMatrixRoomId(value: unknown): string {
  try {
    assertMatrixRoomId(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixRoomId(value: MatrixRoomId): string {
  return `MatrixRoomId(${value})`;
}

export function parseMatrixRoomId(value: unknown): MatrixRoomId | undefined {
  if (isMatrixRoomId(value)) return value;
  return undefined;
}
