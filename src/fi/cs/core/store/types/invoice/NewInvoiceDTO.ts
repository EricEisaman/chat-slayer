import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isString, isStringOrUndefined} from '../../../types/String';
import {isNumberOrUndefined} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface NewInvoiceDTO {
  readonly clientId: string;
  readonly campaignId?: string;
  readonly groupId?: string;
  readonly bankAccountId?: string;
  readonly wcOrderId?: string;
  readonly date?: string;
  readonly dueDate?: string;
  readonly remindDate?: string;
  readonly checkoutDate?: string;
  readonly referenceNumber?: string;
  readonly internalNote?: string;
  readonly extraNotice?: string;
  readonly webSecret?: string;
  readonly checkoutStamp?: string;
  readonly onHold?: boolean;
  readonly isReminded?: boolean;
  readonly onCollection?: boolean;
  readonly isTerminated?: boolean;
  readonly buildDocuments?: boolean;
  readonly sendDocuments?: boolean;
  readonly dueDays?: number;
}

export function createNewInvoiceDTO(
  clientId: string,
  campaignId: string | undefined,
  groupId: string | undefined,
  bankAccountId: string | undefined,
  wcOrderId: string | undefined,
  date: string | undefined,
  dueDate: string | undefined,
  remindDate: string | undefined,
  checkoutDate: string | undefined,
  referenceNumber: string | undefined,
  internalNote: string | undefined,
  extraNotice: string | undefined,
  webSecret: string | undefined,
  checkoutStamp: string | undefined,
  onHold: boolean | undefined,
  isReminded: boolean | undefined,
  onCollection: boolean | undefined,
  isTerminated: boolean | undefined,
  buildDocuments: boolean | undefined,
  sendDocuments: boolean | undefined,
  dueDays: number | undefined,
): NewInvoiceDTO {
  return {
    clientId,
    campaignId,
    groupId,
    bankAccountId,
    wcOrderId,
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
  };
}

export function isNewInvoiceDTO(value: unknown): value is NewInvoiceDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'clientId',
      'campaignId',
      'groupId',
      'bankAccountId',
      'wcOrderId',
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
      'buildDocuments',
      'sendDocuments',
      'dueDays',
    ]) &&
    isString(objectKey(value, 'clientId')) &&
    isStringOrUndefined(objectKey(value, 'campaignId')) &&
    isStringOrUndefined(objectKey(value, 'groupId')) &&
    isStringOrUndefined(objectKey(value, 'bankAccountId')) &&
    isStringOrUndefined(objectKey(value, 'wcOrderId')) &&
    isStringOrUndefined(objectKey(value, 'date')) &&
    isStringOrUndefined(objectKey(value, 'dueDate')) &&
    isStringOrUndefined(objectKey(value, 'remindDate')) &&
    isStringOrUndefined(objectKey(value, 'checkoutDate')) &&
    isStringOrUndefined(objectKey(value, 'referenceNumber')) &&
    isStringOrUndefined(objectKey(value, 'internalNote')) &&
    isStringOrUndefined(objectKey(value, 'extraNotice')) &&
    isStringOrUndefined(objectKey(value, 'webSecret')) &&
    isStringOrUndefined(objectKey(value, 'checkoutStamp')) &&
    isBooleanOrUndefined(objectKey(value, 'onHold')) &&
    isBooleanOrUndefined(objectKey(value, 'isReminded')) &&
    isBooleanOrUndefined(objectKey(value, 'onCollection')) &&
    isBooleanOrUndefined(objectKey(value, 'isTerminated')) &&
    isBooleanOrUndefined(objectKey(value, 'buildDocuments')) &&
    isBooleanOrUndefined(objectKey(value, 'sendDocuments')) &&
    isNumberOrUndefined(objectKey(value, 'dueDays'))
  );
}

export function stringifyNewInvoiceDTO(value: NewInvoiceDTO): string {
  return `NewInvoiceDTO(${value})`;
}

export function parseNewInvoiceDTO(value: unknown): NewInvoiceDTO | undefined {
  if (isNewInvoiceDTO(value)) return value;
  return undefined;
}
