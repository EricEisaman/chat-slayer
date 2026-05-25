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
import {isPaytrailStatus, PaytrailStatus} from '../types/PaytrailStatus';
import {
  explainPaytrailCurrency,
  isPaytrailCurrency,
  PaytrailCurrency,
} from '../types/PaytrailCurrency';
import {explainNumber, isNumber} from '../../types/Number';
import {isUndefined} from '../../types/undefined';

/**
 * HTTP GET /payments/{transactionId} returns payment information.
 *
 * Get transaction info. Payments are reported primarily via callbacks, and
 * implementations should mainly rely on receiving the info via them. All
 * received payments will be eventually reported.
 *
 * Note! The transaction id needs to be sent on checkout-transaction-id header
 * as well.
 *
 * @example
 *     {
 *       "transactionId": "681538c4-fc84-11e9-83bc-2ffcef4c3453",
 *       "status": "new",
 *       "amount": 1689,
 *       "currency": "EUR",
 *       "reference": "4940046476",
 *       "stamp": "15725981193483",
 *       "createdAt": "2019-11-01T10:48:39.979Z",
 *       "href": "https://pay.paytrail.com/pay/681538c4-fc84-11e9-83bc-2ffcef4c3453"
 *     }
 *
 * @see https://docs.paytrail.com/#/?id=get
 */
export interface PaytrailPaymentDTO {
  /**
   * Assigned transaction ID for the payment
   *
   * Example: `"681538c4-fc84-11e9-83bc-2ffcef4c3453"`
   */
  readonly transactionId: string;

  /**
   * new, ok, fail, pending, or delayed.
   *
   * Example: `"new"`
   */
  readonly status: PaytrailStatus;

  /**
   * Total amount of the payment in currency's minor units, e.g. for Euros use
   * cents
   *
   * Example: `1689`
   */
  readonly amount: number;

  /**
   * Currency
   *
   * Example: `"EUR"`
   */
  readonly currency: PaytrailCurrency;

  /**
   * Merchant unique identifier for the order
   *
   * Example: `"15725981193483"`
   */
  readonly stamp: string;

  /**
   * Order reference
   *
   * Example: `"4940046476"`
   */
  readonly reference: string;

  /**
   * Transaction creation timestamp
   *
   * Example: `"2019-11-01T10:48:39.979Z"`
   */
  readonly createdAt: string;

  /**
   * If transaction is in status new, link to the hosted payment gateway
   *
   * Example: `"https://pay.paytrail.com/pay/681538c4-fc84-11e9-83bc-2ffcef4c3453"`
   */
  readonly href?: string;

  /**
   * If processed, the name of the payment method provider
   */
  readonly provider?: string;

  /**
   * If paid, the filing code issued by the payment method provider if any.
   * Some providers do not return the filing code.
   */
  readonly fillingCode?: string;

  /**
   * Timestamp when the transaction was paid
   */
  readonly paidAt?: string;

  /**
   * If payment is settled, corresponding settlement reference is included
   */
  readonly settlementReference?: string;
}

export function createPaytrailPaymentDTO(
  transactionId: string,
  status: PaytrailStatus,
  amount: number,
  currency: PaytrailCurrency,
  stamp: string,
  reference: string,
  createdAt: string,
  href?: string,
  provider?: string,
  fillingCode?: string,
  paidAt?: string,
  settlementReference?: string,
): PaytrailPaymentDTO {
  return {
    transactionId,
    status,
    amount,
    currency,
    stamp,
    reference,
    createdAt,
    href,
    provider,
    fillingCode,
    paidAt,
    settlementReference,
  };
}

export function isPaytrailPaymentDTO(
  value: unknown,
): value is PaytrailPaymentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'transactionId',
      'status',
      'amount',
      'currency',
      'stamp',
      'reference',
      'createdAt',
      'href',
      'provider',
      'fillingCode',
      'paidAt',
      'settlementReference',
    ]) &&
    isString(objectKey(value, 'transactionId')) &&
    isPaytrailStatus(objectKey(value, 'status')) &&
    isNumber(objectKey(value, 'amount')) &&
    isPaytrailCurrency(objectKey(value, 'currency')) &&
    isString(objectKey(value, 'stamp')) &&
    isString(objectKey(value, 'reference')) &&
    isString(objectKey(value, 'createdAt')) &&
    isStringOrUndefined(objectKey(value, 'href')) &&
    isStringOrUndefined(objectKey(value, 'provider')) &&
    isStringOrUndefined(objectKey(value, 'fillingCode')) &&
    isStringOrUndefined(objectKey(value, 'paidAt')) &&
    isStringOrUndefined(objectKey(value, 'settlementReference'))
  );
}

export function isPaytrailPaymentDTOOrUndefined(
  value: unknown,
): value is PaytrailPaymentDTO | undefined {
  return isUndefined(value) || isPaytrailPaymentDTO(value);
}

export function explainPaytrailPaymentDTOOrUndefined(value: unknown): string {
  return isPaytrailPaymentDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['PaytrailPaymentDTO', 'undefined']));
}

export function explainPaytrailPaymentDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'transactionId',
      'status',
      'amount',
      'currency',
      'stamp',
      'reference',
      'createdAt',
      'href',
      'provider',
      'fillingCode',
      'paidAt',
      'settlementReference',
    ]),
    explainProperty(
      'transactionId',
      explainString(objectKey(value, 'transactionId')),
    ),
    explainProperty('status', explainString(objectKey(value, 'status'))),
    explainProperty('amount', explainNumber(objectKey(value, 'amount'))),
    explainProperty(
      'currency',
      explainPaytrailCurrency(objectKey(value, 'currency')),
    ),
    explainProperty('stamp', explainString(objectKey(value, 'stamp'))),
    explainProperty('reference', explainString(objectKey(value, 'reference'))),
    explainProperty('createdAt', explainString(objectKey(value, 'createdAt'))),
    explainProperty('href', explainStringOrUndefined(objectKey(value, 'href'))),
    explainProperty(
      'provider',
      explainStringOrUndefined(objectKey(value, 'provider')),
    ),
    explainProperty(
      'fillingCode',
      explainStringOrUndefined(objectKey(value, 'fillingCode')),
    ),
    explainProperty(
      'paidAt',
      explainStringOrUndefined(objectKey(value, 'paidAt')),
    ),
    explainProperty(
      'settlementReference',
      explainStringOrUndefined(objectKey(value, 'settlementReference')),
    ),
  ]);
}

export function parsePaytrailPaymentDTO(
  value: unknown,
): PaytrailPaymentDTO | undefined {
  if (isPaytrailPaymentDTO(value)) return value;
  return undefined;
}
