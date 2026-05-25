import {explain, explainProperty} from '../../types/explain';
import {
  explainBooleanOrUndefined,
  isBooleanOrUndefined,
} from '../../types/Boolean';
import {
  explainStringOrUndefined,
  isStringOrUndefined,
} from '../../types/String';
import {
  explainNumberOrUndefined,
  isNumberOrUndefined,
} from '../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../types/OtherKeys';

export interface WhoisServerOptions {
  readonly host?: string;
  readonly port?: number;
  readonly query?: string;
  readonly punycode?: boolean;
}

export function createWhoisServerOptions(
  host?: string,
  port?: number,
  query?: string,
  punycode?: boolean,
): WhoisServerOptions {
  return {
    host,
    port,
    query,
    punycode,
  };
}

export function isWhoisServerOptions(
  value: unknown,
): value is WhoisServerOptions {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['host', 'port', 'query', 'punycode']) &&
    isStringOrUndefined(objectKey(value, 'host')) &&
    isNumberOrUndefined(objectKey(value, 'port')) &&
    isStringOrUndefined(objectKey(value, 'query')) &&
    isBooleanOrUndefined(objectKey(value, 'punycode'))
  );
}

export function explainWhoisServerOptions(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['host', 'port', 'query', 'punycode']),
    explainProperty('host', explainStringOrUndefined(objectKey(value, 'host'))),
    explainProperty('port', explainNumberOrUndefined(objectKey(value, 'port'))),
    explainProperty(
      'query',
      explainStringOrUndefined(objectKey(value, 'query')),
    ),
    explainProperty(
      'punycode',
      explainBooleanOrUndefined(objectKey(value, 'punycode')),
    ),
  ]);
}

export function stringifyWhoisServerOptions(value: WhoisServerOptions): string {
  if (!isWhoisServerOptions(value))
    throw new TypeError(`Not WhoisServerOptions: ${value}`);
  return `WhoisServerOptions(${value})`;
}

export function parseWhoisServerOptions(
  value: unknown,
): WhoisServerOptions | undefined {
  if (isWhoisServerOptions(value)) return value;
  return undefined;
}
