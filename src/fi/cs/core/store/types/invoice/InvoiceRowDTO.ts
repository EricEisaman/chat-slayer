import {explainString, isString} from '../../../types/String';
import {explainNumber, isNumber} from '../../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../types/OtherKeys';
import {explain, explainProperty} from '../../../types/explain';

export interface InvoiceRowDTO {
  readonly invoiceRowId: string;
  readonly invoiceId: string;
  readonly paymentId: string;
  readonly campaignId: string;
  readonly campaignPaymentId: string;
  readonly productId: string;
  readonly inventoryItemId: string;
  readonly updated: string;
  readonly created: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly description: string;
  readonly internalNote: string;
  readonly amount: number;
  readonly price: number;
  readonly vatPercent: number;
  readonly discountPercent: number;
}

export function createInvoiceRowDTO(
  invoiceRowId: string,
  invoiceId: string,
  paymentId: string,
  campaignId: string,
  campaignPaymentId: string,
  productId: string,
  inventoryItemId: string,
  updated: string,
  created: string,
  startDate: string,
  endDate: string,
  description: string,
  internalNote: string,
  amount: number,
  price: number,
  vatPercent: number,
  discountPercent: number,
): InvoiceRowDTO {
  return {
    invoiceRowId,
    invoiceId,
    paymentId,
    campaignId,
    campaignPaymentId,
    productId,
    inventoryItemId,
    updated,
    created,
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

export function isInvoiceRowDTO(value: unknown): value is InvoiceRowDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'invoiceRowId',
      'invoiceId',
      'paymentId',
      'campaignId',
      'campaignPaymentId',
      'productId',
      'inventoryItemId',
      'updated',
      'created',
      'startDate',
      'endDate',
      'description',
      'internalNote',
      'amount',
      'price',
      'vatPercent',
      'discountPercent',
    ]) &&
    isString(objectKey(value, 'invoiceRowId')) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'paymentId')) &&
    isString(objectKey(value, 'campaignId')) &&
    isString(objectKey(value, 'campaignPaymentId')) &&
    isString(objectKey(value, 'productId')) &&
    isString(objectKey(value, 'inventoryItemId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'startDate')) &&
    isString(objectKey(value, 'endDate')) &&
    isString(objectKey(value, 'description')) &&
    isString(objectKey(value, 'internalNote')) &&
    isNumber(objectKey(value, 'amount')) &&
    isNumber(objectKey(value, 'price')) &&
    isNumber(objectKey(value, 'vatPercent')) &&
    isNumber(objectKey(value, 'discountPercent'))
  );
}

export function explainInvoiceRowDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'invoiceRowId',
      'invoiceId',
      'paymentId',
      'campaignId',
      'campaignPaymentId',
      'productId',
      'inventoryItemId',
      'updated',
      'created',
      'startDate',
      'endDate',
      'description',
      'internalNote',
      'amount',
      'price',
      'vatPercent',
      'discountPercent',
    ]),
    explainProperty(
      'invoiceRowId',
      explainString(objectKey(value, 'invoiceRowId')),
    ),
    explainProperty('invoiceId', explainString(objectKey(value, 'invoiceId'))),
    explainProperty('paymentId', explainString(objectKey(value, 'paymentId'))),
    explainProperty(
      'campaignId',
      explainString(objectKey(value, 'campaignId')),
    ),
    explainProperty(
      'campaignPaymentId',
      explainString(objectKey(value, 'campaignPaymentId')),
    ),
    explainProperty('productId', explainString(objectKey(value, 'productId'))),
    explainProperty(
      'inventoryItemId',
      explainString(objectKey(value, 'inventoryItemId')),
    ),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty('created', explainString(objectKey(value, 'created'))),
    explainProperty('startDate', explainString(objectKey(value, 'startDate'))),
    explainProperty('endDate', explainString(objectKey(value, 'endDate'))),
    explainProperty(
      'description',
      explainString(objectKey(value, 'description')),
    ),
    explainProperty(
      'internalNote',
      explainString(objectKey(value, 'internalNote')),
    ),
    explainProperty('amount', explainNumber(objectKey(value, 'amount'))),
    explainProperty('price', explainNumber(objectKey(value, 'price'))),
    explainProperty(
      'vatPercent',
      explainNumber(objectKey(value, 'vatPercent')),
    ),
    explainProperty(
      'discountPercent',
      explainNumber(objectKey(value, 'discountPercent')),
    ),
  ]);
}

export function parseInvoiceRowDTO(value: unknown): InvoiceRowDTO | undefined {
  if (isInvoiceRowDTO(value)) return value;
  return undefined;
}
