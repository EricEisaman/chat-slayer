import {
  explainProductFeatureCategory,
  isProductFeatureCategory,
  ProductFeatureCategory,
} from './ProductFeatureCategory';
import {
  explainProductFeatureId,
  isProductFeatureId,
  ProductFeatureId,
} from './ProductFeatureId';
import {explain, explainOr, explainProperty} from '../../../../types/explain';
import {isBoolean, explainBoolean} from '../../../../types/Boolean';
import {explainString, isString} from '../../../../types/String';
import {explainNumber, isNumber} from '../../../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../../types/OtherKeys';

export interface ProductFeature {
  readonly id: ProductFeatureId;
  readonly category: ProductFeatureCategory;
  readonly value: string | number | boolean;
}

export function createProductFeature(
  id: ProductFeatureId,
  category: ProductFeatureCategory,
  value: string | number | boolean,
): ProductFeature {
  return {
    id,
    category,
    value,
  };
}

export function isProductFeature(value: unknown): value is ProductFeature {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'category', 'value']) &&
    isProductFeatureId(objectKey(value, 'id')) &&
    isProductFeatureCategory(objectKey(value, 'category')) &&
    (isString(objectKey(value, 'value')) ||
      isNumber(objectKey(value, 'value')) ||
      isBoolean(objectKey(value, 'value')))
  );
}

export function explainProductFeature(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['id', 'category', 'value']),
    explainProperty('id', explainProductFeatureId(objectKey(value, 'id'))),
    explainProperty(
      'category',
      explainProductFeatureCategory(objectKey(value, 'category')),
    ),
    explainProperty(
      'value',
      explainOr([
        explainString(objectKey(value, 'value')),
        explainNumber(objectKey(value, 'value')),
        explainBoolean(objectKey(value, 'value')),
      ]),
    ),
  ]);
}

export function stringifyProductFeature(value: ProductFeature): string {
  if (!isProductFeature(value))
    throw new TypeError(`Not ProductFeature: ${value}`);
  return `ProductFeature(${value})`;
}

export function parseProductFeature(
  value: unknown,
): ProductFeature | undefined {
  if (isProductFeature(value)) return value;
  return undefined;
}
