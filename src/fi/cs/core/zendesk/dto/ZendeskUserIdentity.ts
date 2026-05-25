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
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {isUndefined} from '../../types/undefined';
import {isNull} from '../../types/Null';
import {
  explainString,
  explainStringOrNullOrUndefined,
  isString,
  isStringOrNullOrUndefined,
} from '../../types/String';
import {
  explainNumber,
  explainNumberOrNullOrUndefined,
  isNumber,
  isNumberOrNullOrUndefined,
} from '../../types/Number';
import {
  explainBooleanOrNullOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';

export interface ZendeskUserIdentity {
  readonly created_at?: string | null | undefined;
  readonly deliverable_state?: string | null | undefined;
  readonly id: number;
  readonly primary?: boolean | null | undefined;
  readonly type: string;
  readonly undeliverable_count?: number | null | undefined;
  readonly updated_at?: string | null | undefined;
  readonly url?: string | null | undefined;
  readonly user_id: number;
  readonly value?: string | null | undefined;
  readonly verified?: boolean | null | undefined;
}

export function isZendeskUserIdentity(
  value: unknown,
): value is ZendeskUserIdentity {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'created_at',
      'deliverable_state',
      'id',
      'primary',
      'type',
      'undeliverable_count',
      'updated_at',
      'url',
      'user_id',
      'value',
      'verified',
    ]) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'deliverable_state')) &&
    isNumber(objectKey(value, 'id')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'primary')) &&
    isString(objectKey(value, 'type')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'undeliverable_count')) &&
    isStringOrNullOrUndefined(objectKey(value, 'updated_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'url')) &&
    isNumber(objectKey(value, 'user_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'value')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'verified'))
  );
}

export function explainZendeskUserIdentity(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'created_at',
      'deliverable_state',
      'id',
      'primary',
      'type',
      'undeliverable_count',
      'updated_at',
      'url',
      'user_id',
      'value',
      'verified',
    ]),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'deliverable_state',
      explainStringOrNullOrUndefined(objectKey(value, 'deliverable_state')),
    ),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'primary',
      explainBooleanOrNullOrUndefined(objectKey(value, 'primary')),
    ),
    explainProperty('type', explainString(objectKey(value, 'type'))),
    explainProperty(
      'undeliverable_count',
      explainNumberOrNullOrUndefined(objectKey(value, 'undeliverable_count')),
    ),
    explainProperty(
      'updated_at',
      explainStringOrNullOrUndefined(objectKey(value, 'updated_at')),
    ),
    explainProperty(
      'url',
      explainStringOrNullOrUndefined(objectKey(value, 'url')),
    ),
    explainProperty('user_id', explainNumber(objectKey(value, 'user_id'))),
    explainProperty(
      'value',
      explainStringOrNullOrUndefined(objectKey(value, 'value')),
    ),
    explainProperty(
      'verified',
      explainBooleanOrNullOrUndefined(objectKey(value, 'verified')),
    ),
  ]);
}

export function stringifyZendeskUserIdentity(
  value: ZendeskUserIdentity,
): string {
  return `ZendeskUserIdentity(${value})`;
}

export function parseZendeskUserIdentity(
  value: unknown,
): ZendeskUserIdentity | undefined {
  if (isZendeskUserIdentity(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskUserIdentityOrUndefined(
  value: unknown,
): value is ZendeskUserIdentity | undefined {
  return isZendeskUserIdentity(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskUserIdentityOrUndefined(value: unknown): string {
  return isZendeskUserIdentityOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskUserIdentity or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskUserIdentityOrNullOrUndefined(
  value: unknown,
): value is ZendeskUserIdentity | undefined | null {
  return isZendeskUserIdentity(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskUserIdentityOrNullOrUndefined(
  value: unknown,
): string {
  return isZendeskUserIdentityOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskUserIdentity or undefined or null');
}
