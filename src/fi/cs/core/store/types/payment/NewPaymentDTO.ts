import {isString, isStringOrUndefined} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeys} from '../../../types/OtherKeys';

export interface NewPaymentDTO {
  readonly clientId: string;
  readonly price?: number;
  readonly vatPercent?: number;
  readonly startDate?: string;
  readonly description?: string;
  readonly endDate?: string;
  readonly billingPeriod?: number;
  readonly amount?: number;
  readonly bankAccountId?: string;
  readonly inventoryItemId?: string;
  readonly refClientId?: string;
  readonly billingClientId?: string;
  readonly invoiceId?: string;
  readonly campaignId?: string;
  readonly productId?: string;
  readonly groupId?: string;
  readonly dueDate?: string;
  readonly extraNotice?: string;
  readonly discountPercent?: number;
  readonly internalNote?: string;
  readonly isRecurring?: boolean;
  readonly onHold?: boolean;
  readonly isTerminated?: boolean;
}

export function createNewPaymentDTO(
  clientId: string,
  refClientId: string | undefined,
  billingClientId: string | undefined,
  invoiceId: string | undefined,
  campaignId: string | undefined,
  productId: string | undefined,
  groupId: string | undefined,
  bankAccountId: string | undefined,
  inventoryItemId: string | undefined,
  startDate: string | undefined,
  endDate: string | undefined,
  dueDate: string | undefined,
  description: string | undefined,
  extraNotice: string | undefined,
  amount: number | undefined,
  price: number | undefined,
  vatPercent: number | undefined,
  discountPercent: number | undefined,
  billingPeriod: number | undefined,
  internalNote: string | undefined,
  isRecurring: boolean | undefined,
  onHold: boolean | undefined,
  isTerminated: boolean | undefined,
): NewPaymentDTO {
  return {
    clientId,
    refClientId,
    billingClientId,
    invoiceId,
    campaignId,
    productId,
    groupId,
    bankAccountId,
    inventoryItemId,
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

export function isNewPaymentDTO(value: unknown): value is NewPaymentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'clientId',
      'refClientId',
      'billingClientId',
      'invoiceId',
      'campaignId',
      'productId',
      'groupId',
      'bankAccountId',
      'inventoryItemId',
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
    isString(objectKey(value, 'clientId')) &&
    isStringOrUndefined(objectKey(value, 'refClientId')) &&
    isStringOrUndefined(objectKey(value, 'billingClientId')) &&
    isStringOrUndefined(objectKey(value, 'invoiceId')) &&
    isStringOrUndefined(objectKey(value, 'campaignId')) &&
    isStringOrUndefined(objectKey(value, 'productId')) &&
    isStringOrUndefined(objectKey(value, 'groupId')) &&
    isStringOrUndefined(objectKey(value, 'bankAccountId')) &&
    isStringOrUndefined(objectKey(value, 'inventoryItemId')) &&
    isStringOrUndefined(objectKey(value, 'startDate')) &&
    isStringOrUndefined(objectKey(value, 'endDate')) &&
    isStringOrUndefined(objectKey(value, 'dueDate')) &&
    isStringOrUndefined(objectKey(value, 'description')) &&
    isStringOrUndefined(objectKey(value, 'extraNotice')) &&
    isStringOrUndefined(objectKey(value, 'amount')) &&
    isStringOrUndefined(objectKey(value, 'price')) &&
    isStringOrUndefined(objectKey(value, 'vatPercent')) &&
    isStringOrUndefined(objectKey(value, 'discountPercent')) &&
    isStringOrUndefined(objectKey(value, 'billingPeriod')) &&
    isStringOrUndefined(objectKey(value, 'internalNote')) &&
    isStringOrUndefined(objectKey(value, 'isRecurring')) &&
    isStringOrUndefined(objectKey(value, 'onHold')) &&
    isStringOrUndefined(objectKey(value, 'isTerminated'))
  );
}

export function stringifyNewPaymentDTO(value: NewPaymentDTO): string {
  return `NewPaymentDTO(${value})`;
}

export function parseNewPaymentDTO(value: unknown): NewPaymentDTO | undefined {
  if (isNewPaymentDTO(value)) return value;
  return undefined;
}
