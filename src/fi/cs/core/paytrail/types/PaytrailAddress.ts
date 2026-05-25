import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../types/String';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {isUndefined} from '../../types/undefined';

export interface PaytrailAddress {
  /**
   * Street address. Maximum of 50 characters.
   */
  readonly streetAddress: string;

  /**
   * Postal code. Maximum of 15 characters.
   */
  readonly postalCode: string;

  /**
   * City. maximum of 30 characters.
   */
  readonly city: string;

  /**
   * County/State
   */
  readonly county?: string;

  /**
   * Alpha-2 country code
   */
  readonly country: string;
}

export function createPaytrailAddress(
  streetAddress: string,
  postalCode: string,
  city: string,
  country: string,
  county?: string | undefined,
): PaytrailAddress {
  return {
    streetAddress,
    postalCode,
    city,
    county,
    country,
  };
}

export function isPaytrailAddress(value: unknown): value is PaytrailAddress {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'streetAddress',
      'postalCode',
      'city',
      'county',
      'country',
    ]) &&
    isString(objectKey(value, 'streetAddress')) &&
    isString(objectKey(value, 'postalCode')) &&
    isString(objectKey(value, 'city')) &&
    isStringOrUndefined(objectKey(value, 'county')) &&
    isString(objectKey(value, 'country'))
  );
}

export function explainPaytrailAddress(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'streetAddress',
      'postalCode',
      'city',
      'county',
      'country',
    ]),
    explainProperty(
      'streetAddress',
      explainString(objectKey(value, 'streetAddress')),
    ),
    explainProperty(
      'postalCode',
      explainString(objectKey(value, 'postalCode')),
    ),
    explainProperty('city', explainString(objectKey(value, 'city'))),
    explainProperty(
      'county',
      explainStringOrUndefined(objectKey(value, 'county')),
    ),
    explainProperty('country', explainString(objectKey(value, 'country'))),
  ]);
}

export function parsePaytrailAddress(
  value: unknown,
): PaytrailAddress | undefined {
  if (isPaytrailAddress(value)) return value;
  return undefined;
}

export function isPaytrailAddressOrUndefined(
  value: unknown,
): value is PaytrailAddress | undefined {
  return isUndefined(value) || isPaytrailAddress(value);
}

export function explainPaytrailAddressOrUndefined(value: unknown): string {
  return isPaytrailAddressOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['PaytrailAddress', 'undefined']));
}
