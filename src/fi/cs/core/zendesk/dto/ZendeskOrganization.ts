import {isUndefined} from '../../types/undefined';
import {
  explain,
  explainNot,
  explainOk,
  explainProperty,
} from '../../types/explain';
import {isNull} from '../../types/Null';
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
  explainReadonlyJsonObjectOrNullOrUndefined,
  isReadonlyJsonObjectOrNullOrUndefined,
  ReadonlyJsonObject,
} from '../../Json';
import {
  explainStringOrNullOrUndefined,
  isStringOrNullOrUndefined,
} from '../../types/String';
import {explainStringArray, isStringArray} from '../../types/StringArray';
import {
  explainBooleanOrNullOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';
import {
  explainNumber,
  explainNumberOrNullOrUndefined,
  isNumber,
  isNumberOrNullOrUndefined,
} from '../../types/Number';

export interface ZendeskOrganization {
  readonly created_at?: string | null | undefined;
  readonly details?: string | null | undefined;
  readonly domain_names?: readonly string[];
  readonly external_id?: string | null | undefined;
  readonly group_id?: number | null | undefined;
  readonly id: number;
  readonly name?: string | null | undefined;
  readonly notes?: string | null | undefined;
  readonly organization_fields?: ReadonlyJsonObject | null | undefined;
  readonly shared_comments?: boolean | null | undefined;
  readonly shared_tickets?: boolean | null | undefined;
  readonly tags?: readonly string[];
  readonly updated_at?: string | null | undefined;
  readonly url?: string | null | undefined;
}

export function isZendeskOrganization(
  value: unknown,
): value is ZendeskOrganization {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'created_at',
      'details',
      'domain_names',
      'external_id',
      'group_id',
      'id',
      'name',
      'notes',
      'organization_fields',
      'shared_comments',
      'shared_tickets',
      'tags',
      'updated_at',
      'url',
    ]) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'details')) &&
    isStringArray(objectKey(value, 'domain_names')) &&
    isStringOrNullOrUndefined(objectKey(value, 'external_id')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'group_id')) &&
    isNumber(objectKey(value, 'id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'name')) &&
    isStringOrNullOrUndefined(objectKey(value, 'notes')) &&
    isReadonlyJsonObjectOrNullOrUndefined(
      objectKey(value, 'organization_fields'),
    ) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'shared_comments')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'shared_tickets')) &&
    isStringArray(objectKey(value, 'tags')) &&
    isStringOrNullOrUndefined(objectKey(value, 'updated_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'url'))
  );
}

export function explainZendeskOrganization(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'created_at',
      'details',
      'domain_names',
      'external_id',
      'group_id',
      'id',
      'name',
      'notes',
      'organization_fields',
      'shared_comments',
      'shared_tickets',
      'tags',
      'updated_at',
      'url',
    ]),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'details',
      explainStringOrNullOrUndefined(objectKey(value, 'details')),
    ),
    explainProperty(
      'domain_names',
      explainStringArray(objectKey(value, 'domain_names')),
    ),
    explainProperty(
      'external_id',
      explainStringOrNullOrUndefined(objectKey(value, 'external_id')),
    ),
    explainProperty(
      'group_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'group_id')),
    ),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'name',
      explainStringOrNullOrUndefined(objectKey(value, 'name')),
    ),
    explainProperty(
      'notes',
      explainStringOrNullOrUndefined(objectKey(value, 'notes')),
    ),
    explainProperty(
      'organization_fields',
      explainReadonlyJsonObjectOrNullOrUndefined(
        objectKey(value, 'organization_fields'),
      ),
    ),
    explainProperty(
      'shared_comments',
      explainBooleanOrNullOrUndefined(objectKey(value, 'shared_comments')),
    ),
    explainProperty(
      'shared_tickets',
      explainBooleanOrNullOrUndefined(objectKey(value, 'shared_tickets')),
    ),
    explainProperty('tags', explainStringArray(objectKey(value, 'tags'))),
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

export function stringifyZendeskOrganization(
  value: ZendeskOrganization,
): string {
  return `ZendeskOrganization(${value})`;
}

export function parseZendeskOrganization(
  value: unknown,
): ZendeskOrganization | undefined {
  if (isZendeskOrganization(value)) return value;
  return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskOrganizationOrUndefined(
  value: unknown,
): value is ZendeskOrganization | undefined {
  return isZendeskOrganization(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskOrganizationOrUndefined(value: unknown): string {
  return isZendeskOrganizationOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskOrganization or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskOrganizationOrNullOrUndefined(
  value: unknown,
): value is ZendeskOrganization | undefined | null {
  return isZendeskOrganization(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskOrganizationOrNullOrUndefined(
  value: unknown,
): string {
  return isZendeskOrganizationOrNullOrUndefined(value)
    ? explainOk()
    : explainNot('ZendeskOrganization or undefined or null');
}
