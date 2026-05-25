import {isString} from '../../../types/String';

import {objectKey} from '../../../types/RegularObject';

export interface StoreErrorDTO {
  readonly error: string;
}

export function isStoreErrorDTO(value: unknown): value is StoreErrorDTO {
  return !!value && isString(objectKey(value, 'error'));
}

export function stringifyStoreErrorDTO(value: StoreErrorDTO): string {
  if (!isStoreErrorDTO(value))
    throw new TypeError(`Not StoreErrorDTO: ${value}`);
  return `StoreErrorDTO(${value})`;
}

export function parseStoreErrorDTO(value: unknown): StoreErrorDTO | undefined {
  if (isStoreErrorDTO(value)) return value;
  return undefined;
}
