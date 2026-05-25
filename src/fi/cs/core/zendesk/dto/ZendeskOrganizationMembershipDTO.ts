import {
  explainZendeskOrganizationMembership,
  isZendeskOrganizationMembership,
  ZendeskOrganizationMembership,
} from './ZendeskOrganizationMembership';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explain, explainProperty} from '../../types/explain';

export interface ZendeskOrganizationMembershipDTO {
  readonly organization_membership: ZendeskOrganizationMembership;
}

export function createZendeskOrganizationMembershipDTO(
  organization_membership: ZendeskOrganizationMembership,
): ZendeskOrganizationMembershipDTO {
  return {
    organization_membership,
  };
}

export function isZendeskOrganizationMembershipDTO(
  value: unknown,
): value is ZendeskOrganizationMembershipDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['organization_membership']) &&
    isZendeskOrganizationMembership(objectKey(value, 'organization_membership'))
  );
}

export function explainZendeskOrganizationMembershipDTO(
  value: unknown,
): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['organization_membership']),
    explainProperty(
      'organization_membership',
      explainZendeskOrganizationMembership(
        objectKey(value, 'organization_membership'),
      ),
    ),
  ]);
}

export function stringifyZendeskOrganizationMembershipDTO(
  value: ZendeskOrganizationMembershipDTO,
): string {
  return `ZendeskOrganizationMembershipDTO(${value})`;
}

export function parseZendeskOrganizationMembershipDTO(
  value: unknown,
): ZendeskOrganizationMembershipDTO | undefined {
  if (isZendeskOrganizationMembershipDTO(value)) return value;
  return undefined;
}
