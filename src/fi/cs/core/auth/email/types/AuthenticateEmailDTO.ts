import {isString} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface AuthenticateEmailDTO {
  readonly email: string;
}

export function createAuthenticateEmailDTO(
  email: string,
): AuthenticateEmailDTO {
  return {email};
}

export function isAuthenticateEmailDTO(
  value: unknown,
): value is AuthenticateEmailDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['email']) &&
    isString(objectKey(value, 'email'))
  );
}

export function stringifyAuthenticateEmailDTO(
  value: AuthenticateEmailDTO,
): string {
  return JSON.stringify(value);
}

export function parseAuthenticateEmailDTO(
  value: unknown,
): AuthenticateEmailDTO | undefined {
  if (isAuthenticateEmailDTO(value)) return value;
  return undefined;
}
