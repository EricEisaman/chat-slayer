import {
  explainZendeskGroupMembership,
  isZendeskGroupMembership,
  ZendeskGroupMembership,
} from './ZendeskGroupMembership';
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

export interface ZendeskGroupMembershipDTO {
  readonly group_membership: ZendeskGroupMembership;
}

export function createZendeskGroupMembershipDTO(
  group_membership: ZendeskGroupMembership,
): ZendeskGroupMembershipDTO {
  return {
    group_membership,
  };
}

export function isZendeskGroupMembershipDTO(
  value: unknown,
): value is ZendeskGroupMembershipDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['group_membership']) &&
    isZendeskGroupMembership(objectKey(value, 'group_membership'))
  );
}

export function explainZendeskGroupMembershipDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['group_membership']),
    explainProperty(
      'group_membership',
      explainZendeskGroupMembership(objectKey(value, 'group_membership')),
    ),
  ]);
}

export function stringifyZendeskGroupMembershipDTO(
  value: ZendeskGroupMembershipDTO,
): string {
  return `ZendeskGroupMembershipDTO(${value})`;
}

export function parseZendeskGroupMembershipDTO(
  value: unknown,
): ZendeskGroupMembershipDTO | undefined {
  if (isZendeskGroupMembershipDTO(value)) return value;
  return undefined;
}
