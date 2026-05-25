import {
  explainZendeskUserIdentity,
  isZendeskUserIdentity,
  ZendeskUserIdentity,
} from './ZendeskUserIdentity';
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

export interface ZendeskUserIdentityDTO {
  readonly identity: ZendeskUserIdentity;
}

export function createZendeskUserIdentityDTO(
  identity: ZendeskUserIdentity,
): ZendeskUserIdentityDTO {
  return {
    identity,
  };
}

export function isZendeskUserIdentityDTO(
  value: unknown,
): value is ZendeskUserIdentityDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['identity']) &&
    isZendeskUserIdentity(objectKey(value, 'identity'))
  );
}

export function explainZendeskUserIdentityDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['identity']),
    explainProperty(
      'identity',
      explainZendeskUserIdentity(objectKey(value, 'identity')),
    ),
  ]);
}

export function stringifyZendeskUserIdentityDTO(
  value: ZendeskUserIdentityDTO,
): string {
  return `ZendeskUserIdentityDTO(${value})`;
}

export function parseZendeskUserIdentityDTO(
  value: unknown,
): ZendeskUserIdentityDTO | undefined {
  if (isZendeskUserIdentityDTO(value)) return value;
  return undefined;
}
