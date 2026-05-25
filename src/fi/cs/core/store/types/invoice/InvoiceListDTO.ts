import {map} from '../../../functions/map';
import {objectKey} from '../../../types/RegularObject';

import {InvoiceDTO, isInvoiceDTO} from './InvoiceDTO';
import {isArrayOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication
 */
export interface InvoiceListDTO {
  readonly payload: readonly InvoiceDTO[];
}

export function createInvoiceListDTO(items: InvoiceDTO[]): InvoiceListDTO {
  return {
    payload: map(items, (item: InvoiceDTO): InvoiceDTO => item),
  } as InvoiceListDTO;
}

export function isInvoiceListDTO(value: unknown): value is InvoiceListDTO {
  return (
    !!value && isArrayOf<InvoiceDTO>(objectKey(value, 'payload'), isInvoiceDTO)
  );
}

export function stringifyInvoiceListDTO(value: InvoiceListDTO): string {
  if (!isInvoiceListDTO(value))
    throw new TypeError(`Not InvoiceListDTO: ${value}`);
  return `InvoiceListDTO(${value})`;
}

export function parseInvoiceListDTO(
  value: unknown,
): InvoiceListDTO | undefined {
  if (isInvoiceListDTO(value)) return value;
  return undefined;
}
