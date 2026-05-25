import {map} from '../../../functions/map';
import {objectKey} from '../../../types/RegularObject';

import {TicketDTO, isTicketDTO} from './TicketDTO';
import {isArrayOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication
 */
export interface TicketListDTO {
  readonly payload: readonly TicketDTO[];
}

export function createTicketListDTO(
  items: TicketDTO[] | readonly TicketDTO[],
): TicketListDTO {
  return {
    payload: map(items, (item: TicketDTO): TicketDTO => item),
  };
}

export function isTicketListDTO(value: unknown): value is TicketListDTO {
  return (
    !!value && isArrayOf<TicketDTO>(objectKey(value, 'payload'), isTicketDTO)
  );
}

export function stringifyTicketListDTO(value: TicketListDTO): string {
  if (!isTicketListDTO(value))
    throw new TypeError(`Not TicketListDTO: ${value}`);
  return `TicketListDTO(${value})`;
}

export function parseTicketListDTO(value: unknown): TicketListDTO | undefined {
  if (isTicketListDTO(value)) return value;
  return undefined;
}
