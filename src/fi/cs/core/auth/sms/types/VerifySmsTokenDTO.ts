import {SmsTokenDTO, isSmsTokenDTO} from './SmsTokenDTO';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface VerifySmsTokenDTO {
  readonly token: SmsTokenDTO;
}

export function createVerifySmsTokenDTO(token: SmsTokenDTO): VerifySmsTokenDTO {
  return {token};
}

export function isVerifySmsTokenDTO(
  value: unknown,
): value is VerifySmsTokenDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['token']) &&
    isSmsTokenDTO(objectKey(value, 'token'))
  );
}

export function stringifyVerifySmsTokenDTO(value: VerifySmsTokenDTO): string {
  return `VerifySmsTokenDTO(${value})`;
}

export function parseVerifySmsTokenDTO(
  value: unknown,
): VerifySmsTokenDTO | undefined {
  if (isVerifySmsTokenDTO(value)) return value;
  return undefined;
}
