import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explainZendeskMeta, isZendeskMeta, ZendeskMeta} from './ZendeskMeta';
import {explain, explainProperty} from '../../types/explain';
import {
  explainZendeskLinks,
  isZendeskLinks,
  ZendeskLinks,
} from './ZendeskLinks';
import {explainArrayOf, isArrayOf} from '../../types/Array';
import {
  explainZendeskOrganizationMembership,
  isZendeskOrganizationMembership,
  ZendeskOrganizationMembership,
} from './ZendeskOrganizationMembership';

export interface ZendeskOrganizationMembershipListDTO {
  readonly organization_memberships: readonly ZendeskOrganizationMembership[];
  readonly meta: ZendeskMeta;
  readonly links: ZendeskLinks;
}

export function createZendeskOrganizationMembershipListDTO(
  organization_memberships: readonly ZendeskOrganizationMembership[],
  meta: ZendeskMeta,
  links: ZendeskLinks,
): ZendeskOrganizationMembershipListDTO {
  return {
    organization_memberships,
    meta,
    links,
  };
}

export function isZendeskOrganizationMembershipListDTO(
  value: unknown,
): value is ZendeskOrganizationMembershipListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'organization_memberships',
      'meta',
      'links',
    ]) &&
    isArrayOf<ZendeskOrganizationMembership>(
      objectKey(value, 'organization_memberships'),
      isZendeskOrganizationMembership,
    ) &&
    isZendeskMeta(objectKey(value, 'meta')) &&
    isZendeskLinks(objectKey(value, 'links'))
  );
}

export function explainZendeskOrganizationMembershipListDTO(
  value: unknown,
): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'organization_memberships',
      'meta',
      'links',
    ]),
    explainProperty(
      'organization_memberships',
      explainArrayOf<ZendeskOrganizationMembership>(
        'ZendeskOrganizationMembership',
        explainZendeskOrganizationMembership,
        objectKey(value, 'organization_memberships'),
        isZendeskOrganizationMembership,
      ),
    ),
    explainProperty('meta', explainZendeskMeta(objectKey(value, 'meta'))),
    explainProperty('links', explainZendeskLinks(objectKey(value, 'links'))),
  ]);
}

export function stringifyZendeskOrganizationMembershipListDTO(
  value: ZendeskOrganizationMembershipListDTO,
): string {
  return `ZendeskOrganizationMembershipListDTO(${value})`;
}

export function parseZendeskOrganizationMembershipListDTO(
  value: unknown,
): ZendeskOrganizationMembershipListDTO | undefined {
  if (isZendeskOrganizationMembershipListDTO(value)) return value;
  return undefined;
}
