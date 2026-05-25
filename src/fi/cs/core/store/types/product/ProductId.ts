import {explainString, isString} from '../../../types/String';

export type ProductId = string;

export function isProductId(value: unknown): value is ProductId {
  return isString(value);
}

export function explainProductId(value: unknown): string {
  return explainString(value);
}
