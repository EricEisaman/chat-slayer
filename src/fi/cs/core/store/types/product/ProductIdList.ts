import {ProductId} from './ProductId';
import {
  explainProductIdOrProductIdWithAmount,
  isProductIdOrProductIdWithAmount,
  ProductIdWithAmount,
} from './ProductIdWithAmount';
import {explainArrayOf, isArrayOf} from '../../../types/Array';

export type ProductIdListWithAmount = readonly (
  | ProductId
  | ProductIdWithAmount
)[];

export function isProductIdListWithAmount(
  value: unknown,
): value is ProductIdListWithAmount {
  return isArrayOf<ProductId | ProductIdWithAmount>(
    value,
    isProductIdOrProductIdWithAmount,
  );
}

export function explainProductIdListWithAmount(value: unknown): string {
  return explainArrayOf<ProductId | ProductIdWithAmount>(
    'ProductId | ProductIdWithAmount',
    explainProductIdOrProductIdWithAmount,
    value,
    isProductIdOrProductIdWithAmount,
  );
}
