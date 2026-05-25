import {map} from '../../../functions/map';
import {objectKey} from '../../../types/RegularObject';

import {InventoryItemDTO, isInventoryItemDTO} from './InventoryItemDTO';
import {isArrayOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication
 */
export interface InventoryItemListDTO {
  readonly payload: readonly InventoryItemDTO[];
}

export function createInventoryItemListDTO(
  items: readonly InventoryItemDTO[],
): InventoryItemListDTO {
  return {
    payload: map(items, (item: InventoryItemDTO): InventoryItemDTO => item),
  } as InventoryItemListDTO;
}

export function isInventoryItemListDTO(
  value: unknown,
): value is InventoryItemListDTO {
  return (
    !!value &&
    isArrayOf<InventoryItemDTO>(objectKey(value, 'payload'), isInventoryItemDTO)
  );
}

export function stringifyInventoryItemListDTO(
  value: InventoryItemListDTO,
): string {
  if (!isInventoryItemListDTO(value))
    throw new TypeError(`Not InventoryItemListDTO: ${value}`);
  return `InventoryItemListDTO(${value})`;
}

export function parseInventoryItemListDTO(
  value: unknown,
): InventoryItemListDTO | undefined {
  if (isInventoryItemListDTO(value)) return value;
  return undefined;
}
