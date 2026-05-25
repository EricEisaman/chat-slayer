import {isProductId, ProductId} from './ProductId';
import {objectKey} from '../../../types/RegularObject';

import {isArray} from '../../../types/Array';
import {explainNot, explainOk} from '../../../types/explain';
import {isNumber} from '../../../types/Number';

export type ProductIdWithAmount = readonly [number, ProductId];

export function isProductIdWithAmount(
  value: unknown,
): value is ProductIdWithAmount {
  return (
    isArray(value) &&
    value.length === 2 &&
    isNumber(value[0]) &&
    isProductId(value[1])
  );
}

export function explainProductIdWithAmount(value: unknown): string {
  return isProductIdWithAmount(value)
    ? explainOk()
    : explainNot('ProductIdWithAmount [number, ProductId]');
}

export function isProductIdOrProductIdWithAmount(
  value: any,
): value is ProductId | ProductIdWithAmount {
  return isProductId(value) || isProductIdWithAmount(value);
}

export function explainProductIdOrProductIdWithAmount(value: unknown): string {
  return isProductIdWithAmount(value)
    ? explainOk()
    : explainNot(
        'ProductIdWithAmount {[number, ProductId]} or ProductId {string}',
      );
}
