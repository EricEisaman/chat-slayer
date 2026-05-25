import {
  CompositeProductOption,
  explainCompositeProductOption,
  isCompositeProductOption,
} from './CompositeProductOption';
import {
  explainProductFeatureId,
  isProductFeatureId,
  ProductFeatureId,
} from './features/ProductFeatureId';
import {explain, explainProperty} from '../../../types/explain';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../types/String';
import {
  explainNumberOrUndefined,
  isNumberOrUndefined,
} from '../../../types/Number';
import {
  explainNumberOrStringOrBooleanOrUndefined,
  isNumberOrStringOrBooleanOrUndefined,
} from '../../../types/NumberOrStringOrBooleanOrUndefined';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../types/OtherKeys';
import {
  explainArrayOfOrUndefined,
  isArrayOfOrUndefined,
} from '../../../types/Array';

export interface CompositeProductSelection {
  readonly featureId: ProductFeatureId;
  readonly title: string;
  readonly options: readonly CompositeProductOption[];
  readonly description?: string;
  readonly defaultValue?: number | string | boolean;
  readonly minValue?: number;
  readonly maxValue?: number;
}

export function createCompositeProductSelection(
  featureId: ProductFeatureId,
  title: string,
  description?: string,
  options?: readonly CompositeProductOption[],
  defaultValue?: number | string | boolean,
  minValue?: number,
  maxValue?: number,
): CompositeProductSelection {
  return {
    featureId,
    title,
    description,
    options: options ?? [],
    defaultValue,
    minValue,
    maxValue,
  };
}

export function isCompositeProductSelection(
  value: unknown,
): value is CompositeProductSelection {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'featureId',
      'title',
      'description',
      'options',
      'defaultValue',
      'minValue',
      'maxValue',
    ]) &&
    isProductFeatureId(objectKey(value, 'featureId')) &&
    isString(objectKey(value, 'title')) &&
    isStringOrUndefined(objectKey(value, 'description')) &&
    isArrayOfOrUndefined<CompositeProductOption>(
      objectKey(value, 'options'),
      isCompositeProductOption,
    ) &&
    isNumberOrStringOrBooleanOrUndefined(objectKey(value, 'defaultValue')) &&
    isNumberOrUndefined(objectKey(value, 'minValue')) &&
    isNumberOrUndefined(objectKey(value, 'maxValue'))
  );
}

export function explainCompositeProductSelection(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'featureId',
      'title',
      'description',
      'options',
      'defaultValue',
      'minValue',
      'maxValue',
    ]),
    explainProperty(
      'featureId',
      explainProductFeatureId(objectKey(value, 'featureId')),
    ),
    explainProperty('title', explainString(objectKey(value, 'title'))),
    explainProperty(
      'description',
      explainStringOrUndefined(objectKey(value, 'description')),
    ),
    explainProperty(
      'options',
      explainArrayOfOrUndefined<CompositeProductOption>(
        'CompositeProductOption',
        explainCompositeProductOption,
        objectKey(value, 'options'),
        isCompositeProductOption,
      ),
    ),
    explainProperty(
      'defaultValue',
      explainNumberOrStringOrBooleanOrUndefined(
        objectKey(value, 'defaultValue'),
      ),
    ),
    explainProperty(
      'minValue',
      explainNumberOrUndefined(objectKey(value, 'minValue')),
    ),
    explainProperty(
      'maxValue',
      explainNumberOrUndefined(objectKey(value, 'maxValue')),
    ),
  ]);
}

export function stringifyCompositeProductSelection(
  value: CompositeProductSelection,
): string {
  return `ProductCompositeOption(${value})`;
}

export function parseCompositeProductSelection(
  value: unknown,
): CompositeProductSelection | undefined {
  if (isCompositeProductSelection(value)) return value;
  return undefined;
}
