import {isString} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';
import {isBoolean} from '../../../types/Boolean';

export interface TicketCommentDTO {
  readonly ticketCommentId: string;
  readonly ticketId: string;
  readonly ticketUserId: string;
  readonly updated: string;
  readonly created: string;
  readonly date: string;
  readonly subject: string;
  readonly description: string;
  readonly dataJson: string;
  readonly isPrivate: boolean;
  readonly onHold: boolean;
  readonly isTerminated: boolean;
  readonly isRead: boolean;
}

export function createTicketCommentDTO(
  ticketCommentId: string,
  ticketId: string,
  ticketUserId: string,
  updated: string,
  created: string,
  date: string,
  subject: string,
  description: string,
  dataJson: string,
  isPrivate: boolean,
  onHold: boolean,
  isTerminated: boolean,
  isRead: boolean,
): TicketCommentDTO {
  return {
    ticketCommentId,
    ticketId,
    ticketUserId,
    updated,
    created,
    date,
    subject,
    description,
    dataJson,
    isPrivate,
    onHold,
    isTerminated,
    isRead,
  };
}

export function isTicketCommentDTO(value: unknown): value is TicketCommentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'ticketCommentId',
      'ticketId',
      'ticketUserId',
      'updated',
      'created',
      'date',
      'subject',
      'description',
      'dataJson',
      'isPrivate',
      'onHold',
      'isTerminated',
      'isRead',
    ]) &&
    isString(objectKey(value, 'ticketCommentId')) &&
    isString(objectKey(value, 'ticketId')) &&
    isString(objectKey(value, 'ticketUserId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'date')) &&
    isString(objectKey(value, 'subject')) &&
    isString(objectKey(value, 'description')) &&
    isString(objectKey(value, 'dataJson')) &&
    isBoolean(objectKey(value, 'isPrivate')) &&
    isBoolean(objectKey(value, 'onHold')) &&
    isBoolean(objectKey(value, 'isTerminated')) &&
    isBoolean(objectKey(value, 'isRead'))
  );
}

export function stringifyTicketCommentDTO(value: TicketCommentDTO): string {
  return `TicketCommentDTO(${value})`;
}

export function parseTicketCommentDTO(
  value: unknown,
): TicketCommentDTO | undefined {
  if (isTicketCommentDTO(value)) return value;
  return undefined;
}
