import {
  explainZendeskGroup,
  isZendeskGroup,
  ZendeskGroup,
} from './ZendeskGroup';
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

export interface ZendeskGroupDTO {
  readonly group: ZendeskGroup;
}

export function createZendeskGroupDTO(group: ZendeskGroup): ZendeskGroupDTO {
  return {
    group,
  };
}

export function isZendeskGroupDTO(value: unknown): value is ZendeskGroupDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['group']) &&
    isZendeskGroup(objectKey(value, 'group'))
  );
}

export function explainZendeskGroupDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['group']),
    explainProperty('group', explainZendeskGroup(objectKey(value, 'group'))),
  ]);
}

export function stringifyZendeskGroupDTO(value: ZendeskGroupDTO): string {
  return `ZendeskGroupDTO(${value})`;
}

export function parseZendeskGroupDTO(
  value: unknown,
): ZendeskGroupDTO | undefined {
  if (isZendeskGroupDTO(value)) return value;
  return undefined;
}
