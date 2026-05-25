export enum MatrixGuestAccess {
  CAN_JOIN = 'can_join',
  FORBIDDEN = 'forbidden',
}

export function isMatrixGuestAccess(
  value: unknown,
): value is MatrixGuestAccess {
  switch (value) {
    case MatrixGuestAccess.CAN_JOIN:
    case MatrixGuestAccess.FORBIDDEN:
      return true;

    default:
      return false;
  }
}

export function stringifyMatrixGuestAccess(value: MatrixGuestAccess): string {
  switch (value) {
    case MatrixGuestAccess.CAN_JOIN:
      return 'can_join';
    case MatrixGuestAccess.FORBIDDEN:
      return 'forbidden';
  }
  throw new TypeError(`Unsupported MatrixGuestAccess value: ${value}`);
}

export function parseMatrixGuestAccess(
  value: unknown,
): MatrixGuestAccess | undefined {
  switch (`${value}`.toUpperCase()) {
    case 'CAN_JOIN':
      return MatrixGuestAccess.CAN_JOIN;
    case 'FORBIDDEN':
      return MatrixGuestAccess.FORBIDDEN;

    default:
      return undefined;
  }
}
