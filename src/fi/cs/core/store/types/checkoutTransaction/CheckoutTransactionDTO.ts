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

export interface CheckoutTransactionDTO {
  readonly checkoutTransactionId: string;
  readonly invoiceId: string;
  readonly creation: string;
  readonly updated: string;
  readonly transactionId: string;
  readonly href: string;
  readonly reference: string;
  readonly raw: string;
  readonly status: string;
  readonly amount: number;
}

export function createCheckoutTransactionDTO(
  checkoutTransactionId: string,
  invoiceId: string,
  creation: string,
  updated: string,
  transactionId: string,
  href: string,
  reference: string,
  raw: string,
  status: string,
  amount: number,
): CheckoutTransactionDTO {
  return {
    checkoutTransactionId,
    invoiceId,
    creation,
    updated,
    transactionId,
    href,
    reference,
    raw,
    status,
    amount,
  };
}

export function isCheckoutTransactionDTO(
  value: unknown,
): value is CheckoutTransactionDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'checkoutTransactionId',
      'invoiceId',
      'creation',
      'updated',
      'transactionId',
      'href',
      'reference',
      'raw',
      'status',
      'amount',
    ]) &&
    isString(objectKey(value, 'checkoutTransactionId')) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'creation')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'transactionId')) &&
    isString(objectKey(value, 'href')) &&
    isString(objectKey(value, 'reference')) &&
    isString(objectKey(value, 'raw')) &&
    isString(objectKey(value, 'status')) &&
    isNumber(objectKey(value, 'amount'))
  );
}

export function explainCheckoutTransactionDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'checkoutTransactionId',
      'invoiceId',
      'creation',
      'updated',
      'transactionId',
      'href',
      'reference',
      'raw',
      'status',
      'amount',
    ]),
    explainProperty(
      'checkoutTransactionId',
      explainString(objectKey(value, 'checkoutTransactionId')),
    ),
    explainProperty('invoiceId', explainString(objectKey(value, 'invoiceId'))),
    explainProperty('creation', explainString(objectKey(value, 'creation'))),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty(
      'transactionId',
      explainString(objectKey(value, 'transactionId')),
    ),
    explainProperty('href', explainString(objectKey(value, 'href'))),
    explainProperty('reference', explainString(objectKey(value, 'reference'))),
    explainProperty('raw', explainString(objectKey(value, 'raw'))),
    explainProperty('status', explainString(objectKey(value, 'status'))),
    explainProperty('amount', explainNumber(objectKey(value, 'amount'))),
  ]);
}

export function parseCheckoutTransactionDTO(
  value: unknown,
): CheckoutTransactionDTO | undefined {
  if (isCheckoutTransactionDTO(value)) return value;
  return undefined;
}
