import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explain,
  explainNot,
  explainOk,
  explainProperty,
} from '../../types/explain';
import {
  explainStringOrNullOrUndefined,
  isStringOrNullOrUndefined,
} from '../../types/String';
import {
  explainNumberOrNullOrUndefined,
  isNumberOrNullOrUndefined,
} from '../../types/Number';
import {isUndefined} from '../../types/undefined';
import {isNull} from '../../types/Null';

export interface ZendeskAuthor {
  readonly email?: string | null | undefined;
  readonly id?: number | null | undefined;
  readonly name?: string | null | undefined;
}

export function isZendeskAuthor(value: unknown): value is ZendeskAuthor {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['email', 'id', 'name']) &&
    isStringOrNullOrUndefined(objectKey(value, 'email')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'name'))
  );
}

export function explainZendeskAuthor(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['email', 'id', 'name']),
    explainProperty(
      'email',
      explainStringOrNullOrUndefined(objectKey(value, 'email')),
    ),
    explainProperty(
      'id',
      explainNumberOrNullOrUndefined(objectKey(value, 'id')),
    ),
    explainProperty(
      'name',
      explainStringOrNullOrUndefined(objectKey(value, 'name')),
    ),
  ]);
}

export function stringifyZendeskAuthor(value: ZendeskAuthor): string {
  return `ZendeskAuthor(${value})`;
}

export function parseZendeskAuthor(value: unknown): ZendeskAuthor | undefined {
  if (isZendeskAuthor(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskAuthorOrUndefined(
  value: unknown,
): value is ZendeskAuthor | undefined {
  return isZendeskAuthor(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskAuthorOrUndefined(value: unknown): string {
  return isZendeskAuthorOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskAuthor or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskAuthorOrNullOrUndefined(
  value: unknown,
): value is ZendeskAuthor | undefined | null {
  return isZendeskAuthor(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskAuthorOrNullOrUndefined(value: unknown): string {
  return isZendeskAuthorOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskAuthor or undefined or null');
}
