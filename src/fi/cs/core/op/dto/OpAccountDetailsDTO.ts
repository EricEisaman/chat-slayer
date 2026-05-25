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
  explainStringOrNull,
  isString,
  isStringOrNull,
} from '../../types/String';
import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';
import {explainNumber, isNumber} from '../../types/Number';

/**
 * OP bank account details response DTO.
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/account
 *
 * @example
 *
 *     {
 *       "bic": "OKOYFIHH",
 *       "iban": "FI7450009499999999",
 *       "dueDate": "29.11.2019",
 *       "ownerId": "1234567-8",
 *       "currency": "EUR",
 *       "netBalance": "222.22",
 *       "accountName": "Some name given by client",
 *       "creditLimit": 0,
 *       "surrogateId": "rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==",
 *       "accountOwner": "Firstname Lastname",
 *       "creationDate": "29.11.2011",
 *       "grossBalance": "222.22",
 *       "intraDayLimit": "222.22"
 *     }
 */
export interface OpAccountDetailsDTO {
  /**
   * Bank Identification Code
   */
  readonly bic: string;

  /**
   * International Bank Account Number
   */
  readonly iban: string;

  /**
   * Account due date for fixed term accounts
   */
  readonly dueDate: string | null;

  /**
   * Owner identifier
   */
  readonly ownerId: string;

  /**
   * ISO currency code
   */
  readonly currency: string;

  /**
   * Balance of the account including cover reservations
   */
  readonly netBalance: string;

  /**
   * Account name
   */
  readonly accountName: string | null;

  /**
   * Maximum credit amount for the account
   */
  readonly creditLimit: number;

  /**
   * Surrogate identifier used in place of actual iban in further requests
   */
  readonly surrogateId: string;

  /**
   * Account owner
   */
  readonly accountOwner: string;

  /**
   * Account creation date
   */
  readonly creationDate: string;

  /**
   * Gross balance of the account
   */
  readonly grossBalance: string;

  /**
   * Maximum allowed amount for negative balance per day
   */
  readonly intraDayLimit: string | null;
}

export function createOpAccountDetailsDTO(
  bic: string,
  iban: string,
  dueDate: string | null,
  ownerId: string,
  currency: string,
  netBalance: string,
  accountName: string | null,
  creditLimit: number,
  surrogateId: string,
  accountOwner: string,
  creationDate: string,
  grossBalance: string,
  intraDayLimit: string | null,
): OpAccountDetailsDTO {
  return {
    bic,
    iban,
    dueDate,
    ownerId,
    currency,
    netBalance,
    accountName,
    creditLimit,
    surrogateId,
    accountOwner,
    creationDate,
    grossBalance,
    intraDayLimit,
  };
}

export function isOpAccountDetailsDTO(
  value: unknown,
): value is OpAccountDetailsDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'bic',
      'iban',
      'dueDate',
      'ownerId',
      'currency',
      'netBalance',
      'accountName',
      'creditLimit',
      'surrogateId',
      'accountOwner',
      'creationDate',
      'grossBalance',
      'intraDayLimit',
    ]) &&
    isString(objectKey(value, 'bic')) &&
    isString(objectKey(value, 'iban')) &&
    isStringOrNull(objectKey(value, 'dueDate')) &&
    isString(objectKey(value, 'ownerId')) &&
    isString(objectKey(value, 'currency')) &&
    isString(objectKey(value, 'netBalance')) &&
    isStringOrNull(objectKey(value, 'accountName')) &&
    isNumber(objectKey(value, 'creditLimit')) &&
    isString(objectKey(value, 'surrogateId')) &&
    isString(objectKey(value, 'accountOwner')) &&
    isString(objectKey(value, 'creationDate')) &&
    isString(objectKey(value, 'grossBalance')) &&
    isStringOrNull(objectKey(value, 'intraDayLimit'))
  );
}

export function explainOpAccountDetailsDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'bic',
      'iban',
      'dueDate',
      'ownerId',
      'currency',
      'netBalance',
      'accountName',
      'creditLimit',
      'surrogateId',
      'accountOwner',
      'creationDate',
      'grossBalance',
      'intraDayLimit',
    ]),
    explainProperty('bic', explainString(objectKey(value, 'bic'))),
    explainProperty('iban', explainString(objectKey(value, 'iban'))),
    explainProperty(
      'dueDate',
      explainStringOrNull(objectKey(value, 'dueDate')),
    ),
    explainProperty('ownerId', explainString(objectKey(value, 'ownerId'))),
    explainProperty('currency', explainString(objectKey(value, 'currency'))),
    explainProperty(
      'netBalance',
      explainString(objectKey(value, 'netBalance')),
    ),
    explainProperty(
      'accountName',
      explainStringOrNull(objectKey(value, 'accountName')),
    ),
    explainProperty(
      'creditLimit',
      explainNumber(objectKey(value, 'creditLimit')),
    ),
    explainProperty(
      'surrogateId',
      explainString(objectKey(value, 'surrogateId')),
    ),
    explainProperty(
      'accountOwner',
      explainString(objectKey(value, 'accountOwner')),
    ),
    explainProperty(
      'creationDate',
      explainString(objectKey(value, 'creationDate')),
    ),
    explainProperty(
      'grossBalance',
      explainString(objectKey(value, 'grossBalance')),
    ),
    explainProperty(
      'intraDayLimit',
      explainStringOrNull(objectKey(value, 'intraDayLimit')),
    ),
  ]);
}

export function parseOpAccountDetailsDTO(
  value: unknown,
): OpAccountDetailsDTO | undefined {
  if (isOpAccountDetailsDTO(value)) return value;
  return undefined;
}

export function isOpAccountDetailsDTOOrUndefined(
  value: unknown,
): value is OpAccountDetailsDTO | undefined {
  return isUndefined(value) || isOpAccountDetailsDTO(value);
}

export function explainOpAccountDetailsDTOOrUndefined(value: unknown): string {
  return isOpAccountDetailsDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['OpAccountDetailsDTO', 'undefined']));
}
