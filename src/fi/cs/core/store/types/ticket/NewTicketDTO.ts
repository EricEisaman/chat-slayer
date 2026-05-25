import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isStringOrUndefined} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';
import {isStringArrayOrUndefined} from '../../../types/StringArray';

export interface NewTicketDTO {
  readonly clientId?: string;
  readonly contactId?: string;
  readonly orderId?: string;
  readonly invoiceId?: string;
  readonly purchaseCompanyId?: string;
  readonly purchaseInvoiceId?: string;
  readonly inventoryItemId?: string;
  readonly date?: string;
  readonly dueDate?: string;
  readonly state?: string;
  readonly subject?: string;
  readonly description?: string;
  readonly internalNote?: string;
  readonly tags?: readonly string[];
  readonly dataJson?: string;
  readonly onHold?: boolean;
  readonly isTerminated?: boolean;
}

export function createNewTicketDTO(
  clientId: string | undefined,
  contactId: string | undefined,
  orderId: string | undefined,
  invoiceId: string | undefined,
  purchaseCompanyId: string | undefined,
  purchaseInvoiceId: string | undefined,
  inventoryItemId: string | undefined,
  date: string | undefined,
  dueDate: string | undefined,
  state: string | undefined,
  subject: string | undefined,
  description: string | undefined,
  internalNote: string | undefined,
  tags: readonly string[] | undefined,
  dataJson: string | undefined,
  onHold: boolean | undefined,
  isTerminated: boolean | undefined,
): NewTicketDTO {
  return {
    clientId,
    contactId,
    orderId,
    invoiceId,
    purchaseCompanyId,
    purchaseInvoiceId,
    inventoryItemId,
    date,
    dueDate,
    state,
    subject,
    description,
    internalNote,
    tags,
    dataJson,
    onHold,
    isTerminated,
  };
}

export function isNewTicketDTO(value: unknown): value is NewTicketDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'clientId',
      'contactId',
      'orderId',
      'invoiceId',
      'purchaseCompanyId',
      'purchaseInvoiceId',
      'inventoryItemId',
      'date',
      'dueDate',
      'state',
      'subject',
      'description',
      'internalNote',
      'tags',
      'dataJson',
      'onHold',
      'isTerminated',
    ]) &&
    isStringOrUndefined(objectKey(value, 'clientId')) &&
    isStringOrUndefined(objectKey(value, 'contactId')) &&
    isStringOrUndefined(objectKey(value, 'orderId')) &&
    isStringOrUndefined(objectKey(value, 'invoiceId')) &&
    isStringOrUndefined(objectKey(value, 'purchaseCompanyId')) &&
    isStringOrUndefined(objectKey(value, 'purchaseInvoiceId')) &&
    isStringOrUndefined(objectKey(value, 'inventoryItemId')) &&
    isStringOrUndefined(objectKey(value, 'date')) &&
    isStringOrUndefined(objectKey(value, 'dueDate')) &&
    isStringOrUndefined(objectKey(value, 'state')) &&
    isStringOrUndefined(objectKey(value, 'subject')) &&
    isStringOrUndefined(objectKey(value, 'description')) &&
    isStringOrUndefined(objectKey(value, 'internalNote')) &&
    isStringArrayOrUndefined(objectKey(value, 'tags')) &&
    isStringOrUndefined(objectKey(value, 'dataJson')) &&
    isBooleanOrUndefined(objectKey(value, 'onHold')) &&
    isBooleanOrUndefined(objectKey(value, 'isTerminated'))
  );
}

export function stringifyNewTicketDTO(value: NewTicketDTO): string {
  return `NewTicketDTO(${value})`;
}

export function parseNewTicketDTO(value: unknown): NewTicketDTO | undefined {
  if (isNewTicketDTO(value)) return value;
  return undefined;
}
