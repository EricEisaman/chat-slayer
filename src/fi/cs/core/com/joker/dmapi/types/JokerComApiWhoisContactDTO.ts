import {
  explainJokerStringObject,
  isJokerStringObject,
  JokerStringObject,
} from './JokerStringObject';
import {explain, explainProperty} from '../../../../types/explain';
import {explainString, isString} from '../../../../types/String';
import {explainStringArray, isStringArray} from '../../../../types/StringArray';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../../types/OtherKeys';

/**
 *
 * @see https://joker.com/faq/content/79/455/en/query_whois.html
 */
export interface JokerComApiWhoisContactDTO {
  readonly headers: JokerStringObject;
  readonly body: JokerStringObject;
  readonly name: string;
  readonly organization: string;
  readonly address: readonly string[];
  readonly city: string;
  readonly postalCode: string;
  readonly country: string;
  readonly email: string;
  readonly phone: string;
  readonly handle: string;
  readonly created: string;
  readonly modified: string;
}

export function createJokerComApiWhoisContactDTO(
  name: string,
  organization: string,
  address: readonly string[],
  city: string,
  postalCode: string,
  country: string,
  email: string,
  phone: string,
  handle: string,
  created: string,
  modified: string,
  headers: JokerStringObject,
  body: JokerStringObject,
): JokerComApiWhoisContactDTO {
  return {
    name,
    organization,
    address,
    city,
    postalCode,
    country,
    email,
    phone,
    handle,
    created,
    modified,
    headers,
    body,
  };
}

export function isJokerComApiWhoisContactDTO(
  value: unknown,
): value is JokerComApiWhoisContactDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'name',
      'organization',
      'address',
      'city',
      'postalCode',
      'country',
      'email',
      'phone',
      'handle',
      'created',
      'modified',
      'headers',
      'body',
    ]) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'organization')) &&
    isStringArray(objectKey(value, 'address')) &&
    isString(objectKey(value, 'city')) &&
    isString(objectKey(value, 'postalCode')) &&
    isString(objectKey(value, 'country')) &&
    isString(objectKey(value, 'email')) &&
    isString(objectKey(value, 'phone')) &&
    isString(objectKey(value, 'handle')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'modified')) &&
    isJokerStringObject(objectKey(value, 'headers')) &&
    isJokerStringObject(objectKey(value, 'body'))
  );
}

export function explainJokerComApiWhoisContactDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'name',
      'organization',
      'address',
      'city',
      'postalCode',
      'country',
      'email',
      'phone',
      'handle',
      'created',
      'modified',
      'headers',
      'body',
    ]),
    explainProperty(
      'organization',
      explainString(objectKey(value, 'organization')),
    ),
    explainProperty('address', explainStringArray(objectKey(value, 'address'))),
    explainProperty('city', explainString(objectKey(value, 'city'))),
    explainProperty(
      'postalCode',
      explainString(objectKey(value, 'postalCode')),
    ),
    explainProperty('country', explainString(objectKey(value, 'country'))),
    explainProperty('email', explainString(objectKey(value, 'email'))),
    explainProperty('phone', explainString(objectKey(value, 'phone'))),
    explainProperty('handle', explainString(objectKey(value, 'handle'))),
    explainProperty('created', explainString(objectKey(value, 'created'))),
    explainProperty('modified', explainString(objectKey(value, 'modified'))),
    explainProperty(
      'headers',
      explainJokerStringObject(objectKey(value, 'headers')),
    ),
    explainProperty('body', explainJokerStringObject(objectKey(value, 'body'))),
  ]);
}

export function stringifyJokerComApiWhoisContactDTO(
  value: JokerComApiWhoisContactDTO,
): string {
  return `JokerComApiWhoisContactDTO(${value})`;
}

export function parseJokerComApiWhoisContactDTO(
  value: unknown,
): JokerComApiWhoisContactDTO | undefined {
  if (isJokerComApiWhoisContactDTO(value)) return value;
  return undefined;
}
