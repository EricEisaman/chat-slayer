import {isProduct, Product} from './Product';
import {objectKey} from '../../../types/RegularObject';

import {isArrayOf} from '../../../types/Array';

export interface ProductListDTO {
  readonly items: readonly Product[];
}

export function isProductListDTO(value: unknown): value is ProductListDTO {
  return !!value && isArrayOf<Product>(objectKey(value, 'items'), isProduct);
}

export function stringifyProductListDTO(value: ProductListDTO): string {
  if (!isProductListDTO(value))
    throw new TypeError(`Not ProductListDTO: ${value}`);
  return `ProductListDTO(${value})`;
}

export function parseProductListDTO(
  value: unknown,
): ProductListDTO | undefined {
  if (isProductListDTO(value)) return value;
  return undefined;
}
