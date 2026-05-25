import {
  explainJokerStringObject,
  isJokerStringObject,
  JokerStringObject,
} from './JokerStringObject';
import {
  explainJokerComApiDomainStatus,
  isJokerComApiDomainStatus,
  JokerComApiDomainStatus,
} from './JokerComApiDomainStatus';
import {
  explainJokerComApiDomainPrice,
  isJokerComApiDomainPrice,
  JokerComApiDomainPrice,
} from './JokerComApiDomainPrice';
import {explain, explainProperty} from '../../../../types/explain';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../../types/OtherKeys';
import {
  explainArrayOfOrUndefined,
  isArrayOfOrUndefined,
} from '../../../../types/Array';

/**
 *
 * @see https://joker.com/faq/content/27/497/en/domain_check.html
 */
export interface JokerComApiDomainCheckDTO {
  readonly domain: string;
  readonly body: JokerStringObject;
  readonly headers: JokerStringObject;
  readonly status: JokerComApiDomainStatus;
  readonly statusReason?: string;
  readonly domainClass?: string;
  readonly prices?: readonly JokerComApiDomainPrice[];
}

export function createJokerComApiDomainCheckDTO(
  domain: string,
  headers: JokerStringObject,
  body: JokerStringObject,
  status: JokerComApiDomainStatus,
  statusReason?: string,
  domainClass?: string,
  prices?: readonly JokerComApiDomainPrice[],
): JokerComApiDomainCheckDTO {
  return {
    domain,
    headers,
    body,
    status,
    statusReason,
    domainClass,
    prices,
  };
}

export function isJokerComApiDomainCheckDTO(
  value: unknown,
): value is JokerComApiDomainCheckDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'domain',
      'headers',
      'body',
      'status',
      'statusReason',
      'domainClass',
      'prices',
    ]) &&
    isString(objectKey(value, 'domain')) &&
    isJokerStringObject(objectKey(value, 'headers')) &&
    isJokerStringObject(objectKey(value, 'body')) &&
    isJokerComApiDomainStatus(objectKey(value, 'status')) &&
    isStringOrUndefined(objectKey(value, 'statusReason')) &&
    isStringOrUndefined(objectKey(value, 'domainClass')) &&
    isArrayOfOrUndefined<JokerComApiDomainPrice>(
      objectKey(value, 'prices'),
      isJokerComApiDomainPrice,
    )
  );
}

export function explainJokerComApiDomainCheckDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'domain',
      'headers',
      'body',
      'status',
      'statusReason',
      'domainClass',
      'prices',
    ]),
    explainProperty('domain', explainString(objectKey(value, 'domain'))),
    explainProperty(
      'headers',
      explainJokerStringObject(objectKey(value, 'headers')),
    ),
    explainProperty('body', explainJokerStringObject(objectKey(value, 'body'))),
    explainProperty(
      'status',
      explainJokerComApiDomainStatus(objectKey(value, 'status')),
    ),
    explainProperty(
      'statusReason',
      explainStringOrUndefined(objectKey(value, 'statusReason')),
    ),
    explainProperty(
      'domainClass',
      explainStringOrUndefined(objectKey(value, 'domainClass')),
    ),
    explainProperty(
      'prices',
      explainArrayOfOrUndefined<JokerComApiDomainPrice>(
        'JokerComApiDomainPrice',
        explainJokerComApiDomainPrice,
        objectKey(value, 'domainClass'),
        isJokerComApiDomainPrice,
      ),
    ),
  ]);
}

export function stringifyJokerComApiDomainCheckDTO(
  value: JokerComApiDomainCheckDTO,
): string {
  return `JokerComApiDomainCheckDTO(${value})`;
}

export function parseJokerComApiDomainCheckDTO(
  value: unknown,
): JokerComApiDomainCheckDTO | undefined {
  if (isJokerComApiDomainCheckDTO(value)) return value;
  return undefined;
}
