import {SmsTokenDTO, isSmsTokenDTO} from './SmsTokenDTO';
import {isString} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface VerifySmsCodeDTO {
  readonly token: SmsTokenDTO;
  readonly code: string;
}

export function createVerifySmsCodeDTO(token: SmsTokenDTO, code: string) {
  return {
    token,
    code,
  };
}

export function isVerifySmsCodeDTO(value: unknown): value is VerifySmsCodeDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['token', 'code']) &&
    isSmsTokenDTO(objectKey(value, 'token')) &&
    isString(objectKey(value, 'code'))
  );
}

export function stringifyVerifySmsCodeDTO(value: VerifySmsCodeDTO): string {
  return `VerifySmsCodeDTO(${value})`;
}

export function parseVerifySmsCodeDTO(
  value: unknown,
): VerifySmsCodeDTO | undefined {
  if (isVerifySmsCodeDTO(value)) return value;
  return undefined;
}
