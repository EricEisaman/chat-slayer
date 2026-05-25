import {
  explainJokerStringObject,
  isJokerStringObject,
  JokerStringObject,
} from './JokerStringObject';
import {explain, explainProperty} from '../../../../types/explain';
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
export interface JokerComApiWhoisDTO {
  readonly body: JokerStringObject;
  readonly headers: JokerStringObject;
}

export function createJokerComApiWhoisDTO(
  headers: JokerStringObject,
  body: JokerStringObject,
): JokerComApiWhoisDTO {
  return {
    headers,
    body,
  };
}

export function isJokerComApiWhoisDTO(
  value: unknown,
): value is JokerComApiWhoisDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['headers', 'body']) &&
    isJokerStringObject(objectKey(value, 'headers')) &&
    isJokerStringObject(objectKey(value, 'body'))
  );
}

export function explainJokerComApiWhoisDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['headers', 'body']),
    explainProperty(
      'headers',
      explainJokerStringObject(objectKey(value, 'headers')),
    ),
    explainProperty('body', explainJokerStringObject(objectKey(value, 'body'))),
  ]);
}

export function stringifyJokerComApiWhoisDTO(
  value: JokerComApiWhoisDTO,
): string {
  return `JokerComApiWhoisDTO(${value})`;
}

export function parseJokerComApiWhoisDTO(
  value: unknown,
): JokerComApiWhoisDTO | undefined {
  if (isJokerComApiWhoisDTO(value)) return value;
  return undefined;
}
