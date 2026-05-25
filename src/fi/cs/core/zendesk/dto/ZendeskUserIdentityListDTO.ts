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
  explainZendeskUserIdentity,
  isZendeskUserIdentity,
  ZendeskUserIdentity,
} from './ZendeskUserIdentity';
import {explainZendeskMeta, isZendeskMeta, ZendeskMeta} from './ZendeskMeta';
import {explain, explainProperty} from '../../types/explain';
import {
  explainZendeskLinks,
  isZendeskLinks,
  ZendeskLinks,
} from './ZendeskLinks';
import {explainArrayOf, isArrayOf} from '../../types/Array';

export interface ZendeskUserIdentityListDTO {
  readonly identities: readonly ZendeskUserIdentity[];
  readonly meta: ZendeskMeta;
  readonly links: ZendeskLinks;
}

export function createZendeskUserIdentityListDTO(
  identities: readonly ZendeskUserIdentity[],
  meta: ZendeskMeta,
  links: ZendeskLinks,
): ZendeskUserIdentityListDTO {
  return {
    identities,
    meta,
    links,
  };
}

export function isZendeskUserIdentityListDTO(
  value: unknown,
): value is ZendeskUserIdentityListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['identities', 'meta', 'links']) &&
    isArrayOf<ZendeskUserIdentity>(
      objectKey(value, 'identities'),
      isZendeskUserIdentity,
    ) &&
    isZendeskMeta(objectKey(value, 'meta')) &&
    isZendeskLinks(objectKey(value, 'links'))
  );
}

export function explainZendeskUserIdentityListDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['identities', 'meta', 'links']),
    explainProperty(
      'identities',
      explainArrayOf<ZendeskUserIdentity>(
        'ZendeskUserIdentity',
        explainZendeskUserIdentity,
        objectKey(value, 'identities'),
        isZendeskUserIdentity,
      ),
    ),
    explainProperty('meta', explainZendeskMeta(objectKey(value, 'meta'))),
    explainProperty('links', explainZendeskLinks(objectKey(value, 'links'))),
  ]);
}

export function stringifyZendeskUserIdentityListDTO(
  value: ZendeskUserIdentityListDTO,
): string {
  return `ZendeskUserIdentityListDTO(${value})`;
}

export function parseZendeskUserIdentityListDTO(
  value: unknown,
): ZendeskUserIdentityListDTO | undefined {
  if (isZendeskUserIdentityListDTO(value)) return value;
  return undefined;
}
