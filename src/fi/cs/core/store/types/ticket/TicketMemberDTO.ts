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
import {explainBoolean, isBoolean} from '../../../types/Boolean';

export interface TicketMemberDTO {
  readonly ticketMemberId: string;
  readonly ticketId: string;
  readonly ticketUserId: string;
  readonly updated: string;
  readonly created: string;
  readonly isTerminated: boolean;
}

export function createTicketMemberDTO(
  ticketMemberId: string,
  ticketId: string,
  ticketUserId: string,
  updated: string,
  created: string,
  isTerminated: boolean,
): TicketMemberDTO {
  return {
    ticketMemberId,
    ticketId,
    ticketUserId,
    updated,
    created,
    isTerminated,
  };
}

export function isTicketMemberDTO(value: unknown): value is TicketMemberDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'ticketMemberId',
      'ticketId',
      'ticketUserId',
      'updated',
      'created',
      'isTerminated',
    ]) &&
    isString(objectKey(value, 'ticketMemberId')) &&
    isString(objectKey(value, 'ticketId')) &&
    isString(objectKey(value, 'ticketUserId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isBoolean(objectKey(value, 'isTerminated'))
  );
}

export function explainTicketMemberDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'ticketMemberId',
      'ticketId',
      'ticketUserId',
      'updated',
      'created',
      'isTerminated',
    ]),
    explainProperty(
      'ticketMemberId',
      explainString(objectKey(value, 'ticketMemberId')),
    ),
    explainProperty('ticketId', explainString(objectKey(value, 'ticketId'))),
    explainProperty(
      'ticketUserId',
      explainString(objectKey(value, 'ticketUserId')),
    ),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty('created', explainString(objectKey(value, 'created'))),
    explainProperty(
      'isTerminated',
      explainBoolean(objectKey(value, 'isTerminated')),
    ),
  ]);
}

export function stringifyTicketMemberDTO(value: TicketMemberDTO): string {
  return `TicketMemberDTO(${value})`;
}

export function parseTicketMemberDTO(
  value: unknown,
): TicketMemberDTO | undefined {
  if (isTicketMemberDTO(value)) return value;
  return undefined;
}
