import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explain, explainProperty} from '../../../types/explain';
import {explainString, isString} from '../../../types/String';

export interface TicketCommentReadDTO {
  readonly ticketCommentReadId: string;
  readonly ticketCommentId: string;
  readonly ticketUserId: string;
  readonly updated: string;
  readonly created: string;
}

export function createTicketCommentReadDTO(
  ticketCommentReadId: string,
  ticketCommentId: string,
  ticketUserId: string,
  updated: string,
  created: string,
): TicketCommentReadDTO {
  return {
    ticketCommentReadId,
    ticketCommentId,
    ticketUserId,
    updated,
    created,
  };
}

export function isTicketCommentReadDTO(
  value: unknown,
): value is TicketCommentReadDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'ticketCommentReadId',
      'ticketCommentId',
      'ticketUserId',
      'updated',
      'created',
    ]) &&
    isString(objectKey(value, 'ticketCommentReadId')) &&
    isString(objectKey(value, 'ticketCommentId')) &&
    isString(objectKey(value, 'ticketUserId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created'))
  );
}

export function explainTicketCommentReadDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'ticketCommentReadId',
      'ticketCommentId',
      'ticketUserId',
      'updated',
      'created',
    ]),
    explainProperty(
      'ticketCommentReadId',
      explainString(objectKey(value, 'ticketCommentReadId')),
    ),
    explainProperty(
      'ticketCommentId',
      explainString(objectKey(value, 'ticketCommentId')),
    ),
    explainProperty(
      'ticketUserId',
      explainString(objectKey(value, 'ticketUserId')),
    ),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty('created', explainString(objectKey(value, 'created'))),
  ]);
}

export function stringifyTicketCommentReadDTO(
  value: TicketCommentReadDTO,
): string {
  return `TicketReadDTO(${value})`;
}

export function parseTicketCommentReadDTO(
  value: unknown,
): TicketCommentReadDTO | undefined {
  if (isTicketCommentReadDTO(value)) return value;
  return undefined;
}
