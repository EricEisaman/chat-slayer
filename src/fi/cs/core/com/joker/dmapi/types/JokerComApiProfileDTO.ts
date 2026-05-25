import {
  explainJokerStringObject,
  isJokerStringObject,
  JokerStringObject,
} from './JokerStringObject';
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

export interface JokerComApiProfileDTO {
  readonly body: JokerStringObject;
  readonly headers: JokerStringObject;
  readonly customerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly organization: string;
  readonly city: string;
  readonly address: readonly string[];
  readonly postalCode: string;
  readonly state: string;
  readonly phone: string;
  readonly fax: string;
  readonly balance: number;
  readonly vatId: string;
  readonly lastPayment: string;
  readonly lastAccess: string;
  readonly adminEmail: string;
  readonly robotEmail: string;
  readonly checkdIp: readonly string[];
  readonly http: string;
  readonly url: string;
  readonly whois: readonly string[];
}

export function createJokerComApiProfileDTO(
  headers: JokerStringObject,
  body: JokerStringObject,
  customerId: string,
  firstName: string,
  lastName: string,
  organization: string,
  city: string,
  address: readonly string[],
  postalCode: string,
  state: string,
  phone: string,
  fax: string,
  balance: number,
  vatId: string,
  lastPayment: string,
  lastAccess: string,
  adminEmail: string,
  robotEmail: string,
  checkdIp: readonly string[],
  http: string,
  url: string,
  whois: readonly string[],
): JokerComApiProfileDTO {
  return {
    headers,
    body,
    customerId,
    firstName,
    lastName,
    organization,
    city,
    address,
    postalCode,
    state,
    phone,
    fax,
    balance,
    vatId,
    lastPayment,
    lastAccess,
    adminEmail,
    robotEmail,
    checkdIp,
    http,
    url,
    whois,
  };
}

export function isJokerComApiProfileDTO(
  value: unknown,
): value is JokerComApiProfileDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'headers',
      'body',
      'customerId',
      'firstName',
      'lastName',
      'organization',
      'city',
      'address',
      'postalCode',
      'state',
      'phone',
      'fax',
      'balance',
      'vatId',
      'lastPayment',
      'lastAccess',
      'adminEmail',
      'robotEmail',
      'checkdIp',
      'http',
      'url',
      'whois',
    ]) &&
    isJokerStringObject(objectKey(value, 'headers')) &&
    isJokerStringObject(objectKey(value, 'body')) &&
    isString(objectKey(value, 'customerId')) &&
    isString(objectKey(value, 'firstName')) &&
    isString(objectKey(value, 'lastName')) &&
    isString(objectKey(value, 'organization')) &&
    isString(objectKey(value, 'city')) &&
    isStringArray(objectKey(value, 'address')) &&
    isString(objectKey(value, 'postalCode')) &&
    isString(objectKey(value, 'state')) &&
    isString(objectKey(value, 'phone')) &&
    isString(objectKey(value, 'fax')) &&
    isNumber(objectKey(value, 'balance')) &&
    isString(objectKey(value, 'vatId')) &&
    isString(objectKey(value, 'lastPayment')) &&
    isString(objectKey(value, 'lastAccess')) &&
    isString(objectKey(value, 'adminEmail')) &&
    isString(objectKey(value, 'robotEmail')) &&
    isStringArray(objectKey(value, 'checkdIp')) &&
    isString(objectKey(value, 'http')) &&
    isString(objectKey(value, 'url')) &&
    isStringArray(objectKey(value, 'whois'))
  );
}

export function explainJokerComApiProfileDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'headers',
      'body',
      'customerId',
      'firstName',
      'lastName',
      'organization',
      'city',
      'address',
      'postalCode',
      'state',
      'phone',
      'fax',
      'balance',
      'vatId',
      'lastPayment',
      'lastAccess',
      'adminEmail',
      'robotEmail',
      'checkdIp',
      'http',
      'url',
      'whois',
    ]),
    explainProperty(
      'headers',
      explainJokerStringObject(objectKey(value, 'headers')),
    ),
    explainProperty('body', explainJokerStringObject(objectKey(value, 'body'))),
    explainProperty(
      'customerId',
      explainString(objectKey(value, 'customerId')),
    ),
    explainProperty('firstName', explainString(objectKey(value, 'firstName'))),
    explainProperty('lastName', explainString(objectKey(value, 'lastName'))),
    explainProperty(
      'organization',
      explainString(objectKey(value, 'organization')),
    ),
    explainProperty('city', explainString(objectKey(value, 'city'))),
    explainProperty('address', explainStringArray(objectKey(value, 'address'))),
    explainProperty(
      'postalCode',
      explainString(objectKey(value, 'postalCode')),
    ),
    explainProperty('state', explainString(objectKey(value, 'state'))),
    explainProperty('phone', explainString(objectKey(value, 'phone'))),
    explainProperty('fax', explainString(objectKey(value, 'fax'))),
    explainProperty('balance', explainNumber(objectKey(value, 'balance'))),
    explainProperty('vatId', explainString(objectKey(value, 'vatId'))),
    explainProperty(
      'lastPayment',
      explainString(objectKey(value, 'lastPayment')),
    ),
    explainProperty(
      'lastAccess',
      explainString(objectKey(value, 'lastAccess')),
    ),
    explainProperty(
      'adminEmail',
      explainString(objectKey(value, 'adminEmail')),
    ),
    explainProperty(
      'robotEmail',
      explainString(objectKey(value, 'robotEmail')),
    ),
    explainProperty(
      'checkdIp',
      explainStringArray(objectKey(value, 'checkdIp')),
    ),
    explainProperty('http', explainString(objectKey(value, 'http'))),
    explainProperty('url', explainString(objectKey(value, 'url'))),
    explainProperty('whois', explainStringArray(objectKey(value, 'whois'))),
  ]);
}

export function stringifyJokerComApiProfileDTO(
  value: JokerComApiProfileDTO,
): string {
  return `JokerComApiProfileDTO(${value})`;
}

export function parseJokerComApiProfileDTO(
  value: unknown,
): JokerComApiProfileDTO | undefined {
  if (isJokerComApiProfileDTO(value)) return value;
  return undefined;
}
