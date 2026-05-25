import {
  explainProductPriceType,
  isProductPriceType,
  ProductPriceType,
} from './ProductPriceType';
import {explain, explainProperty} from '../../../types/explain';
import {
  explainStringOrUndefined,
  isStringOrUndefined,
} from '../../../types/String';
import {
  explainNumber,
  explainNumberOrUndefined,
  isNumber,
  isNumberOrUndefined,
} from '../../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../types/OtherKeys';

export interface ProductPrice {
  readonly sum: number;
  readonly vatPercent: number;
  readonly type: ProductPriceType;
  readonly buyUrl?: string;
  readonly discountPercent?: number;
  readonly discountFrom?: string;
  readonly discountTo?: string;
}

export function createProductPrice(
  sum: number,
  vatPercent: number,
  type: ProductPriceType,
  buyUrl?: string,
  discountPercent?: number,
  discountFrom?: string,
  discountTo?: string,
): ProductPrice {
  return {
    sum,
    vatPercent,
    type,
    buyUrl,
    discountPercent,
    discountFrom,
    discountTo,
  };
}

export function isProductPrice(value: unknown): value is ProductPrice {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'sum',
      'vatPercent',
      'type',
      'discountPercent',
      'discountFrom',
      'discountTo',
      'buyUrl',
    ]) &&
    isNumber(objectKey(value, 'sum')) &&
    isNumber(objectKey(value, 'vatPercent')) &&
    isNumberOrUndefined(objectKey(value, 'discountPercent')) &&
    isStringOrUndefined(objectKey(value, 'discountFrom')) &&
    isStringOrUndefined(objectKey(value, 'discountTo')) &&
    isProductPriceType(objectKey(value, 'type')) &&
    isStringOrUndefined(objectKey(value, 'buyUrl'))
  );
}

export function explainProductPrice(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'sum',
      'vatPercent',
      'type',
      'discountPercent',
      'discountFrom',
      'discountTo',
      'buyUrl',
    ]),
    explainProperty('sum', explainNumber(objectKey(value, 'sum'))),
    explainProperty(
      'vatPercent',
      explainNumber(objectKey(value, 'vatPercent')),
    ),
    explainProperty('type', explainProductPriceType(objectKey(value, 'type'))),
    explainProperty(
      'buyUrl',
      explainStringOrUndefined(objectKey(value, 'buyUrl')),
    ),
    explainProperty(
      'discountPercent',
      explainNumberOrUndefined(objectKey(value, 'discountPercent')),
    ),
    explainProperty(
      'discountFrom',
      explainStringOrUndefined(objectKey(value, 'discountFrom')),
    ),
    explainProperty(
      'discountTo',
      explainStringOrUndefined(objectKey(value, 'discountTo')),
    ),
  ]);
}

export function isProductPriceOrUndefined(
  value: unknown,
): value is ProductPrice | undefined {
  return value === undefined || isProductPrice(value);
}

export function stringifyProductPrice(value: ProductPrice): string {
  return `ProductPrice(${value})`;
}

export function parseProductPrice(value: unknown): ProductPrice | undefined {
  if (isProductPrice(value)) return value;
  return undefined;
}
