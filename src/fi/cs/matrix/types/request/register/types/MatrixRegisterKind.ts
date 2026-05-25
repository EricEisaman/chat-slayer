export enum MatrixRegisterKind {
  GUEST = 'guest',
  USER = 'user',
}

export function isMatrixRegisterKind(
  value: unknown,
): value is MatrixRegisterKind {
  switch (value) {
    case MatrixRegisterKind.GUEST:
    case MatrixRegisterKind.USER:
      return true;

    default:
      return false;
  }
}

export function stringifyMatrixRegisterKind(value: MatrixRegisterKind): string {
  switch (value) {
    case MatrixRegisterKind.GUEST:
      return 'guest';
    case MatrixRegisterKind.USER:
      return 'user';
  }
  throw new TypeError(`Unsupported MatrixRegisterKind value: ${value}`);
}

export function parseMatrixRegisterKind(
  value: unknown,
): MatrixRegisterKind | undefined {
  if (value === undefined) return undefined;

  switch (`${value}`.toLowerCase()) {
    case 'guest':
      return MatrixRegisterKind.GUEST;
    case 'user':
      return MatrixRegisterKind.USER;
    default:
      return undefined;
  }
}
