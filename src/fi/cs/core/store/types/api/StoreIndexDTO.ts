import {isProductListDTO, ProductListDTO} from '../product/ProductListDTO';
import {objectKey} from '../../../types/RegularObject';

import {isUndefined} from '../../../types/undefined';

export interface StoreIndexDTO {
  readonly products?: ProductListDTO;
}

export function isStoreIndexDTO(value: unknown): value is StoreIndexDTO {
  return (
    !!value &&
    (isUndefined(objectKey(value, 'products')) ||
      isProductListDTO(objectKey(value, 'products')))
  );
}

export function stringifyStoreIndexDTO(value: StoreIndexDTO): string {
  if (!isStoreIndexDTO(value))
    throw new TypeError(`Not StoreIndexDTO: ${value}`);
  return `StoreIndexDTO(${value})`;
}

export function parseStoreIndexDTO(value: unknown): StoreIndexDTO | undefined {
  if (isStoreIndexDTO(value)) return value;
  return undefined;
}
