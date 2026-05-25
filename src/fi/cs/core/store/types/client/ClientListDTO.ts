import {map} from '../../../functions/map';
import {objectKey} from '../../../types/RegularObject';

import {ClientDTO, isClientDTO} from './ClientDTO';
import {isArrayOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication
 */
export interface ClientListDTO {
  readonly payload: readonly ClientDTO[];
}

export function createClientListDTO(items: ClientDTO[]): ClientListDTO {
  return {
    payload: map(items, (item: ClientDTO): ClientDTO => item),
  };
}

export function isClientListDTO(value: unknown): value is ClientListDTO {
  return (
    !!value && isArrayOf<ClientDTO>(objectKey(value, 'payload'), isClientDTO)
  );
}

export function stringifyClientListDTO(value: ClientListDTO): string {
  if (!isClientListDTO(value))
    throw new TypeError(`Not ClientListDTO: ${value}`);
  return `ClientListDTO(${value})`;
}

export function parseClientListDTO(value: unknown): ClientListDTO | undefined {
  if (isClientListDTO(value)) return value;
  return undefined;
}
