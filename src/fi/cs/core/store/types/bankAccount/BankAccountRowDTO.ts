import {isString} from '../../../types/String';
import {isNumber} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface BankAccountRowDTO {
  readonly bankAccountRowId: string;
  readonly updated: string;
  readonly created: string;
  readonly bankAccountId: string;
  readonly invoiceId: string;
  readonly documentId: string;
  readonly banksonInboundPaymentId: string;
  readonly archiveId: string;
  readonly purchaseInvoiceId: string;
  readonly date: string;
  readonly referenceNumber: string;
  readonly name: string;
  readonly description: string;
  readonly message: string;
  readonly internalNote: string;
  readonly bankAccountNumber: string;
  readonly sum: number;
}

export function createBankAccountRowDTO(
  bankAccountRowId: string,
  updated: string,
  created: string,
  sum: number,
  bankAccountId: string,
  invoiceId: string,
  documentId: string,
  archiveId: string,
  purchaseInvoiceId: string,
  date: string,
  referenceNumber: string,
  name: string,
  description: string,
  message: string,
  internalNote: string,
  bankAccountNumber: string,
  banksonInboundPaymentId: string,
): BankAccountRowDTO {
  return {
    bankAccountRowId,
    updated,
    created,
    bankAccountId,
    invoiceId,
    documentId,
    banksonInboundPaymentId,
    archiveId,
    purchaseInvoiceId,
    date,
    referenceNumber,
    name,
    description,
    message,
    internalNote,
    bankAccountNumber,
    sum,
  };
}

export function isBankAccountRowDTO(
  value: unknown,
): value is BankAccountRowDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'bankAccountRowId',
      'updated',
      'created',
      'bankAccountId',
      'invoiceId',
      'documentId',
      'banksonInboundPaymentId',
      'archiveId',
      'purchaseInvoiceId',
      'date',
      'referenceNumber',
      'name',
      'description',
      'message',
      'internalNote',
      'bankAccountNumber',
      'sum',
    ]) &&
    isString(objectKey(value, 'bankAccountRowId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'bankAccountId')) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'documentId')) &&
    isString(objectKey(value, 'banksonInboundPaymentId')) &&
    isString(objectKey(value, 'archiveId')) &&
    isString(objectKey(value, 'purchaseInvoiceId')) &&
    isString(objectKey(value, 'date')) &&
    isString(objectKey(value, 'referenceNumber')) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'description')) &&
    isString(objectKey(value, 'message')) &&
    isString(objectKey(value, 'internalNote')) &&
    isString(objectKey(value, 'bankAccountNumber')) &&
    isNumber(objectKey(value, 'sum'))
  );
}

export function parseBankAccountRowDTO(
  value: unknown,
): BankAccountRowDTO | undefined {
  if (isBankAccountRowDTO(value)) return value;
  return undefined;
}
