import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../types/String';
import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';
import {
  explainOpPaymentStatus,
  isOpPaymentStatus,
  OpPaymentStatus,
} from '../types/OpPaymentStatus';
import {
  explainOpPaymentType,
  isOpPaymentType,
  OpPaymentType,
} from '../types/OpPaymentType';
import {Currency} from '../../types/Currency';

/**
 * @example
 *
 *    {
 *    "amount": "3.45",
 *    "status": "PROCESSED",
 *    "currency": "EUR",
 *    "archiveId": "20190524593156999999",
 *    "debtorIban": "FI4550009420888888",
 *    "ultimateDebtorName": "Ultimate Debtor",
 *    "bookingDate": "2019-05-12",
 *    "paymentType": "SCT_INST",
 *    "creditorIban": "FI4550009420999999",
 *    "creditorName": "Cedric Creditor",
 *    "ultimateCreditorName": "Ultimate Creditor",
 *    "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
 *    "transactionDate": "2019-05-11",
 *    "endToEndId": "544652-end2end"
 *    }
 */
export interface OpPaymentResponseDTO {
  readonly amount: string;
  readonly status: OpPaymentStatus;
  readonly currency: Currency;
  readonly archiveId: string;
  readonly debtorIban: string;
  readonly bookingDate: string;
  readonly paymentType: OpPaymentType;
  readonly creditorIban: string;
  readonly creditorName: string;
  readonly ultimateDebtorName?: string;
  readonly ultimateCreditorName?: string;
  readonly transactionId: string;
  readonly transactionDate: string;
  readonly endToEndId: string;
}

export function createOpPaymentResponseDTO(
  amount: string,
  status: OpPaymentStatus,
  currency: Currency,
  archiveId: string,
  debtorIban: string,
  ultimateDebtorName: string | undefined,
  bookingDate: string,
  paymentType: OpPaymentType,
  creditorIban: string,
  creditorName: string,
  ultimateCreditorName: string | undefined,
  transactionId: string,
  transactionDate: string,
  endToEndId: string,
): OpPaymentResponseDTO {
  return {
    amount,
    status,
    currency,
    archiveId,
    debtorIban,
    bookingDate,
    paymentType,
    creditorIban,
    creditorName,
    transactionId,
    transactionDate,
    endToEndId,
    ...(ultimateDebtorName !== undefined ? {ultimateDebtorName} : {}),
    ...(ultimateCreditorName !== undefined ? {ultimateCreditorName} : {}),
  };
}

export function isOpPaymentResponseDTO(
  value: unknown,
): value is OpPaymentResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'amount',
      'status',
      'currency',
      'archiveId',
      'debtorIban',
      'ultimateDebtorName',
      'bookingDate',
      'paymentType',
      'creditorIban',
      'creditorName',
      'ultimateCreditorName',
      'transactionId',
      'transactionDate',
      'endToEndId',
    ]) &&
    isString(objectKey(value, 'amount')) &&
    isOpPaymentStatus(objectKey(value, 'status')) &&
    isString(objectKey(value, 'currency')) &&
    isString(objectKey(value, 'archiveId')) &&
    isString(objectKey(value, 'debtorIban')) &&
    isStringOrUndefined(objectKey(value, 'ultimateDebtorName')) &&
    isString(objectKey(value, 'bookingDate')) &&
    isOpPaymentType(objectKey(value, 'paymentType')) &&
    isString(objectKey(value, 'creditorIban')) &&
    isString(objectKey(value, 'creditorName')) &&
    isStringOrUndefined(objectKey(value, 'ultimateCreditorName')) &&
    isString(objectKey(value, 'transactionId')) &&
    isString(objectKey(value, 'transactionDate')) &&
    isString(objectKey(value, 'endToEndId'))
  );
}

export function explainOpPaymentResponseDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'amount',
      'status',
      'currency',
      'archiveId',
      'debtorIban',
      'ultimateDebtorName',
      'bookingDate',
      'paymentType',
      'creditorIban',
      'creditorName',
      'ultimateCreditorName',
      'transactionId',
      'transactionDate',
      'endToEndId',
    ]),
    explainProperty('amount', explainString(objectKey(value, 'amount'))),
    explainProperty(
      'status',
      explainOpPaymentStatus(objectKey(value, 'status')),
    ),
    explainProperty('currency', explainString(objectKey(value, 'currency'))),
    explainProperty('archiveId', explainString(objectKey(value, 'archiveId'))),
    explainProperty(
      'debtorIban',
      explainString(objectKey(value, 'debtorIban')),
    ),
    explainProperty(
      'ultimateDebtorName',
      explainStringOrUndefined(objectKey(value, 'ultimateDebtorName')),
    ),
    explainProperty(
      'bookingDate',
      explainString(objectKey(value, 'bookingDate')),
    ),
    explainProperty(
      'paymentType',
      explainOpPaymentType(objectKey(value, 'paymentType')),
    ),
    explainProperty(
      'creditorIban',
      explainString(objectKey(value, 'creditorIban')),
    ),
    explainProperty(
      'creditorName',
      explainString(objectKey(value, 'creditorName')),
    ),
    explainProperty(
      'ultimateCreditorName',
      explainStringOrUndefined(objectKey(value, 'ultimateCreditorName')),
    ),
    explainProperty(
      'transactionId',
      explainString(objectKey(value, 'transactionId')),
    ),
    explainProperty(
      'transactionDate',
      explainString(objectKey(value, 'transactionDate')),
    ),
    explainProperty(
      'endToEndId',
      explainString(objectKey(value, 'endToEndId')),
    ),
  ]);
}

export function parseOpPaymentResponseDTO(
  value: unknown,
): OpPaymentResponseDTO | undefined {
  if (isOpPaymentResponseDTO(value)) return value;
  return undefined;
}

export function isOpPaymentResponseDTOOrUndefined(
  value: unknown,
): value is OpPaymentResponseDTO | undefined {
  return isUndefined(value) || isOpPaymentResponseDTO(value);
}

export function explainOpPaymentResponseDTOOrUndefined(value: unknown): string {
  return isOpPaymentResponseDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['OpPaymentResponseDTO', 'undefined']));
}
