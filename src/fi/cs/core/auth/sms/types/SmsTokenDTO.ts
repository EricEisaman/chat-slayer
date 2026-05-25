import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isString} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';
import {isUndefined} from '../../../types/undefined';
import {explainNot, explainOk, explainOr} from '../../../types/explain';

export interface SmsTokenDTO {
  readonly token: string;
  readonly sms: string;
  readonly verified?: boolean | undefined;
}

export function createSmsTokenDTO(
  token: string,
  sms: string,
  verified?: boolean | undefined,
) {
  return {
    token,
    sms,
    verified,
  };
}

export function isSmsTokenDTO(value: unknown): value is SmsTokenDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['token', 'sms', 'verified']) &&
    isString(objectKey(value, 'token')) &&
    isString(objectKey(value, 'sms')) &&
    isBooleanOrUndefined(objectKey(value, 'verified'))
  );
}

export function stringifySmsTokenDTO(value: SmsTokenDTO): string {
  return JSON.stringify(value);
}

export function parseSmsTokenDTO(value: unknown): SmsTokenDTO | undefined {
  if (isSmsTokenDTO(value)) return value;
  return undefined;
}

export function isSmsTokenDTOOrUndefined(
  value: unknown,
): value is SmsTokenDTO | undefined {
  return isUndefined(value) || isSmsTokenDTO(value);
}

export function explainSmsTokenDTOOrUndefined(value: unknown): string {
  return isSmsTokenDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['SmsTokenDTO', 'undefined']));
}
