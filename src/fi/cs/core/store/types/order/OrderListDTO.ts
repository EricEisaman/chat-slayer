import {map} from '../../../functions/map';
import {objectKey} from '../../../types/RegularObject';

import {OrderDTO, isOrderDTO} from './OrderDTO';
import {isArrayOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication
 */
export interface OrderListDTO {
  readonly payload: readonly OrderDTO[];
}

export function createOrderListDTO(items: OrderDTO[]): OrderListDTO {
  return {
    payload: map(items, (item: OrderDTO): OrderDTO => item),
  } as OrderListDTO;
}

export function isOrderListDTO(value: unknown): value is OrderListDTO {
  return (
    !!value && isArrayOf<OrderDTO>(objectKey(value, 'payload'), isOrderDTO)
  );
}

export function stringifyOrderListDTO(value: OrderListDTO): string {
  if (!isOrderListDTO(value)) throw new TypeError(`Not OrderListDTO: ${value}`);
  return `OrderListDTO(${value})`;
}

export function parseOrderListDTO(value: unknown): OrderListDTO | undefined {
  if (isOrderListDTO(value)) return value;
  return undefined;
}
