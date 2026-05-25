import {explain, explainProperty} from '../../../../types/explain';
import {
  explainBooleanOrUndefined,
  isBooleanOrUndefined,
} from '../../../../types/Boolean';
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

export interface JokerDomainResult {
  readonly domain: string;
  readonly expiration: string;
  readonly status?: string;
  readonly jokerns?: boolean;
  readonly grants?: string;
}

export function createJokerDomainResult(
  domain: string,
  expiration: string,
  status?: string,
  jokerns?: boolean,
  grants?: string,
): JokerDomainResult {
  return {
    domain,
    expiration,
    status,
    jokerns,
    grants,
  };
}

export function isJokerDomainResult(
  value: unknown,
): value is JokerDomainResult {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'domain',
      'expiration',
      'status',
      'jokerns',
      'grants',
    ]) &&
    isString(objectKey(value, 'domain')) &&
    isString(objectKey(value, 'expiration')) &&
    isStringOrUndefined(objectKey(value, 'status')) &&
    isBooleanOrUndefined(objectKey(value, 'jokerns')) &&
    isStringOrUndefined(objectKey(value, 'grants'))
  );
}

export function explainJokerDomainResult(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'domain',
      'expiration',
      'status',
      'jokerns',
      'grants',
    ]),
    explainProperty('domain', explainString(objectKey(value, 'domain'))),
    explainProperty(
      'expiration',
      explainString(objectKey(value, 'expiration')),
    ),
    explainProperty(
      'status',
      explainStringOrUndefined(objectKey(value, 'status')),
    ),
    explainProperty(
      'jokerns',
      explainBooleanOrUndefined(objectKey(value, 'jokerns')),
    ),
    explainProperty(
      'grants',
      explainStringOrUndefined(objectKey(value, 'grants')),
    ),
  ]);
}

export function stringifyJokerDomainResult(value: JokerDomainResult): string {
  return `JokerDomainResult(${value})`;
}

export function parseJokerDomainResult(
  value: unknown,
): JokerDomainResult | undefined {
  if (isJokerDomainResult(value)) return value;
  return undefined;
}
