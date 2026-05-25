import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {explainStringOrFalse, isStringOrFalse} from '../../types/String';
import {explain, explainProperty} from '../../types/explain';

/**
 * This is the image object used in the /wp-json/wp/v3/userprofiles API for featured image
 */
export interface WpImageDTO {
  readonly thumbnail: string | false;
  readonly medium: string | false;
  readonly large: string | false;
}

export function isWpImageDTO(value: unknown): value is WpImageDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['thumbnail', 'medium', 'large']) &&
    isStringOrFalse(objectKey(value, 'thumbnail')) &&
    isStringOrFalse(objectKey(value, 'medium')) &&
    isStringOrFalse(objectKey(value, 'large'))
  );
}

export function explainWpImageDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['thumbnail', 'medium', 'large']),
    explainProperty(
      'thumbnail',
      explainStringOrFalse(objectKey(value, 'thumbnail')),
    ),
    explainProperty('medium', explainStringOrFalse(objectKey(value, 'medium'))),
    explainProperty('large', explainStringOrFalse(objectKey(value, 'large'))),
  ]);
}

export function stringifyWpImageDTO(value: WpImageDTO): string {
  return `WpImageDTO(${value})`;
}

export function parseWpImageDTO(value: unknown): WpImageDTO | undefined {
  if (isWpImageDTO(value)) return value;
  return undefined;
}
