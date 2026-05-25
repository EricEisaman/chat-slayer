import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
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
  explainBooleanOrNullOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';
import {explainNumber, isNumber} from '../../types/Number';
import {isUndefined} from '../../types/undefined';
import {isNull} from '../../types/Null';

export interface ZendeskGroupMembership {
  readonly created_at?: string | null | undefined;
  readonly default?: boolean | null | undefined;
  readonly group_id: number;
  readonly id: number;
  readonly updated_at?: string | null | undefined;
  readonly url?: string | null | undefined;
  readonly user_id: number;
}

export function isZendeskGroupMembership(
  value: unknown,
): value is ZendeskGroupMembership {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'created_at',
      'default',
      'group_id',
      'id',
      'updated_at',
      'url',
      'user_id',
    ]) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'default')) &&
    isNumber(objectKey(value, 'group_id')) &&
    isNumber(objectKey(value, 'id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'updated_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'url')) &&
    isNumber(objectKey(value, 'user_id'))
  );
}

export function explainZendeskGroupMembership(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'created_at',
      'default',
      'group_id',
      'id',
      'updated_at',
      'url',
      'user_id',
    ]),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'default',
      explainBooleanOrNullOrUndefined(objectKey(value, 'default')),
    ),
    explainProperty('group_id', explainNumber(objectKey(value, 'group_id'))),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'updated_at',
      explainStringOrNullOrUndefined(objectKey(value, 'updated_at')),
    ),
    explainProperty(
      'url',
      explainStringOrNullOrUndefined(objectKey(value, 'url')),
    ),
    explainProperty('user_id', explainNumber(objectKey(value, 'user_id'))),
  ]);
}

export function stringifyZendeskGroupMembership(
  value: ZendeskGroupMembership,
): string {
  return `ZendeskGroupMembership(${value})`;
}

export function parseZendeskGroupMembership(
  value: unknown,
): ZendeskGroupMembership | undefined {
  if (isZendeskGroupMembership(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskGroupMembershipOrUndefined(
  value: unknown,
): value is ZendeskGroupMembership | undefined {
  return isZendeskGroupMembership(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskGroupMembershipOrUndefined(
  value: unknown,
): string {
  return isZendeskGroupMembershipOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskGroupMembership or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskGroupMembershipOrNullOrUndefined(
  value: unknown,
): value is ZendeskGroupMembership | undefined | null {
  return isZendeskGroupMembership(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskGroupMembershipOrNullOrUndefined(
  value: unknown,
): string {
  return isZendeskGroupMembershipOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskGroupMembership or undefined or null');
}
