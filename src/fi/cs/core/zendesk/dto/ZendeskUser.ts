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
  explainZendeskAttachmentOrNullOrUndefined,
  isZendeskAttachmentOrNullOrUndefined,
  ZendeskAttachment,
} from './ZendeskAttachment';
import {
  explainReadonlyJsonObjectOrNullOrUndefined,
  isReadonlyJsonObjectOrNullOrUndefined,
  ReadonlyJsonObject,
} from '../../Json';
import {
  explainBooleanOrNullOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';
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
  explainStringArrayOrUndefined,
  isStringArrayOrUndefined,
} from '../../types/StringArray';
import {isUndefined} from '../../types/undefined';
import {isNull} from '../../types/Null';

export interface ZendeskUser {
  readonly active?: boolean | null | undefined;
  readonly alias?: string | null | undefined;
  readonly chat_only?: boolean | null | undefined;
  readonly created_at?: string | null | undefined;
  readonly custom_role_id?: number | null | undefined;
  readonly default_group_id?: number | null | undefined;
  readonly details?: string | null | undefined;
  readonly email?: string | null | undefined;
  readonly external_id?: string | null | undefined;
  readonly iana_time_zone?: string | null | undefined;
  readonly id: number;
  readonly last_login_at?: string | null | undefined;
  readonly locale?: string | null | undefined;
  readonly locale_id?: number | null | undefined;
  readonly moderator?: boolean | null | undefined;
  readonly name: string;
  readonly notes?: string | null | undefined;
  readonly only_private_comments?: boolean | null | undefined;
  readonly organization_id?: number | null | undefined;
  readonly phone?: string | null | undefined;
  readonly photo?: ZendeskAttachment | null | undefined;
  readonly remote_photo_url?: string | null | undefined;
  readonly report_csv?: boolean | null | undefined;
  readonly restricted_agent?: boolean | null | undefined;
  readonly role?: string | null | undefined;
  readonly role_type?: number | null | undefined;
  readonly shared?: boolean | null | undefined;
  readonly shared_agent?: boolean | null | undefined;
  readonly shared_phone_number?: boolean | null | undefined;
  readonly signature?: string | null | undefined;
  readonly suspended?: boolean | null | undefined;
  readonly tags?: readonly string[];
  readonly ticket_restriction?: string | null | undefined;
  readonly time_zone?: string | null | undefined;
  readonly two_factor_auth_enabled?: boolean | null | undefined;
  readonly updated_at?: string | null | undefined;
  readonly url?: string | null | undefined;
  readonly user_fields?: ReadonlyJsonObject | null | undefined;
  readonly verified?: boolean | null | undefined;
}

export function isZendeskUser(value: unknown): value is ZendeskUser {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'active',
      'alias',
      'chat_only',
      'created_at',
      'custom_role_id',
      'default_group_id',
      'details',
      'email',
      'external_id',
      'iana_time_zone',
      'id',
      'last_login_at',
      'locale',
      'locale_id',
      'moderator',
      'name',
      'notes',
      'only_private_comments',
      'organization_id',
      'phone',
      'photo',
      'remote_photo_url',
      'report_csv',
      'restricted_agent',
      'role',
      'role_type',
      'shared',
      'shared_agent',
      'shared_phone_number',
      'signature',
      'suspended',
      'tags',
      'ticket_restriction',
      'time_zone',
      'two_factor_auth_enabled',
      'updated_at',
      'url',
      'user_fields',
      'verified',
    ]) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'active')) &&
    isStringOrNullOrUndefined(objectKey(value, 'alias')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'chat_only')) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'custom_role_id')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'default_group_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'details')) &&
    isStringOrNullOrUndefined(objectKey(value, 'email')) &&
    isStringOrNullOrUndefined(objectKey(value, 'external_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'iana_time_zone')) &&
    isNumber(objectKey(value, 'id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'last_login_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'locale')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'locale_id')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'moderator')) &&
    isString(objectKey(value, 'name')) &&
    isStringOrNullOrUndefined(objectKey(value, 'notes')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'only_private_comments')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'organization_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'phone')) &&
    isZendeskAttachmentOrNullOrUndefined(objectKey(value, 'photo')) &&
    isStringOrNullOrUndefined(objectKey(value, 'remote_photo_url')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'report_csv')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'restricted_agent')) &&
    isStringOrNullOrUndefined(objectKey(value, 'role')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'role_type')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'shared')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'shared_agent')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'shared_phone_number')) &&
    isStringOrNullOrUndefined(objectKey(value, 'signature')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'suspended')) &&
    isStringArrayOrUndefined(objectKey(value, 'tags')) &&
    isStringOrNullOrUndefined(objectKey(value, 'ticket_restriction')) &&
    isStringOrNullOrUndefined(objectKey(value, 'time_zone')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'two_factor_auth_enabled')) &&
    isStringOrNullOrUndefined(objectKey(value, 'updated_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'url')) &&
    isReadonlyJsonObjectOrNullOrUndefined(objectKey(value, 'user_fields')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'verified'))
  );
}

export function explainZendeskUser(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'active',
      'alias',
      'chat_only',
      'created_at',
      'custom_role_id',
      'default_group_id',
      'details',
      'email',
      'external_id',
      'iana_time_zone',
      'id',
      'last_login_at',
      'locale',
      'locale_id',
      'moderator',
      'name',
      'notes',
      'only_private_comments',
      'organization_id',
      'phone',
      'photo',
      'remote_photo_url',
      'report_csv',
      'restricted_agent',
      'role',
      'role_type',
      'shared',
      'shared_agent',
      'shared_phone_number',
      'signature',
      'suspended',
      'tags',
      'ticket_restriction',
      'time_zone',
      'two_factor_auth_enabled',
      'updated_at',
      'url',
      'user_fields',
      'verified',
    ]),
    explainProperty(
      'active',
      explainBooleanOrNullOrUndefined(objectKey(value, 'active')),
    ),
    explainProperty(
      'alias',
      explainStringOrNullOrUndefined(objectKey(value, 'alias')),
    ),
    explainProperty(
      'chat_only',
      explainBooleanOrNullOrUndefined(objectKey(value, 'chat_only')),
    ),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'custom_role_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'custom_role_id')),
    ),
    explainProperty(
      'default_group_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'default_group_id')),
    ),
    explainProperty(
      'details',
      explainStringOrNullOrUndefined(objectKey(value, 'details')),
    ),
    explainProperty(
      'email',
      explainStringOrNullOrUndefined(objectKey(value, 'email')),
    ),
    explainProperty(
      'external_id',
      explainStringOrNullOrUndefined(objectKey(value, 'external_id')),
    ),
    explainProperty(
      'iana_time_zone',
      explainStringOrNullOrUndefined(objectKey(value, 'iana_time_zone')),
    ),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'last_login_at',
      explainStringOrNullOrUndefined(objectKey(value, 'last_login_at')),
    ),
    explainProperty(
      'locale',
      explainStringOrNullOrUndefined(objectKey(value, 'locale')),
    ),
    explainProperty(
      'locale_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'locale_id')),
    ),
    explainProperty(
      'moderator',
      explainBooleanOrNullOrUndefined(objectKey(value, 'moderator')),
    ),
    explainProperty('name', explainString(objectKey(value, 'name'))),
    explainProperty(
      'notes',
      explainStringOrNullOrUndefined(objectKey(value, 'notes')),
    ),
    explainProperty(
      'only_private_comments',
      explainBooleanOrNullOrUndefined(
        objectKey(value, 'only_private_comments'),
      ),
    ),
    explainProperty(
      'organization_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'organization_id')),
    ),
    explainProperty(
      'phone',
      explainStringOrNullOrUndefined(objectKey(value, 'phone')),
    ),
    explainProperty(
      'photo',
      explainZendeskAttachmentOrNullOrUndefined(objectKey(value, 'photo')),
    ),
    explainProperty(
      'remote_photo_url',
      explainStringOrNullOrUndefined(objectKey(value, 'remote_photo_url')),
    ),
    explainProperty(
      'report_csv',
      explainBooleanOrNullOrUndefined(objectKey(value, 'report_csv')),
    ),
    explainProperty(
      'restricted_agent',
      explainBooleanOrNullOrUndefined(objectKey(value, 'restricted_agent')),
    ),
    explainProperty(
      'role',
      explainStringOrNullOrUndefined(objectKey(value, 'role')),
    ),
    explainProperty(
      'role_type',
      explainNumberOrNullOrUndefined(objectKey(value, 'role_type')),
    ),
    explainProperty(
      'shared',
      explainBooleanOrNullOrUndefined(objectKey(value, 'shared')),
    ),
    explainProperty(
      'shared_agent',
      explainBooleanOrNullOrUndefined(objectKey(value, 'shared_agent')),
    ),
    explainProperty(
      'shared_phone_number',
      explainBooleanOrNullOrUndefined(objectKey(value, 'shared_phone_number')),
    ),
    explainProperty(
      'signature',
      explainStringOrNullOrUndefined(objectKey(value, 'signature')),
    ),
    explainProperty(
      'suspended',
      explainBooleanOrNullOrUndefined(objectKey(value, 'suspended')),
    ),
    explainProperty(
      'tags',
      explainStringArrayOrUndefined(objectKey(value, 'tags')),
    ),
    explainProperty(
      'ticket_restriction',
      explainStringOrNullOrUndefined(objectKey(value, 'ticket_restriction')),
    ),
    explainProperty(
      'time_zone',
      explainStringOrNullOrUndefined(objectKey(value, 'time_zone')),
    ),
    explainProperty(
      'two_factor_auth_enabled',
      explainBooleanOrNullOrUndefined(
        objectKey(value, 'two_factor_auth_enabled'),
      ),
    ),
    explainProperty(
      'updated_at',
      explainStringOrNullOrUndefined(objectKey(value, 'updated_at')),
    ),
    explainProperty(
      'url',
      explainStringOrNullOrUndefined(objectKey(value, 'url')),
    ),
    explainProperty(
      'user_fields',
      explainReadonlyJsonObjectOrNullOrUndefined(
        objectKey(value, 'user_fields'),
      ),
    ),
    explainProperty(
      'verified',
      explainBooleanOrNullOrUndefined(objectKey(value, 'verified')),
    ),
  ]);
}

export function stringifyZendeskUser(value: ZendeskUser): string {
  return `ZendeskUser(${value})`;
}

export function parseZendeskUser(value: unknown): ZendeskUser | undefined {
  if (isZendeskUser(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskUserOrUndefined(
  value: unknown,
): value is ZendeskUser | undefined {
  return isZendeskUser(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskUserOrUndefined(value: unknown): string {
  return isZendeskUserOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskUser or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskUserOrNullOrUndefined(
  value: unknown,
): value is ZendeskUser | undefined | null {
  return isZendeskUser(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskUserOrNullOrUndefined(value: unknown): string {
  return isZendeskUserOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskUser or undefined or null');
}
