import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isString} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';
import {isUndefined} from '../../../types/undefined';
import {explainNot, explainOk, explainOr} from '../../../types/explain';

export interface EmailTokenDTO {
  readonly token: string;
  readonly email: string;
  readonly verified?: boolean | undefined;
}

export function createEmailTokenDTO(
  token: string,
  email: string,
  verified?: boolean | undefined,
) {
  return {
    token,
    email,
    verified,
  };
}

export function isEmailTokenDTO(value: unknown): value is EmailTokenDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['token', 'email', 'verified']) &&
    isString(objectKey(value, 'token')) &&
    isString(objectKey(value, 'email')) &&
    isBooleanOrUndefined(objectKey(value, 'verified'))
  );
}

export function stringifyEmailTokenDTO(value: EmailTokenDTO): string {
  return JSON.stringify(value);
}

export function parseEmailTokenDTO(value: unknown): EmailTokenDTO | undefined {
  if (isEmailTokenDTO(value)) return value;
  return undefined;
}

export function isEmailTokenDTOOrUndefined(
  value: unknown,
): value is EmailTokenDTO | undefined {
  return isUndefined(value) || isEmailTokenDTO(value);
}

export function explainEmailTokenDTOOrUndefined(value: unknown): string {
  return isEmailTokenDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['EmailTokenDTO', 'undefined']));
}
