import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explainZendeskUser, isZendeskUser, ZendeskUser} from './ZendeskUser';
import {explainZendeskMeta, isZendeskMeta, ZendeskMeta} from './ZendeskMeta';
import {explain, explainProperty} from '../../types/explain';
import {
  explainZendeskLinks,
  isZendeskLinks,
  ZendeskLinks,
} from './ZendeskLinks';
import {explainArrayOf, isArrayOf} from '../../types/Array';

export interface ZendeskUserListDTO {
  readonly users: readonly ZendeskUser[];
  readonly meta: ZendeskMeta;
  readonly links: ZendeskLinks;
}

export function createZendeskUserListDTO(
  users: readonly ZendeskUser[],
  meta: ZendeskMeta,
  links: ZendeskLinks,
): ZendeskUserListDTO {
  return {
    users,
    meta,
    links,
  };
}

export function isZendeskUserListDTO(
  value: unknown,
): value is ZendeskUserListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['users', 'meta', 'links']) &&
    isArrayOf<ZendeskUser>(objectKey(value, 'users'), isZendeskUser) &&
    isZendeskMeta(objectKey(value, 'meta')) &&
    isZendeskLinks(objectKey(value, 'links'))
  );
}

export function explainZendeskUserListDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['users', 'meta', 'links']),
    explainProperty(
      'users',
      explainArrayOf<ZendeskUser>(
        'ZendeskUser',
        explainZendeskUser,
        objectKey(value, 'users'),
        isZendeskUser,
      ),
    ),
    explainProperty('meta', explainZendeskMeta(objectKey(value, 'meta'))),
    explainProperty('links', explainZendeskLinks(objectKey(value, 'links'))),
  ]);
}

export function stringifyZendeskUserListDTO(value: ZendeskUserListDTO): string {
  return `ZendeskUserListDTO(${value})`;
}

export function parseZendeskUserListDTO(
  value: unknown,
): ZendeskUserListDTO | undefined {
  if (isZendeskUserListDTO(value)) return value;
  return undefined;
}
