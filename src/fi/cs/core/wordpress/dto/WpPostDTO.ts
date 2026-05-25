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
  explainWpRenderedDTO,
  isWpRenderedDTO,
  WpRenderedDTO,
} from './WpRenderedDTO';
import {explainNumber, isNumber} from '../../types/Number';
import {
  explainReadonlyJsonArray,
  explainReadonlyJsonObject,
  isReadonlyJsonArray,
  isReadonlyJsonObject,
  ReadonlyJsonArray,
  ReadonlyJsonObject,
} from '../../Json';
import {explain, explainProperty} from '../../types/explain';
import {explainBoolean, isBoolean} from '../../types/Boolean';
import {explainNumberArray, isNumberArray} from '../../types/NumberArray';

/**
 * Wordpress v2 JSON API object for /wp-json/wp/v2/posts
 */
export interface WpPostDTO {
  readonly title: WpRenderedDTO;
  readonly content: WpRenderedDTO;
  readonly excerpt: WpRenderedDTO;
  readonly guid: WpRenderedDTO;
  readonly type: string;
  readonly modified: string;
  readonly modified_gmt: string;
  readonly link: string;
  readonly id: number;
  readonly date: string | null;
  readonly status: WpPageStatus;
  readonly author: number;
  readonly featured_media: number;
  readonly comment_status: string;
  readonly ping_status: string;

  /**
   * @fixme Add correct typing before using this property!
   * @deprecated (just so that IDE highlights and you read above comment)
   */
  readonly meta: ReadonlyJsonArray;

  readonly template: string;
  readonly date_gmt: string | null;
  readonly slug: string;
  readonly format: string;
  readonly sticky: boolean;
  readonly categories: readonly number[];
  readonly tags: readonly number[];

  /**
   * @fixme Add correct typing before using this property!
   * @deprecated (just so that IDE highlights and you read above comment)
   */
  readonly _links: ReadonlyJsonObject;
}

export function isWpPostDTO(value: any): value is WpPostDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'title',
      'content',
      'excerpt',
      'guid',
      'type',
      'id',
      'date',
      'modified',
      'modified_gmt',
      'link',
      'status',
      'author',
      'featured_media',
      'comment_status',
      'ping_status',
      'meta',
      'template',
      'date_gmt',
      'format',
      'sticky',
      'categories',
      'tags',
      '_links',
      'slug',
    ]) &&
    isWpRenderedDTO(value.title) &&
    isWpRenderedDTO(value.content) &&
    isWpRenderedDTO(value.excerpt) &&
    isWpRenderedDTO(value.guid) &&
    isString(value.type) &&
    isNumber(value.id) &&
    isStringOrNull(value.date) &&
    isWpPageStatus(value.status) &&
    isNumber(value.author) &&
    isNumber(value.featured_media) &&
    isString(value.comment_status) &&
    isString(value.modified) &&
    isString(value.modified_gmt) &&
    isString(value.link) &&
    isString(value.ping_status) &&
    isReadonlyJsonArray(value.meta) &&
    isString(value.template) &&
    isStringOrNull(value.date_gmt) &&
    isString(value.format) &&
    isString(value.slug) &&
    isBoolean(value.sticky) &&
    isNumberArray(value.tags) &&
    isNumberArray(value.categories) &&
    isReadonlyJsonObject(value._links)
  );
}

export function explainWpPostDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'title',
      'content',
      'excerpt',
      'guid',
      'type',
      'id',
      'date',
      'modified',
      'modified_gmt',
      'link',
      'status',
      'author',
      'featured_media',
      'comment_status',
      'ping_status',
      'meta',
      'template',
      'date_gmt',
      'format',
      'sticky',
      'categories',
      'tags',
      '_links',
      'slug',
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
    explainProperty('modified', explainString(objectKey(value, 'modified'))),
    explainProperty(
      'modified_gmt',
      explainString(objectKey(value, 'modified_gmt')),
    ),
    explainProperty('link', explainString(objectKey(value, 'link'))),
    explainProperty('date', explainStringOrNull(objectKey(value, 'date'))),
    explainProperty('status', explainWpPageStatus(objectKey(value, 'status'))),
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
    explainProperty('meta', explainReadonlyJsonArray(objectKey(value, 'meta'))),
    explainProperty('template', explainString(objectKey(value, 'template'))),
    explainProperty(
      'date_gmt',
      explainStringOrNull(objectKey(value, 'date_gmt')),
    ),
    explainProperty('format', explainString(objectKey(value, 'format'))),
    explainProperty('slug', explainString(objectKey(value, 'slug'))),
    explainProperty('sticky', explainBoolean(objectKey(value, 'sticky'))),
    explainProperty(
      'categories',
      explainNumberArray(objectKey(value, 'categories')),
    ),
    explainProperty('tags', explainNumberArray(objectKey(value, 'tags'))),
    explainProperty(
      '_links',
      explainReadonlyJsonObject(objectKey(value, '_links')),
    ),
  ]);
}
