import {isString, isStringOrUndefined} from '../../../types/String';
import {isNumber} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface NewInvoicePaymentDTO {
  readonly invoiceId: string;
  readonly date: string;
  readonly name: string;
  readonly description: string;
  readonly sum: number;
  readonly documentId?: string;
  readonly opTransactionId?: string;
}

export function createNewInvoicePaymentDTO(
  invoiceId: string,
  date: string,
  name: string,
  description: string,
  sum: number,
  documentId: string | undefined,
  opTransactionId: string | undefined,
): NewInvoicePaymentDTO {
  return {
    invoiceId,
    date,
    name,
    description,
    sum,
    documentId,
    opTransactionId,
  };
}

export function isNewInvoicePaymentDTO(
  value: unknown,
): value is NewInvoicePaymentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'invoiceId',
      'date',
      'name',
      'description',
      'sum',
      'documentId',
      'opTransactionId',
    ]) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'date')) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'description')) &&
    isNumber(objectKey(value, 'sum')) &&
    isStringOrUndefined(objectKey(value, 'documentId')) &&
    isStringOrUndefined(objectKey(value, 'opTransactionId'))
  );
}

export function parseNewInvoicePaymentDTO(
  value: unknown,
): NewInvoicePaymentDTO | undefined {
  if (isNewInvoicePaymentDTO(value)) return value;
  return undefined;
}
