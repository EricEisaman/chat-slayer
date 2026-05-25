import {map} from '../../../functions/map';
import {objectKey} from '../../../types/RegularObject';

import {InvoiceRowDTO, isInvoiceRowDTO} from './InvoiceRowDTO';
import {isArrayOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication
 */
export interface InvoiceRowListDTO {
  readonly payload: readonly InvoiceRowDTO[];
}

export function createInvoiceRowListDTO(
  items: readonly InvoiceRowDTO[],
): InvoiceRowListDTO {
  return {
    payload: map(items, (item: InvoiceRowDTO): InvoiceRowDTO => item),
  } as InvoiceRowListDTO;
}

export function isInvoiceRowListDTO(
  value: unknown,
): value is InvoiceRowListDTO {
  return (
    !!value &&
    isArrayOf<InvoiceRowDTO>(objectKey(value, 'payload'), isInvoiceRowDTO)
  );
}

export function stringifyInvoiceRowListDTO(value: InvoiceRowListDTO): string {
  if (!isInvoiceRowListDTO(value))
    throw new TypeError(`Not InvoiceRowListDTO: ${value}`);
  return `InvoiceRowListDTO(${value})`;
}

export function parseInvoiceRowListDTO(
  value: unknown,
): InvoiceRowListDTO | undefined {
  if (isInvoiceRowListDTO(value)) return value;
  return undefined;
}
