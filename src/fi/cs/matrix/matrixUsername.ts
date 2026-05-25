import {MatrixErrorCode} from './types/response/error/types/MatrixErrorCode';
import {MatrixRegistrationError} from './MatrixRegistrationError';

/** Matrix localpart subset (homeserver may apply stricter rules). */
const USERNAME_PATTERN = /^[a-z0-9._=-]{3,255}$/i;

export function normalizeMatrixUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function assertValidMatrixUsername(
  username: string | undefined,
): string {
  const normalized = normalizeMatrixUsername(username ?? '');
  if (!USERNAME_PATTERN.test(normalized)) {
    throw new MatrixRegistrationError(
      MatrixErrorCode.M_INVALID_USERNAME,
      'Username must be 3-255 characters: a-z, 0-9, ., _, =, -',
      400,
    );
  }
  return normalized;
}

export function assertValidMatrixPassword(
  password: string | undefined,
): string {
  const value = password ?? '';
  if (value.length < 8) {
    throw new MatrixRegistrationError(
      MatrixErrorCode.M_UNKNOWN,
      'Password must be at least 8 characters',
      400,
    );
  }
  return value;
}
