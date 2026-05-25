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
  explainZendeskOrganization,
  isZendeskOrganization,
  ZendeskOrganization,
} from './ZendeskOrganization';
import {explainZendeskMeta, isZendeskMeta, ZendeskMeta} from './ZendeskMeta';
import {explain, explainProperty} from '../../types/explain';
import {
  explainZendeskLinks,
  isZendeskLinks,
  ZendeskLinks,
} from './ZendeskLinks';
import {explainArrayOf, isArrayOf} from '../../types/Array';

export interface ZendeskOrganizationListDTO {
  readonly organizations: readonly ZendeskOrganization[];
  readonly meta: ZendeskMeta;
  readonly links: ZendeskLinks;
}

export function createZendeskOrganizationListDTO(
  organizations: readonly ZendeskOrganization[],
  meta: ZendeskMeta,
  links: ZendeskLinks,
): ZendeskOrganizationListDTO {
  return {
    organizations,
    meta,
    links,
  };
}

export function isZendeskOrganizationListDTO(
  value: unknown,
): value is ZendeskOrganizationListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['organizations', 'meta', 'links']) &&
    isArrayOf<ZendeskOrganization>(
      objectKey(value, 'organizations'),
      isZendeskOrganization,
    ) &&
    isZendeskMeta(objectKey(value, 'meta')) &&
    isZendeskLinks(objectKey(value, 'links'))
  );
}

export function explainZendeskOrganizationListDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['organizations', 'meta', 'links']),
    explainProperty(
      'organizations',
      explainArrayOf<ZendeskOrganization>(
        'ZendeskOrganization',
        explainZendeskOrganization,
        objectKey(value, 'organizations'),
        isZendeskOrganization,
      ),
    ),
    explainProperty('meta', explainZendeskMeta(objectKey(value, 'meta'))),
    explainProperty('links', explainZendeskLinks(objectKey(value, 'links'))),
  ]);
}

export function stringifyZendeskOrganizationListDTO(
  value: ZendeskOrganizationListDTO,
): string {
  return `ZendeskOrganizationListDTO(${value})`;
}

export function parseZendeskOrganizationListDTO(
  value: unknown,
): ZendeskOrganizationListDTO | undefined {
  if (isZendeskOrganizationListDTO(value)) return value;
  return undefined;
}
