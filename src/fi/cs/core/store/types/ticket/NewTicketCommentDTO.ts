import {isString} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';
import {isBoolean} from '../../../types/Boolean';

export interface NewTicketCommentDTO {
  readonly ticketId?: string;
  readonly ticketUserId?: string;
  readonly date?: string;
  readonly subject?: string;
  readonly description?: string;
  readonly dataJson?: string;
  readonly isPrivate?: boolean;
  readonly onHold?: boolean;
  readonly isTerminated?: boolean;
  readonly isRead?: boolean;
}

export function createNewTicketCommentDTO(
  ticketId: string,
  ticketUserId: string,
  date: string,
  subject: string,
  description: string,
  dataJson: string,
  isPrivate: boolean,
  onHold: boolean,
  isTerminated: boolean,
  isRead: boolean,
): NewTicketCommentDTO {
  return {
    ticketId,
    ticketUserId,
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

export function isNewTicketCommentDTO(
  value: unknown,
): value is NewTicketCommentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'ticketId',
      'ticketUserId',
      'date',
      'subject',
      'description',
      'dataJson',
      'isPrivate',
      'onHold',
      'isTerminated',
      'isRead',
    ]) &&
    isString(objectKey(value, 'ticketId')) &&
    isString(objectKey(value, 'ticketUserId')) &&
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

export function stringifyNewTicketCommentDTO(
  value: NewTicketCommentDTO,
): string {
  return `NewTicketCommentDTO(${value})`;
}

export function parseNewTicketCommentDTO(
  value: unknown,
): NewTicketCommentDTO | undefined {
  if (isNewTicketCommentDTO(value)) return value;
  return undefined;
}
