import {map} from '../../../functions/map';
import {objectKey} from '../../../types/RegularObject';

import {PaymentDTO, isPaymentDTO} from './PaymentDTO';
import {isArrayOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication
 */
export interface PaymentListDTO {
  readonly payload: readonly PaymentDTO[];
}

export function createPaymentListDTO(items: PaymentDTO[]): PaymentListDTO {
  return {
    payload: map(items, (item: PaymentDTO): PaymentDTO => item),
  } as PaymentListDTO;
}

export function isPaymentListDTO(value: unknown): value is PaymentListDTO {
  return (
    !!value && isArrayOf<PaymentDTO>(objectKey(value, 'payload'), isPaymentDTO)
  );
}

export function stringifyPaymentListDTO(value: PaymentListDTO): string {
  if (!isPaymentListDTO(value))
    throw new TypeError(`Not PaymentListDTO: ${value}`);
  return `PaymentListDTO(${value})`;
}

export function parsePaymentListDTO(
  value: unknown,
): PaymentListDTO | undefined {
  if (isPaymentListDTO(value)) return value;
  return undefined;
}
