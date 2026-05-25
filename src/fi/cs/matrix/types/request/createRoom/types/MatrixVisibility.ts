import {
  explainNot,
  explainOk,
  explainOr,
} from '../../../../../core/types/explain';

export enum MatrixVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export function isMatrixVisibility(value: unknown): value is MatrixVisibility {
  switch (value) {
    case MatrixVisibility.PUBLIC:
    case MatrixVisibility.PRIVATE:
      return true;
    default:
      return false;
  }
}

export function explainMatrixVisibility(value: unknown): string {
  return isMatrixVisibility(value)
    ? explainOk()
    : explainNot('MatrixVisibility');
}

export function isMatrixVisibilityOrUndefined(
  value: unknown,
): value is MatrixVisibility | undefined {
  if (value === undefined) return true;
  switch (value) {
    case MatrixVisibility.PUBLIC:
    case MatrixVisibility.PRIVATE:
      return true;
    default:
      return false;
  }
}

export function explainMatrixVisibilityOrUndefined(value: unknown): string {
  return isMatrixVisibilityOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['MatrixVisibility', 'undefined']));
}

export function stringifyMatrixVisibility(value: MatrixVisibility): string {
  switch (value) {
    case MatrixVisibility.PUBLIC:
      return 'public';
    case MatrixVisibility.PRIVATE:
      return 'private';
  }
  throw new TypeError(`Unsupported MatrixVisibility value: ${value}`);
}

export function parseMatrixVisibility(
  value: unknown,
): MatrixVisibility | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toUpperCase()) {
    case 'PRIVATE':
      return MatrixVisibility.PRIVATE;
    case 'PUBLIC':
      return MatrixVisibility.PUBLIC;
    default:
      return undefined;
  }
}
