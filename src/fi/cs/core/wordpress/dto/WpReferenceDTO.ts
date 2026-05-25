import {WpPageStatus} from './WpPageStatus';
import {explainString, isString} from '../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {explain, explainProperty} from '../../types/explain';
import {explainWpImageDTO, isWpImageDTO, WpImageDTO} from './WpImageDTO';
import {explainNumber, isNumber} from '../../types/Number';

/**
 * The DTO for single item in /wp-json/wp/v3/references
 */
export interface WpReferenceDTO {
  readonly title: string;
  readonly content: string;
  readonly id: number;
  readonly date: string;
  readonly status: WpPageStatus;
  readonly author: number;
  readonly excerpt: object;
  readonly featured_image: WpImageDTO;
  readonly slug: string;
}

export function isWpReferenceDTO(value: any): value is WpReferenceDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'title',
      'content',
      'id',
      'date',
      'status',
      'author',
      'excerpt',
      'featured_image',
      'slug',
    ]) &&
    isString(value.title) &&
    isString(value.content) &&
    isNumber(value.id) &&
    isString(value.date) &&
    isString(value.status) &&
    isString(value.author) &&
    isString(value.excerpt) &&
    isWpImageDTO(value.featured_image) &&
    isString(value.slug)
  );
}

export function explainWpReferenceDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'title',
      'content',
      'id',
      'date',
      'status',
      'author',
      'excerpt',
      'featured_image',
      'slug',
    ]),
    explainProperty('title', explainString(objectKey(value, 'title'))),
    explainProperty('content', explainString(objectKey(value, 'content'))),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty('date', explainString(objectKey(value, 'date'))),
    explainProperty('status', explainString(objectKey(value, 'status'))),
    explainProperty('author', explainString(objectKey(value, 'author'))),
    explainProperty('excerpt', explainString(objectKey(value, 'excerpt'))),
    explainProperty(
      'featured_image',
      explainWpImageDTO(objectKey(value, 'featured_image')),
    ),
    explainProperty('slug', explainString(objectKey(value, 'slug'))),
  ]);
}
