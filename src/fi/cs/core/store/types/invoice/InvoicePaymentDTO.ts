import {isString} from '../../../types/String';
import {isNumber} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface InvoicePaymentDTO {
  readonly invoicePaymentId: string;
  readonly updated: string;
  readonly created: string;
  readonly invoiceId: string;
  readonly date: string;
  readonly name: string;
  readonly description: string;
  readonly sum: number;
  readonly documentId: string;
  readonly opTransactionId: string;
}

export function createInvoicePaymentDTO(
  invoicePaymentId: string,
  created: string,
  updated: string,
  invoiceId: string,
  date: string,
  name: string,
  description: string,
  sum: number,
  documentId: string,
  opTransactionId: string,
): InvoicePaymentDTO {
  return {
    invoicePaymentId,
    created,
    updated,
    invoiceId,
    date,
    name,
    description,
    sum,
    documentId,
    opTransactionId,
  };
}

export function isInvoicePaymentDTO(
  value: unknown,
): value is InvoicePaymentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'invoicePaymentId',
      'created',
      'updated',
      'invoiceId',
      'date',
      'name',
      'description',
      'sum',
      'documentId',
      'opTransactionId',
    ]) &&
    isString(objectKey(value, 'invoicePaymentId')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'date')) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'description')) &&
    isNumber(objectKey(value, 'sum')) &&
    isString(objectKey(value, 'documentId')) &&
    isString(objectKey(value, 'opTransactionId'))
  );
}

export function parseInvoicePaymentDTO(
  value: unknown,
): InvoicePaymentDTO | undefined {
  if (isInvoicePaymentDTO(value)) return value;
  return undefined;
}
