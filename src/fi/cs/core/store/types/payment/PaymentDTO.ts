import {isBoolean} from '../../../types/Boolean';
import {isString} from '../../../types/String';
import {isNumber} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeys} from '../../../types/OtherKeys';

export interface PaymentDTO {
  readonly paymentId: string;
  readonly clientId: string;
  readonly refClientId: string;
  readonly billingClientId: string;
  readonly invoiceId: string;
  readonly campaignId: string;
  readonly productId: string;
  readonly groupId: string;
  readonly bankAccountId: string;
  readonly inventoryItemId: string;
  readonly updated: string;
  readonly created: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly dueDate: string;
  readonly description: string;
  readonly extraNotice: string;
  readonly amount: number;
  readonly price: number;
  readonly vatPercent: number;
  readonly discountPercent: number;
  readonly billingPeriod: number;
  readonly internalNote: string;
  readonly isRecurring: boolean;
  readonly onHold: boolean;
  readonly isTerminated: boolean;
}

export function createPaymentDTO(
  paymentId: string,
  clientId: string,
  refClientId: string,
  billingClientId: string,
  invoiceId: string,
  campaignId: string,
  productId: string,
  groupId: string,
  bankAccountId: string,
  inventoryItemId: string,
  updated: string,
  created: string,
  startDate: string,
  endDate: string,
  dueDate: string,
  description: string,
  extraNotice: string,
  amount: number,
  price: number,
  vatPercent: number,
  discountPercent: number,
  billingPeriod: number,
  internalNote: string,
  isRecurring: boolean,
  onHold: boolean,
  isTerminated: boolean,
): PaymentDTO {
  return {
    paymentId,
    clientId,
    refClientId,
    billingClientId,
    invoiceId,
    campaignId,
    productId,
    groupId,
    bankAccountId,
    inventoryItemId,
    updated,
    created,
    startDate,
    endDate,
    dueDate,
    description,
    extraNotice,
    amount,
    price,
    vatPercent,
    discountPercent,
    billingPeriod,
    internalNote,
    isRecurring,
    onHold,
    isTerminated,
  };
}

export function isPaymentDTO(value: unknown): value is PaymentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'paymentId',
      'clientId',
      'refClientId',
      'billingClientId',
      'invoiceId',
      'campaignId',
      'productId',
      'groupId',
      'bankAccountId',
      'inventoryItemId',
      'updated',
      'created',
      'startDate',
      'endDate',
      'dueDate',
      'description',
      'extraNotice',
      'amount',
      'price',
      'vatPercent',
      'discountPercent',
      'billingPeriod',
      'internalNote',
      'isRecurring',
      'onHold',
      'isTerminated',
    ]) &&
    isString(objectKey(value, 'paymentId')) &&
    isString(objectKey(value, 'clientId')) &&
    isString(objectKey(value, 'refClientId')) &&
    isString(objectKey(value, 'billingClientId')) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'campaignId')) &&
    isString(objectKey(value, 'productId')) &&
    isString(objectKey(value, 'groupId')) &&
    isString(objectKey(value, 'bankAccountId')) &&
    isString(objectKey(value, 'inventoryItemId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'startDate')) &&
    isString(objectKey(value, 'endDate')) &&
    isString(objectKey(value, 'dueDate')) &&
    isString(objectKey(value, 'description')) &&
    isString(objectKey(value, 'extraNotice')) &&
    isNumber(objectKey(value, 'amount')) &&
    isNumber(objectKey(value, 'price')) &&
    isNumber(objectKey(value, 'vatPercent')) &&
    isNumber(objectKey(value, 'discountPercent')) &&
    isNumber(objectKey(value, 'billingPeriod')) &&
    isString(objectKey(value, 'internalNote')) &&
    isBoolean(objectKey(value, 'isRecurring')) &&
    isBoolean(objectKey(value, 'onHold')) &&
    isBoolean(objectKey(value, 'isTerminated'))
  );
}

export function stringifyPaymentDTO(value: PaymentDTO): string {
  return `PaymentDTO(${value})`;
}

export function parsePaymentDTO(value: unknown): PaymentDTO | undefined {
  if (isPaymentDTO(value)) return value;
  return undefined;
}
