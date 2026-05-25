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
  explainBooleanOrNullOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';
import {explainNumber, isNumber} from '../../types/Number';
import {isUndefined} from '../../types/undefined';
import {isNull} from '../../types/Null';

export interface ZendeskOrganizationMembership {
  readonly created_at?: string | null | undefined;
  readonly default: boolean | null | undefined;
  readonly id: number;
  readonly organization_id: number;
  readonly organization_name?: string | null | undefined;
  readonly updated_at?: string | null | undefined;
  readonly url?: string | null | undefined;
  readonly user_id: number;
  readonly view_tickets?: boolean | null | undefined;
}

export function isZendeskOrganizationMembership(
  value: unknown,
): value is ZendeskOrganizationMembership {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'created_at',
      'default',
      'id',
      'organization_id',
      'organization_name',
      'updated_at',
      'url',
      'user_id',
      'view_tickets',
    ]) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'default')) &&
    isNumber(objectKey(value, 'id')) &&
    isNumber(objectKey(value, 'organization_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'organization_name')) &&
    isStringOrNullOrUndefined(objectKey(value, 'updated_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'url')) &&
    isNumber(objectKey(value, 'user_id')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'view_tickets'))
  );
}

export function explainZendeskOrganizationMembership(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'created_at',
      'default',
      'id',
      'organization_id',
      'organization_name',
      'updated_at',
      'url',
      'user_id',
      'view_tickets',
    ]),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'default',
      explainBooleanOrNullOrUndefined(objectKey(value, 'default')),
    ),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'organization_id',
      explainNumber(objectKey(value, 'organization_id')),
    ),
    explainProperty(
      'organization_name',
      explainStringOrNullOrUndefined(objectKey(value, 'organization_name')),
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
      'view_tickets',
      explainBooleanOrNullOrUndefined(objectKey(value, 'view_tickets')),
    ),
  ]);
}

export function stringifyZendeskOrganizationMembership(
  value: ZendeskOrganizationMembership,
): string {
  return `ZendeskOrganizationMembership(${value})`;
}

export function parseZendeskOrganizationMembership(
  value: unknown,
): ZendeskOrganizationMembership | undefined {
  if (isZendeskOrganizationMembership(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskOrganizationMembershipOrUndefined(
  value: unknown,
): value is ZendeskOrganizationMembership | undefined {
  return isZendeskOrganizationMembership(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskOrganizationMembershipOrUndefined(
  value: unknown,
): string {
  return isZendeskOrganizationMembershipOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskOrganizationMembership or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskOrganizationMembershipOrNullOrUndefined(
  value: unknown,
): value is ZendeskOrganizationMembership | undefined | null {
  return (
    isZendeskOrganizationMembership(value) ||
    isUndefined(value) ||
    isNull(value)
  );
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskOrganizationMembershipOrNullOrUndefined(
  value: unknown,
): string {
  return isZendeskOrganizationMembershipOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskOrganizationMembership or undefined or null');
}
