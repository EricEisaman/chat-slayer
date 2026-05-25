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

export interface NewCheckoutTransactionDTO {
  readonly invoiceId: string;
  readonly transactionId: string;
  readonly href: string;
  readonly reference: string;
  readonly raw: string;
  readonly status: string;
  readonly amount: number;
}

export function createNewCheckoutTransactionDTO(
  invoiceId: string,
  transactionId: string,
  href: string,
  reference: string,
  raw: string,
  status: string,
  amount: number,
): NewCheckoutTransactionDTO {
  return {
    invoiceId,
    transactionId,
    href,
    reference,
    raw,
    status,
    amount,
  };
}

export function isNewCheckoutTransactionDTO(
  value: unknown,
): value is NewCheckoutTransactionDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'invoiceId',
      'transactionId',
      'href',
      'reference',
      'raw',
      'status',
      'amount',
    ]) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'transactionId')) &&
    isString(objectKey(value, 'href')) &&
    isString(objectKey(value, 'reference')) &&
    isString(objectKey(value, 'raw')) &&
    isString(objectKey(value, 'status')) &&
    isNumber(objectKey(value, 'amount'))
  );
}

export function explainNewCheckoutTransactionDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'invoiceId',
      'transactionId',
      'href',
      'reference',
      'raw',
      'status',
      'amount',
    ]),
    explainProperty('invoiceId', explainString(objectKey(value, 'invoiceId'))),
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

export function parseNewCheckoutTransactionDTO(
  value: unknown,
): NewCheckoutTransactionDTO | undefined {
  if (isNewCheckoutTransactionDTO(value)) return value;
  return undefined;
}
