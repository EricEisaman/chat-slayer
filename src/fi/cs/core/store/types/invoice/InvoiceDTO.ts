import {
  explainBoolean,
  explainBooleanOrUndefined,
  isBoolean,
} from '../../../types/Boolean';
import {
  isInvoiceRowDTO,
  InvoiceRowDTO,
  explainInvoiceRowDTO,
} from './InvoiceRowDTO';
import {isBooleanOrUndefined} from '../../../types/Boolean';
import {explainString, isString} from '../../../types/String';
import {
  explainNumber,
  explainNumberOrUndefined,
  isNumber,
  isNumberOrUndefined,
} from '../../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../types/OtherKeys';
import {
  explainArrayOfOrUndefined,
  isArrayOfOrUndefined,
} from '../../../types/Array';
import {
  explain,
  explainNot,
  explainOk,
  explainProperty,
} from '../../../types/explain';
import {isUndefined} from '../../../types/undefined';
import {
  explainPaytrailPaymentProviderListDTOOrUndefined,
  isPaytrailPaymentProviderListDTOOrUndefined,
  PaytrailPaymentProviderListDTO,
} from '../../../paytrail/dtos/PaytrailPaymentProviderListDTO';
import {
  explainPaytrailPaymentDTOOrUndefined,
  isPaytrailPaymentDTOOrUndefined,
  PaytrailPaymentDTO,
} from '../../../paytrail/dtos/PaytrailPaymentDTO';
import {
  explainPaytrailCreatePaymentDTOOrUndefined,
  isPaytrailCreatePaymentDTOOrUndefined,
  PaytrailCreatePaymentDTO,
} from '../../../paytrail/dtos/PaytrailCreatePaymentDTO';
import {CurrencyUtils} from '../../../CurrencyUtils';

export interface InvoiceDTO {
  readonly invoiceId: string;
  readonly clientId: string;
  readonly campaignId: string;
  readonly groupId: string;
  readonly bankAccountId: string;
  readonly wcOrderId: string;
  readonly updated: string;
  readonly created: string;
  readonly date: string;
  readonly dueDate: string;
  readonly remindDate: string;
  readonly checkoutDate: string;
  readonly referenceNumber: string;
  readonly internalNote: string;
  readonly extraNotice: string;
  readonly webSecret: string;
  readonly checkoutStamp: string;
  readonly onHold: boolean;
  readonly isReminded: boolean;
  readonly onCollection: boolean;
  readonly isTerminated: boolean;
  readonly buildDocuments: boolean;
  readonly sendDocuments: boolean;
  readonly dueDays: number;
  readonly rows?: readonly InvoiceRowDTO[];
  readonly isPaid?: boolean | undefined;
  readonly payment?: PaytrailPaymentProviderListDTO;
  readonly newTransaction?: PaytrailCreatePaymentDTO;
  readonly transaction?: PaytrailPaymentDTO;
  readonly totalSum?: number;
  readonly totalVat?: number;
  readonly totalSumIncludingVat?: number;
  readonly totalPaid?: number;
  readonly totalOpen?: number;
}

export function createInvoiceDTO(
  invoiceId: string,
  clientId: string,
  campaignId: string,
  groupId: string,
  bankAccountId: string,
  wcOrderId: string,
  updated: string,
  created: string,
  date: string,
  dueDate: string,
  remindDate: string,
  checkoutDate: string,
  referenceNumber: string,
  internalNote: string,
  extraNotice: string,
  webSecret: string,
  checkoutStamp: string,
  onHold: boolean,
  isReminded: boolean,
  onCollection: boolean,
  isTerminated: boolean,
  buildDocuments: boolean,
  sendDocuments: boolean,
  dueDays: number,
  rows?: readonly InvoiceRowDTO[],
  isPaid?: boolean,
  payment?: PaytrailPaymentProviderListDTO,
  newTransaction?: PaytrailCreatePaymentDTO,
  transaction?: PaytrailPaymentDTO,
  totalSum?: number,
  totalVat?: number,
  totalSumIncludingVat?: number,
  totalPaid?: number,
  totalOpen?: number,
): InvoiceDTO {
  if (
    totalVat === undefined &&
    totalSum !== undefined &&
    totalSumIncludingVat !== undefined
  ) {
    totalVat = totalSumIncludingVat - totalSum;
  }

  if (
    totalSumIncludingVat === undefined &&
    totalSum !== undefined &&
    totalVat !== undefined
  ) {
    totalSumIncludingVat = Math.round(totalSum * 100 + totalVat * 100) / 100;
  }

  if (
    totalSum === undefined &&
    totalSumIncludingVat !== undefined &&
    totalVat !== undefined
  ) {
    totalSum = totalSumIncludingVat - totalVat;
  }

  if (
    totalOpen === undefined &&
    totalSumIncludingVat !== undefined &&
    totalPaid !== undefined
  ) {
    totalOpen = Math.round(totalSumIncludingVat * 100 - totalPaid * 100) / 100;
  }

  if (
    totalPaid === undefined &&
    totalSumIncludingVat !== undefined &&
    totalOpen !== undefined
  ) {
    totalPaid = totalSumIncludingVat - totalOpen;
  }

  if (isPaid === undefined && totalOpen !== undefined) {
    isPaid = CurrencyUtils.getCents(totalOpen) <= 0;
  }

  return {
    invoiceId,
    clientId,
    campaignId,
    groupId,
    bankAccountId,
    wcOrderId,
    updated,
    created,
    date,
    dueDate,
    remindDate,
    checkoutDate,
    referenceNumber,
    internalNote,
    extraNotice,
    webSecret,
    checkoutStamp,
    onHold,
    isReminded,
    onCollection,
    isTerminated,
    buildDocuments,
    sendDocuments,
    dueDays,
    rows,
    ...(isPaid !== undefined ? {isPaid} : {}),
    ...(payment ? {payment} : {}),
    ...(newTransaction ? {newTransaction} : {}),
    ...(transaction ? {transaction} : {}),
    ...(totalSum !== undefined ? {totalSum} : {}),
    ...(totalVat !== undefined ? {totalVat} : {}),
    ...(totalSumIncludingVat !== undefined ? {totalSumIncludingVat} : {}),
    ...(totalPaid !== undefined ? {totalPaid} : {}),
    ...(totalOpen !== undefined ? {totalOpen} : {}),
  };
}

export function isInvoiceDTO(value: unknown): value is InvoiceDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'invoiceId',
      'clientId',
      'campaignId',
      'groupId',
      'bankAccountId',
      'wcOrderId',
      'updated',
      'created',
      'date',
      'dueDate',
      'remindDate',
      'checkoutDate',
      'referenceNumber',
      'internalNote',
      'extraNotice',
      'webSecret',
      'checkoutStamp',
      'onHold',
      'isReminded',
      'onCollection',
      'isTerminated',
      'isPaid',
      'buildDocuments',
      'sendDocuments',
      'dueDays',
      'rows',
      'payment',
      'newTransaction',
      'transaction',
      'totalSum',
      'totalVat',
      'totalSumIncludingVat',
      'totalPaid',
      'totalOpen',
    ]) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'clientId')) &&
    isString(objectKey(value, 'campaignId')) &&
    isString(objectKey(value, 'groupId')) &&
    isString(objectKey(value, 'bankAccountId')) &&
    isString(objectKey(value, 'wcOrderId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'date')) &&
    isString(objectKey(value, 'dueDate')) &&
    isString(objectKey(value, 'remindDate')) &&
    isString(objectKey(value, 'checkoutDate')) &&
    isString(objectKey(value, 'referenceNumber')) &&
    isString(objectKey(value, 'internalNote')) &&
    isString(objectKey(value, 'extraNotice')) &&
    isString(objectKey(value, 'webSecret')) &&
    isString(objectKey(value, 'checkoutStamp')) &&
    isBoolean(objectKey(value, 'onHold')) &&
    isBoolean(objectKey(value, 'isReminded')) &&
    isBoolean(objectKey(value, 'onCollection')) &&
    isBoolean(objectKey(value, 'isTerminated')) &&
    isBooleanOrUndefined(objectKey(value, 'isPaid')) &&
    isBoolean(objectKey(value, 'buildDocuments')) &&
    isBoolean(objectKey(value, 'sendDocuments')) &&
    isNumber(objectKey(value, 'dueDays')) &&
    isArrayOfOrUndefined<InvoiceRowDTO>(
      objectKey(value, 'rows'),
      isInvoiceRowDTO,
    ) &&
    isPaytrailPaymentProviderListDTOOrUndefined(objectKey(value, 'payment')) &&
    isPaytrailCreatePaymentDTOOrUndefined(objectKey(value, 'newTransaction')) &&
    isPaytrailPaymentDTOOrUndefined(objectKey(value, 'transaction')) &&
    isNumberOrUndefined(objectKey(value, 'totalSum')) &&
    isNumberOrUndefined(objectKey(value, 'totalVat')) &&
    isNumberOrUndefined(objectKey(value, 'totalSumIncludingVat')) &&
    isNumberOrUndefined(objectKey(value, 'totalPaid')) &&
    isNumberOrUndefined(objectKey(value, 'totalOpen'))
  );
}

export function explainInvoiceDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'invoiceId',
      'clientId',
      'campaignId',
      'groupId',
      'bankAccountId',
      'wcOrderId',
      'updated',
      'created',
      'date',
      'dueDate',
      'remindDate',
      'checkoutDate',
      'referenceNumber',
      'internalNote',
      'extraNotice',
      'webSecret',
      'checkoutStamp',
      'onHold',
      'isReminded',
      'onCollection',
      'isTerminated',
      'isPaid',
      'buildDocuments',
      'sendDocuments',
      'dueDays',
      'rows',
      'payment',
      'newTransaction',
      'transaction',
      'totalSum',
      'totalVat',
      'totalSumIncludingVat',
      'totalPaid',
      'totalOpen',
    ]),
    explainProperty('invoiceId', explainString(objectKey(value, 'invoiceId'))),
    explainProperty('clientId', explainString(objectKey(value, 'clientId'))),
    explainProperty(
      'campaignId',
      explainString(objectKey(value, 'campaignId')),
    ),
    explainProperty('groupId', explainString(objectKey(value, 'groupId'))),
    explainProperty(
      'bankAccountId',
      explainString(objectKey(value, 'bankAccountId')),
    ),
    explainProperty('wcOrderId', explainString(objectKey(value, 'wcOrderId'))),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty('created', explainString(objectKey(value, 'created'))),
    explainProperty('date', explainString(objectKey(value, 'date'))),
    explainProperty('dueDate', explainString(objectKey(value, 'dueDate'))),
    explainProperty(
      'remindDate',
      explainString(objectKey(value, 'remindDate')),
    ),
    explainProperty(
      'checkoutDate',
      explainString(objectKey(value, 'checkoutDate')),
    ),
    explainProperty(
      'referenceNumber',
      explainString(objectKey(value, 'referenceNumber')),
    ),
    explainProperty(
      'internalNote',
      explainString(objectKey(value, 'internalNote')),
    ),
    explainProperty(
      'extraNotice',
      explainString(objectKey(value, 'extraNotice')),
    ),
    explainProperty('webSecret', explainString(objectKey(value, 'webSecret'))),
    explainProperty(
      'checkoutStamp',
      explainString(objectKey(value, 'checkoutStamp')),
    ),
    explainProperty('onHold', explainBoolean(objectKey(value, 'onHold'))),
    explainProperty(
      'isReminded',
      explainBoolean(objectKey(value, 'isReminded')),
    ),
    explainProperty(
      'onCollection',
      explainBoolean(objectKey(value, 'onCollection')),
    ),
    explainProperty(
      'isTerminated',
      explainBoolean(objectKey(value, 'isTerminated')),
    ),
    explainProperty(
      'isPaid',
      explainBooleanOrUndefined(objectKey(value, 'isPaid')),
    ),
    explainProperty(
      'buildDocuments',
      explainBoolean(objectKey(value, 'buildDocuments')),
    ),
    explainProperty(
      'sendDocuments',
      explainBoolean(objectKey(value, 'sendDocuments')),
    ),
    explainProperty('dueDays', explainNumber(objectKey(value, 'dueDays'))),
    explainProperty(
      'rows',
      explainArrayOfOrUndefined<InvoiceRowDTO>(
        'InvoiceRowDTO',
        explainInvoiceRowDTO,
        objectKey(value, 'rows'),
        isInvoiceRowDTO,
      ),
    ),
    explainProperty(
      'payment',
      explainPaytrailPaymentProviderListDTOOrUndefined(
        objectKey(value, 'payment'),
      ),
    ),
    explainProperty(
      'newTransaction',
      explainPaytrailCreatePaymentDTOOrUndefined(
        objectKey(value, 'newTransaction'),
      ),
    ),
    explainProperty(
      'transaction',
      explainPaytrailPaymentDTOOrUndefined(objectKey(value, 'transaction')),
    ),
    explainProperty(
      'totalSum',
      explainNumberOrUndefined(objectKey(value, 'totalSum')),
    ),
    explainProperty(
      'totalVat',
      explainNumberOrUndefined(objectKey(value, 'totalVat')),
    ),
    explainProperty(
      'totalSumIncludingVat',
      explainNumberOrUndefined(objectKey(value, 'totalSumIncludingVat')),
    ),
    explainProperty(
      'totalPaid',
      explainNumberOrUndefined(objectKey(value, 'totalPaid')),
    ),
    explainProperty(
      'totalOpen',
      explainNumberOrUndefined(objectKey(value, 'totalOpen')),
    ),
  ]);
}

export function isInvoiceDTOOrUndefined(
  value: unknown,
): value is InvoiceDTO | undefined {
  return isUndefined(value) || isInvoiceDTO(value);
}

export function explainInvoiceDTOOrUndefined(value: unknown): string {
  return isInvoiceDTOOrUndefined(value)
    ? explainOk()
    : explainNot('InvoiceDTO | undefined');
}

export function parseInvoiceDTO(value: unknown): InvoiceDTO | undefined {
  if (isInvoiceDTO(value)) return value;
  return undefined;
}
