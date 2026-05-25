import {isString} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface AuthenticateSmsDTO {
  readonly sms: string;
}

export function createAuthenticateSmsDTO(sms: string): AuthenticateSmsDTO {
  return {sms};
}

export function isAuthenticateSmsDTO(
  value: unknown,
): value is AuthenticateSmsDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['sms']) &&
    isString(objectKey(value, 'sms'))
  );
}

export function stringifyAuthenticateSmsDTO(value: AuthenticateSmsDTO): string {
  return JSON.stringify(value);
}

export function parseAuthenticateSmsDTO(
  value: unknown,
): AuthenticateSmsDTO | undefined {
  if (isAuthenticateSmsDTO(value)) return value;
  return undefined;
}
