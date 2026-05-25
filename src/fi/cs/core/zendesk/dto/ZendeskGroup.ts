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
  explainString,
  explainStringOrNullOrUndefined,
  isString,
  isStringOrNullOrUndefined,
} from '../../types/String';
import {
  explainBooleanOrNullOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';
import {explainNumber, isNumber} from '../../types/Number';
import {isUndefined} from '../../types/undefined';
import {isNull} from '../../types/Null';

export interface ZendeskGroup {
  readonly created_at?: string | null | undefined;
  readonly default?: boolean | null | undefined;
  readonly deleted?: boolean | null | undefined;
  readonly description?: string | null | undefined;
  readonly id: number;
  readonly is_public?: boolean | null | undefined;
  readonly name: string;
  readonly updated_at?: string | null | undefined;
  readonly url?: string | null | undefined;
}

export function isZendeskGroup(value: unknown): value is ZendeskGroup {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'created_at',
      'default',
      'deleted',
      'description',
      'id',
      'is_public',
      'name',
      'updated_at',
      'url',
    ]) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'default')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'deleted')) &&
    isStringOrNullOrUndefined(objectKey(value, 'description')) &&
    isNumber(objectKey(value, 'id')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'is_public')) &&
    isString(objectKey(value, 'name')) &&
    isStringOrNullOrUndefined(objectKey(value, 'updated_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'url'))
  );
}

export function explainZendeskGroup(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'created_at',
      'default',
      'deleted',
      'description',
      'id',
      'is_public',
      'name',
      'updated_at',
      'url',
    ]),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'default',
      explainBooleanOrNullOrUndefined(objectKey(value, 'default')),
    ),
    explainProperty(
      'deleted',
      explainBooleanOrNullOrUndefined(objectKey(value, 'deleted')),
    ),
    explainProperty(
      'description',
      explainStringOrNullOrUndefined(objectKey(value, 'description')),
    ),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'is_public',
      explainBooleanOrNullOrUndefined(objectKey(value, 'is_public')),
    ),
    explainProperty('name', explainString(objectKey(value, 'name'))),
    explainProperty(
      'updated_at',
      explainStringOrNullOrUndefined(objectKey(value, 'updated_at')),
    ),
    explainProperty(
      'url',
      explainStringOrNullOrUndefined(objectKey(value, 'url')),
    ),
  ]);
}

export function stringifyZendeskGroup(value: ZendeskGroup): string {
  return `ZendeskGroup(${value})`;
}

export function parseZendeskGroup(value: unknown): ZendeskGroup | undefined {
  if (isZendeskGroup(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskGroupOrUndefined(
  value: unknown,
): value is ZendeskGroup | undefined {
  return isZendeskGroup(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskGroupOrUndefined(value: unknown): string {
  return isZendeskGroupOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskGroup or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskGroupOrNullOrUndefined(
  value: unknown,
): value is ZendeskGroup | undefined | null {
  return isZendeskGroup(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskGroupOrNullOrUndefined(value: unknown): string {
  return isZendeskGroupOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskGroup or undefined or null');
}
