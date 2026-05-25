import {explain, explainProperty} from '../../types/explain';
import {explainString, isString} from '../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../types/OtherKeys';

export interface WhoisLookupResult {
  readonly server: string;
  readonly data: string;
}

export function createWhoisLookupResult(
  server: string,
  data: string,
): WhoisLookupResult {
  return {
    server,
    data,
  };
}

export function isWhoisLookupResult(
  value: unknown,
): value is WhoisLookupResult {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['server', 'data']) &&
    isString(objectKey(value, 'server')) &&
    isString(objectKey(value, 'data'))
  );
}

export function explainWhoisLookupResult(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['server', 'data']),
    explainProperty('server', explainString(objectKey(value, 'server'))),
    explainProperty('data', explainString(objectKey(value, 'data'))),
  ]);
}

export function stringifyWhoisLookupResult(value: WhoisLookupResult): string {
  if (!isWhoisLookupResult(value))
    throw new TypeError(`Not WhoisLookupResult: ${value}`);
  return `WhoisLookupResult(${value})`;
}

export function parseWhoisLookupResult(
  value: unknown,
): WhoisLookupResult | undefined {
  if (isWhoisLookupResult(value)) return value;
  return undefined;
}
