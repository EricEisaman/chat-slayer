import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../types/String';
import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';
import {
  explainReadonlyJsonObject,
  isReadonlyJsonObject,
  ReadonlyJsonObject,
} from '../../Json';

/**
 * OP bank account information inside a response list.
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/accounts
 *
 * @example
 *       {
 *         "bic": "OKOYFIHH",
 *         "iban": "FI7450009420999999",
 *         "name": "Companys payroll account",
 *         "balance": "-12.3",
 *         "currency": "EUR",
 *         "surrogateId": "rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==",
 *         "productNames": {
 *           "property1": "string",
 *           "property2": "string"
 *         }
 *       }
 */
export interface OpAccountDTO {
  /**
   * Bank Identification Code
   */
  readonly bic: string;

  /**
   * International Bank Account Number
   */
  readonly iban: string;

  /**
   * Account name given by account user or if not set the corresponding
   * product name
   */
  readonly name: string;

  /**
   * Balance of an account
   */
  readonly balance: string;

  /**
   * ISO currency code
   */
  readonly currency: string;

  /**
   * Surrogate identifier used in place of actual iban in further requests
   */
  readonly surrogateId: string;

  /**
   * Map of languages to product names
   */
  readonly productNames: ReadonlyJsonObject;

  /**
   * Account type code.
   *
   * Note! This is undocumented at OP API documentation, but exist in
   * the response. Hence, this is defined as optional since no information if
   * it is optional or not.
   */
  readonly accountTypeCode?: string;
}

export function createOpAccountDTO(
  bic: string,
  iban: string,
  name: string,
  balance: string,
  currency: string,
  surrogateId: string,
  productNames: ReadonlyJsonObject,
  accountTypeCode?: string,
): OpAccountDTO {
  return {
    bic,
    iban,
    name,
    balance,
    currency,
    surrogateId,
    productNames,
    accountTypeCode,
  };
}

export function isOpAccountDTO(value: unknown): value is OpAccountDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'bic',
      'iban',
      'name',
      'balance',
      'currency',
      'surrogateId',
      'productNames',
      'accountTypeCode',
    ]) &&
    isString(objectKey(value, 'bic')) &&
    isString(objectKey(value, 'iban')) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'balance')) &&
    isString(objectKey(value, 'currency')) &&
    isString(objectKey(value, 'surrogateId')) &&
    isReadonlyJsonObject(objectKey(value, 'productNames')) &&
    isStringOrUndefined(objectKey(value, 'accountTypeCode'))
  );
}

export function explainOpAccountDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'bic',
      'iban',
      'name',
      'balance',
      'currency',
      'surrogateId',
      'productNames',
      'accountTypeCode',
    ]),
    explainProperty('bic', explainString(objectKey(value, 'bic'))),
    explainProperty('iban', explainString(objectKey(value, 'iban'))),
    explainProperty('name', explainString(objectKey(value, 'name'))),
    explainProperty('balance', explainString(objectKey(value, 'balance'))),
    explainProperty('currency', explainString(objectKey(value, 'currency'))),
    explainProperty(
      'surrogateId',
      explainString(objectKey(value, 'surrogateId')),
    ),
    explainProperty(
      'productNames',
      explainReadonlyJsonObject(objectKey(value, 'productNames')),
    ),
    explainProperty(
      'accountTypeCode',
      explainStringOrUndefined(objectKey(value, 'accountTypeCode')),
    ),
  ]);
}

export function parseOpAccountDTO(value: unknown): OpAccountDTO | undefined {
  if (isOpAccountDTO(value)) return value;
  return undefined;
}

export function isOpAccountDTOOrUndefined(
  value: unknown,
): value is OpAccountDTO | undefined {
  return isUndefined(value) || isOpAccountDTO(value);
}

export function explainOpAccountDTOOrUndefined(value: unknown): string {
  return isOpAccountDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['OpAccountDTO', 'undefined']));
}
