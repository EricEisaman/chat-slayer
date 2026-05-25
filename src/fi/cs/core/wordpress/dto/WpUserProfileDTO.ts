import {
  explainWpPageStatus,
  isWpPageStatus,
  WpPageStatus,
} from './WpPageStatus';
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
import {explainStringArray, isStringArray} from '../../types/StringArray';
import {explainNumber, isNumber} from '../../types/Number';

/**
 * This is the data transfer object for /wp-json/wp/v3/userprofiles end point's items.
 */
export interface WpUserProfileDTO {
  readonly title: string;
  readonly content: string;
  readonly excerpt: string;
  readonly id: number;
  readonly slug: string;
  readonly author: string;
  readonly description: readonly string[];
  readonly date: string;
  readonly 'extra Information': readonly string[];
  readonly status: WpPageStatus;
  readonly featured_image: WpImageDTO;
}

export function isWpUserProfileDTO(value: unknown): value is WpUserProfileDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'title',
      'content',
      'excerpt',
      'id',
      'author',
      'description',
      'date',
      'status',
      'extra Information',
      'slug',
      'featured_image',
    ]) &&
    isString(objectKey(value, 'title')) &&
    isString(objectKey(value, 'content')) &&
    isString(objectKey(value, 'excerpt')) &&
    isString(objectKey(value, 'author')) &&
    isStringArray(objectKey(value, 'description')) &&
    isNumber(objectKey(value, 'id')) &&
    isString(objectKey(value, 'date')) &&
    isStringArray(value['extra Information']) &&
    isString(objectKey(value, 'slug')) &&
    isWpPageStatus(objectKey(value, 'status')) &&
    isWpImageDTO(objectKey(value, 'featured_image'))
  );
}

export function explainWpUserProfileDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'title',
      'content',
      'excerpt',
      'author',
      'description',
      'id',
      'date',
      'status',
      'extra Information',
      'slug',
      'featured_image',
    ]),
    explainProperty('title', explainString(objectKey(value, 'title'))),
    explainProperty('content', explainString(objectKey(value, 'content'))),
    explainProperty('excerpt', explainString(objectKey(value, 'excerpt'))),
    explainProperty('author', explainString(objectKey(value, 'author'))),
    explainProperty(
      'description',
      explainStringArray(objectKey(value, 'description')),
    ),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty('date', explainString(objectKey(value, 'date'))),
    explainProperty(
      'extra',
      explainStringArray(objectKey(value, 'extra Information')),
    ),
    explainProperty('slug', explainString(objectKey(value, 'slug'))),
    explainProperty('status', explainWpPageStatus(objectKey(value, 'status'))),
    explainProperty(
      'featured_image',
      explainWpImageDTO(objectKey(value, 'featured_image')),
    ),
  ]);
}
