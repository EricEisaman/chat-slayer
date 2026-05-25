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
  explainZendeskGroup,
  isZendeskGroup,
  ZendeskGroup,
} from './ZendeskGroup';
import {explainZendeskMeta, isZendeskMeta, ZendeskMeta} from './ZendeskMeta';
import {explain, explainProperty} from '../../types/explain';
import {
  explainZendeskLinks,
  isZendeskLinks,
  ZendeskLinks,
} from './ZendeskLinks';
import {explainArrayOf, isArrayOf} from '../../types/Array';

export interface ZendeskGroupListDTO {
  readonly groups: readonly ZendeskGroup[];
  readonly meta: ZendeskMeta;
  readonly links: ZendeskLinks;
}

export function createZendeskGroupListDTO(
  groups: readonly ZendeskGroup[],
  meta: ZendeskMeta,
  links: ZendeskLinks,
): ZendeskGroupListDTO {
  return {
    groups,
    meta,
    links,
  };
}

export function isZendeskGroupListDTO(
  value: unknown,
): value is ZendeskGroupListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['groups', 'meta', 'links']) &&
    isArrayOf<ZendeskGroup>(objectKey(value, 'groups'), isZendeskGroup) &&
    isZendeskMeta(objectKey(value, 'meta')) &&
    isZendeskLinks(objectKey(value, 'links'))
  );
}

export function explainZendeskGroupListDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['groups', 'meta', 'links']),
    explainProperty(
      'groups',
      explainArrayOf<ZendeskGroup>(
        'ZendeskGroup',
        explainZendeskGroup,
        objectKey(value, 'groups'),
        isZendeskGroup,
      ),
    ),
    explainProperty('meta', explainZendeskMeta(objectKey(value, 'meta'))),
    explainProperty('links', explainZendeskLinks(objectKey(value, 'links'))),
  ]);
}

export function stringifyZendeskGroupListDTO(
  value: ZendeskGroupListDTO,
): string {
  return `ZendeskGroupListDTO(${value})`;
}

export function parseZendeskGroupListDTO(
  value: unknown,
): ZendeskGroupListDTO | undefined {
  if (isZendeskGroupListDTO(value)) return value;
  return undefined;
}
