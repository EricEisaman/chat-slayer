import {
  explainWpPageStatus,
  isWpPageStatus,
  WpPageStatus,
} from './WpPageStatus';
import {
  explainString,
  explainStringOrNull,
  isString,
  isStringOrNull,
} from '../../types/String';
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
  explainReadonlyJsonArray,
  explainReadonlyJsonObject,
  isReadonlyJsonArray,
  isReadonlyJsonObject,
  ReadonlyJsonArray,
  ReadonlyJsonObject,
} from '../../Json';
import {explain, explainProperty} from '../../types/explain';
import {
  explainWpRenderedDTO,
  isWpRenderedDTO,
  WpRenderedDTO,
} from './WpRenderedDTO';
import {explainNumber, isNumber} from '../../types/Number';

/**
 * Wordpress API page object for /wp-json/wp/v2/pages
 */
export interface WpPageDTO {
  readonly title: WpRenderedDTO;
  readonly content: WpRenderedDTO;
  readonly excerpt: WpRenderedDTO;
  readonly guid: WpRenderedDTO;
  readonly type: string;
  readonly id: number;
  readonly modified: string;
  readonly modified_gmt: string;
  readonly date: string | null;
  readonly date_gmt: string | null;
  readonly status: WpPageStatus;
  readonly parent: number;
  readonly author: number;
  readonly featured_media: number;
  readonly comment_status: string;
  readonly ping_status: string;
  readonly menu_order: number;
  readonly meta: ReadonlyJsonArray;
  readonly template: string;
  readonly link: string;
  readonly slug: string;
  /**
   * @fixme Add correct typing before using this property!
   * @deprecated (just so that IDE highlights and you read above comment)
   */
  readonly _links: ReadonlyJsonObject;
}

export function isWpPageDTO(value: any): value is WpPageDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'title',
      'content',
      'excerpt',
      'guid',
      'type',
      'id',
      'modified',
      'modified_gmt',
      'date',
      'date_gmt',
      'status',
      'parent',
      'author',
      'featured_media',
      'comment_status',
      'ping_status',
      'menu_order',
      'meta',
      'template',
      'link',
      'slug',
      '_links',
    ]) &&
    isWpRenderedDTO(value.title) &&
    isWpRenderedDTO(value.content) &&
    isWpRenderedDTO(value.excerpt) &&
    isWpRenderedDTO(value.guid) &&
    isString(value.type) &&
    isNumber(value.id) &&
    isString(value.modified) &&
    isString(value.modified_gmt) &&
    isStringOrNull(value.date) &&
    isStringOrNull(value.date_gmt) &&
    isWpPageStatus(value.status) &&
    isNumber(value.parent) &&
    isNumber(value.author) &&
    isNumber(value.featured_media) &&
    isString(value.comment_status) &&
    isString(value.ping_status) &&
    isNumber(value.menu_order) &&
    isReadonlyJsonArray(value.meta) &&
    isString(value.template) &&
    isString(value.link) &&
    isString(value.slug) &&
    isReadonlyJsonObject(value._links)
  );
}

export function explainWpPageDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'title',
      'content',
      'excerpt',
      'guid',
      'type',
      'id',
      'modified',
      'modified_gmt',
      'date',
      'date_gmt',
      'status',
      'parent',
      'author',
      'featured_media',
      'comment_status',
      'ping_status',
      'menu_order',
      'meta',
      'template',
      'link',
      'slug',
      '_links',
    ]),
    explainProperty('title', explainWpRenderedDTO(objectKey(value, 'title'))),
    explainProperty(
      'content',
      explainWpRenderedDTO(objectKey(value, 'content')),
    ),
    explainProperty(
      'excerpt',
      explainWpRenderedDTO(objectKey(value, 'excerpt')),
    ),
    explainProperty('guid', explainWpRenderedDTO(objectKey(value, 'guid'))),
    explainProperty('type', explainString(objectKey(value, 'type'))),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'modified',
      explainStringOrNull(objectKey(value, 'modified')),
    ),
    explainProperty(
      'modified_gmt',
      explainStringOrNull(objectKey(value, 'modified_gmt')),
    ),
    explainProperty('date', explainStringOrNull(objectKey(value, 'date'))),
    explainProperty(
      'date_gmt',
      explainStringOrNull(objectKey(value, 'date_gmt')),
    ),
    explainProperty('status', explainWpPageStatus(objectKey(value, 'status'))),
    explainProperty('parent', explainNumber(objectKey(value, 'parent'))),
    explainProperty('author', explainNumber(objectKey(value, 'author'))),
    explainProperty(
      'featured_media',
      explainNumber(objectKey(value, 'featured_media')),
    ),
    explainProperty(
      'comment_status',
      explainString(objectKey(value, 'comment_status')),
    ),
    explainProperty(
      'ping_status',
      explainString(objectKey(value, 'ping_status')),
    ),
    explainProperty(
      'menu_order',
      explainNumber(objectKey(value, 'menu_order')),
    ),
    explainProperty('meta', explainReadonlyJsonArray(objectKey(value, 'meta'))),
    explainProperty('template', explainString(objectKey(value, 'template'))),
    explainProperty('link', explainString(objectKey(value, 'link'))),
    explainProperty('slug', explainString(objectKey(value, 'slug'))),
    explainProperty(
      '_links',
      explainReadonlyJsonObject(objectKey(value, '_links')),
    ),
  ]);
}
