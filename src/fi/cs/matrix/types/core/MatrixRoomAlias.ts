import {isString} from '../../../core/types/String';

export type MatrixRoomAlias = string;

export function isMatrixRoomAlias(value: unknown): value is MatrixRoomAlias {
  return isString(value) && !!value && value[0] === '#';
}

export function stringifyMatrixRoomAlias(value: MatrixRoomAlias): string {
  return `MatrixRoomAlias(${value})`;
}

export function parseMatrixRoomAlias(
  value: unknown,
): MatrixRoomAlias | undefined {
  if (isMatrixRoomAlias(value)) return value;
  return undefined;
}
