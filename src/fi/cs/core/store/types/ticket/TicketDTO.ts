import {isTicketCommentDTO, TicketCommentDTO} from './TicketCommentDTO';
import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isString, isStringOrUndefined} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';
import {isArrayOfOrUndefined} from '../../../types/Array';
import {isStringArrayOrUndefined} from '../../../types/StringArray';
import {isTicketUserDTO, TicketUserDTO} from './TicketUserDTO';

export interface TicketDTO {
  readonly ticketId: string;
  readonly clientId?: string;
  readonly contactId?: string;
  readonly orderId?: string;
  readonly invoiceId?: string;
  readonly purchaseCompanyId?: string;
  readonly purchaseInvoiceId?: string;
  readonly inventoryItemId?: string;
  readonly updated?: string;
  readonly created?: string;
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
  readonly comments?: readonly TicketCommentDTO[];
  readonly members?: readonly TicketUserDTO[];
}

export function createTicketDTO(
  ticketId: string,
  clientId: string | undefined,
  contactId: string | undefined,
  orderId: string | undefined,
  invoiceId: string | undefined,
  purchaseCompanyId: string | undefined,
  purchaseInvoiceId: string | undefined,
  inventoryItemId: string | undefined,
  updated: string | undefined,
  created: string | undefined,
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
  comments?: readonly TicketCommentDTO[],
  members?: readonly TicketUserDTO[],
): TicketDTO {
  return {
    ticketId,
    clientId,
    contactId,
    orderId,
    invoiceId,
    purchaseCompanyId,
    purchaseInvoiceId,
    inventoryItemId,
    updated,
    created,
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
    comments,
    members,
  };
}

export function isTicketDTO(value: unknown): value is TicketDTO {
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
      'updated',
      'created',
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
      'comments',
      'members',
    ]) &&
    isString(objectKey(value, 'ticketId')) &&
    isStringOrUndefined(objectKey(value, 'clientId')) &&
    isStringOrUndefined(objectKey(value, 'contactId')) &&
    isStringOrUndefined(objectKey(value, 'orderId')) &&
    isStringOrUndefined(objectKey(value, 'invoiceId')) &&
    isStringOrUndefined(objectKey(value, 'purchaseCompanyId')) &&
    isStringOrUndefined(objectKey(value, 'purchaseInvoiceId')) &&
    isStringOrUndefined(objectKey(value, 'inventoryItemId')) &&
    isStringOrUndefined(objectKey(value, 'updated')) &&
    isStringOrUndefined(objectKey(value, 'created')) &&
    isStringOrUndefined(objectKey(value, 'date')) &&
    isStringOrUndefined(objectKey(value, 'dueDate')) &&
    isStringOrUndefined(objectKey(value, 'state')) &&
    isStringOrUndefined(objectKey(value, 'subject')) &&
    isStringOrUndefined(objectKey(value, 'description')) &&
    isStringOrUndefined(objectKey(value, 'internalNote')) &&
    isStringArrayOrUndefined(objectKey(value, 'tags')) &&
    isStringOrUndefined(objectKey(value, 'dataJson')) &&
    isBooleanOrUndefined(objectKey(value, 'onHold')) &&
    isBooleanOrUndefined(objectKey(value, 'isTerminated')) &&
    isArrayOfOrUndefined<TicketCommentDTO>(
      objectKey(value, 'comments'),
      isTicketCommentDTO,
    ) &&
    isArrayOfOrUndefined<TicketUserDTO>(
      objectKey(value, 'members'),
      isTicketUserDTO,
    )
  );
}

export function stringifyTicketDTO(value: TicketDTO): string {
  return `TicketDTO(${value})`;
}

export function parseTicketDTO(value: unknown): TicketDTO | undefined {
  if (isTicketDTO(value)) return value;
  return undefined;
}
