import {
  explainJokerStringObject,
  isJokerStringObject,
  JokerStringObject,
} from './JokerStringObject';
import {
  explainJokerComApiUserAccess,
  isJokerComApiUserAccess,
  JokerComApiUserAccess,
} from './JokerComApiUserAccess';
import {
  explainJokerComApiCurrency,
  isJokerComApiCurrency,
  JokerComApiCurrency,
} from './JokerComApiCurrency';
import {
  explainJokerComApiPriceAmount,
  isJokerComApiPriceAmount,
  JokerComApiPriceAmount,
} from './JokerComApiPriceAmount';
import {explain, explainProperty} from '../../../../types/explain';
import {explainString, isString} from '../../../../types/String';
import {explainNumber, isNumber} from '../../../../types/Number';
import {explainStringArray, isStringArray} from '../../../../types/StringArray';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../../types/OtherKeys';

/**
 * @see https://joker.com/faq/content/26/14/en/login.html
 */
export interface JokerComApiLoginDTO {
  readonly headers: JokerStringObject;
  readonly authSID: string;
  readonly uid: string;
  readonly userLogin: string;
  readonly sessionTimeout: number;
  readonly userAccess: JokerComApiUserAccess;
  readonly accountCurrency: JokerComApiCurrency;
  readonly accountBalance: JokerComApiPriceAmount;
  readonly accountPendingAmount: JokerComApiPriceAmount;
  readonly accountRebate: number;
  readonly accountContractDate: string;
  readonly statsNumberOfDomains: number;
  readonly statsLastLogin: string;
  readonly statsLastIp: string;
  readonly statsLastError: string;
  readonly statsLastErrorIp: string;
  readonly statsNumberOfAutoRenew: number;

  /**
   * List of domain TLDs which are available to the reseller.
   */
  readonly tldList: readonly string[];
}

export function createJokerComApiLoginDTO(
  headers: JokerStringObject,
  authSID: string,
  uid: string,
  userLogin: string,
  sessionTimeout: number,
  userAccess: JokerComApiUserAccess,
  accountCurrency: JokerComApiCurrency,
  accountBalance: JokerComApiPriceAmount,
  accountPendingAmount: JokerComApiPriceAmount,
  accountRebate: number,
  accountContractDate: string,
  statsNumberOfDomains: number,
  statsLastLogin: string,
  statsLastIp: string,
  statsLastError: string,
  statsLastErrorIp: string,
  statsNumberOfAutoRenew: number,
  tldList: readonly string[],
): JokerComApiLoginDTO {
  return {
    authSID,
    uid,
    userLogin,
    sessionTimeout,
    userAccess,
    accountCurrency,
    accountBalance,
    accountPendingAmount,
    accountRebate,
    accountContractDate,
    statsNumberOfDomains,
    statsLastLogin,
    statsLastIp,
    statsLastError,
    statsLastErrorIp,
    statsNumberOfAutoRenew,
    tldList,
    headers,
  };
}

export function isJokerComApiLoginDTO(
  value: unknown,
): value is JokerComApiLoginDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'headers',
      'authSID',
      'uid',
      'userLogin',
      'sessionTimeout',
      'userAccess',
      'accountCurrency',
      'accountBalance',
      'accountPendingAmount',
      'accountRebate',
      'accountContractDate',
      'statsNumberOfDomains',
      'statsLastLogin',
      'statsLastIp',
      'statsLastError',
      'statsLastErrorIp',
      'statsNumberOfAutoRenew',
      'tldList',
    ]) &&
    isJokerStringObject(objectKey(value, 'headers')) &&
    isString(objectKey(value, 'authSID')) &&
    isString(objectKey(value, 'uid')) &&
    isString(objectKey(value, 'userLogin')) &&
    isNumber(objectKey(value, 'sessionTimeout')) &&
    isJokerComApiUserAccess(objectKey(value, 'userAccess')) &&
    isJokerComApiCurrency(objectKey(value, 'accountCurrency')) &&
    isJokerComApiPriceAmount(objectKey(value, 'accountBalance')) &&
    isJokerComApiPriceAmount(objectKey(value, 'accountPendingAmount')) &&
    isNumber(objectKey(value, 'accountRebate')) &&
    isString(objectKey(value, 'accountContractDate')) &&
    isNumber(objectKey(value, 'statsNumberOfDomains')) &&
    isString(objectKey(value, 'statsLastLogin')) &&
    isString(objectKey(value, 'statsLastIp')) &&
    isString(objectKey(value, 'statsLastError')) &&
    isString(objectKey(value, 'statsLastErrorIp')) &&
    isNumber(objectKey(value, 'statsNumberOfAutoRenew')) &&
    isStringArray(objectKey(value, 'tldList'))
  );
}

export function explainJokerComApiLoginDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'headers',
      'authSID',
      'uid',
      'userLogin',
      'sessionTimeout',
      'userAccess',
      'accountCurrency',
      'accountBalance',
      'accountPendingAmount',
      'accountRebate',
      'accountContractDate',
      'statsNumberOfDomains',
      'statsLastLogin',
      'statsLastIp',
      'statsLastError',
      'statsLastErrorIp',
      'statsNumberOfAutoRenew',
      'tldList',
    ]),
    explainProperty('authSID', explainString(objectKey(value, 'authSID'))),
    explainProperty('uid', explainString(objectKey(value, 'uid'))),
    explainProperty('userLogin', explainString(objectKey(value, 'userLogin'))),
    explainProperty(
      'sessionTimeout',
      explainNumber(objectKey(value, 'sessionTimeout')),
    ),
    explainProperty(
      'userAccess',
      explainJokerComApiUserAccess(objectKey(value, 'userAccess')),
    ),
    explainProperty(
      'accountCurrency',
      explainJokerComApiCurrency(objectKey(value, 'accountCurrency')),
    ),
    explainProperty(
      'accountBalance',
      explainJokerComApiPriceAmount(objectKey(value, 'accountBalance')),
    ),
    explainProperty(
      'accountPendingAmount',
      explainJokerComApiPriceAmount(objectKey(value, 'accountPendingAmount')),
    ),
    explainProperty(
      'accountRebate',
      explainNumber(objectKey(value, 'accountRebate')),
    ),
    explainProperty(
      'accountContractDate',
      explainString(objectKey(value, 'accountContractDate')),
    ),
    explainProperty(
      'statsNumberOfDomains',
      explainNumber(objectKey(value, 'statsNumberOfDomains')),
    ),
    explainProperty(
      'statsLastLogin',
      explainString(objectKey(value, 'statsLastLogin')),
    ),
    explainProperty(
      'statsLastIp',
      explainString(objectKey(value, 'statsLastIp')),
    ),
    explainProperty(
      'statsLastError',
      explainString(objectKey(value, 'statsLastError')),
    ),
    explainProperty(
      'statsLastErrorIp',
      explainString(objectKey(value, 'statsLastErrorIp')),
    ),
    explainProperty(
      'statsNumberOfAutoRenew',
      explainNumber(objectKey(value, 'statsNumberOfAutoRenew')),
    ),
    explainProperty('tldList', explainStringArray(objectKey(value, 'tldList'))),
    explainProperty(
      'headers',
      explainJokerStringObject(objectKey(value, 'headers')),
    ),
  ]);
}

export function stringifyJokerComApiLoginDTO(
  value: JokerComApiLoginDTO,
): string {
  return `JokerComApiLoginDTO(${value})`;
}

export function parseJokerComApiLoginDTO(
  value: unknown,
): JokerComApiLoginDTO | undefined {
  if (isJokerComApiLoginDTO(value)) return value;
  return undefined;
}
