import {EmailTokenDTO, isEmailTokenDTO} from './EmailTokenDTO';
import {isString} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface VerifyEmailCodeDTO {
  readonly token: EmailTokenDTO;
  readonly code: string;
}

export function createVerifyEmailCodeDTO(token: EmailTokenDTO, code: string) {
  return {
    token,
    code,
  };
}

export function isVerifyEmailCodeDTO(
  value: unknown,
): value is VerifyEmailCodeDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['token', 'code']) &&
    isEmailTokenDTO(objectKey(value, 'token')) &&
    isString(objectKey(value, 'code'))
  );
}

export function stringifyVerifyEmailCodeDTO(value: VerifyEmailCodeDTO): string {
  return `VerifyEmailCodeDTO(${value})`;
}

export function parseVerifyEmailCodeDTO(
  value: unknown,
): VerifyEmailCodeDTO | undefined {
  if (isVerifyEmailCodeDTO(value)) return value;
  return undefined;
}
