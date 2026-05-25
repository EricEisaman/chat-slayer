import {explainNot, explainOk} from '../../../core/types/explain';
import {isString} from '../../../core/types/String';

/**
 * Size must not exceed 255 bytes.
 */
export type MatrixUserId = string;

export function isMatrixUserId(value: unknown): value is MatrixUserId {
  return isString(value) && !!value && value[0] === '@';
}

export function explainMatrixUserId(value: unknown): string {
  return isMatrixUserId(value) ? explainOk() : explainNot('MatrixUserId');
}

export function stringifyMatrixUserId(value: MatrixUserId): string {
  return `MatrixUserId(${value})`;
}

export function parseMatrixUserId(value: unknown): MatrixUserId | undefined {
  if (isMatrixUserId(value)) return value;
  return undefined;
}
