import {EmailTokenDTO, isEmailTokenDTO} from './EmailTokenDTO';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface VerifyEmailTokenDTO {
  readonly token: EmailTokenDTO;
}

export function createVerifyEmailTokenDTO(
  token: EmailTokenDTO,
): VerifyEmailTokenDTO {
  return {token};
}

export function isVerifyEmailTokenDTO(
  value: unknown,
): value is VerifyEmailTokenDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['token']) &&
    isEmailTokenDTO(objectKey(value, 'token'))
  );
}

export function stringifyVerifyEmailTokenDTO(
  value: VerifyEmailTokenDTO,
): string {
  return `VerifyEmailTokenDTO(${value})`;
}

export function parseVerifyEmailTokenDTO(
  value: unknown,
): VerifyEmailTokenDTO | undefined {
  if (isVerifyEmailTokenDTO(value)) return value;
  return undefined;
}
