import {isString, isStringOrUndefined} from '../../../types/String';
import {isNumberOrUndefined} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeys} from '../../../types/OtherKeys';

export interface NewInvoiceRowDTO {
  readonly invoiceId: string;
  readonly paymentId?: string;
  readonly campaignId?: string;
  readonly campaignPaymentId?: string;
  readonly productId?: string;
  readonly inventoryItemId?: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly description?: string;
  readonly internalNote?: string;
  readonly amount?: number;
  readonly price?: number;
  readonly vatPercent?: number;
  readonly discountPercent?: number;
}

export function createNewInvoiceRowDTO(
  invoiceId: string,
  paymentId: string | undefined,
  campaignId: string | undefined,
  campaignPaymentId: string | undefined,
  productId: string | undefined,
  inventoryItemId: string | undefined,
  startDate: string | undefined,
  endDate: string | undefined,
  description: string | undefined,
  internalNote: string | undefined,
  amount: number | undefined,
  price: number | undefined,
  vatPercent: number | undefined,
  discountPercent: number | undefined,
): NewInvoiceRowDTO {
  return {
    invoiceId,
    paymentId,
    campaignId,
    campaignPaymentId,
    productId,
    inventoryItemId,
    startDate,
    endDate,
    description,
    internalNote,
    amount,
    price,
    vatPercent,
    discountPercent,
  };
}

export function isNewInvoiceRowDTO(value: unknown): value is NewInvoiceRowDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'invoiceId',
      'paymentId',
      'campaignId',
      'campaignPaymentId',
      'productId',
      'inventoryItemId',
      'startDate',
      'endDate',
      'description',
      'internalNote',
      'amount',
      'price',
      'vatPercent',
      'discountPercent',
    ]) &&
    isString(objectKey(value, 'invoiceId')) &&
    isStringOrUndefined(objectKey(value, 'paymentId')) &&
    isStringOrUndefined(objectKey(value, 'campaignId')) &&
    isStringOrUndefined(objectKey(value, 'campaignPaymentId')) &&
    isStringOrUndefined(objectKey(value, 'productId')) &&
    isStringOrUndefined(objectKey(value, 'inventoryItemId')) &&
    isStringOrUndefined(objectKey(value, 'startDate')) &&
    isStringOrUndefined(objectKey(value, 'endDate')) &&
    isStringOrUndefined(objectKey(value, 'description')) &&
    isStringOrUndefined(objectKey(value, 'internalNote')) &&
    isNumberOrUndefined(objectKey(value, 'amount')) &&
    isNumberOrUndefined(objectKey(value, 'price')) &&
    isNumberOrUndefined(objectKey(value, 'vatPercent')) &&
    isNumberOrUndefined(objectKey(value, 'discountPercent'))
  );
}

export function stringifyNewInvoiceRowDTO(value: NewInvoiceRowDTO): string {
  return `NewInvoiceRowDTO(${value})`;
}

export function parseNewInvoiceRowDTO(
  value: unknown,
): NewInvoiceRowDTO | undefined {
  if (isNewInvoiceRowDTO(value)) return value;
  return undefined;
}
