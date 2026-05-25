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

export interface NewTicketMemberDTO {
  readonly ticketId: string;
  readonly ticketUserId: string;
  readonly isTerminated: boolean;
}

export function createNewTicketMemberDTO(
  ticketId: string,
  ticketUserId: string,
  isTerminated: boolean,
): NewTicketMemberDTO {
  return {
    ticketId,
    ticketUserId,
    isTerminated,
  };
}

export function isNewTicketMemberDTO(
  value: unknown,
): value is NewTicketMemberDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'ticketId',
      'ticketUserId',
      'isTerminated',
    ]) &&
    isString(objectKey(value, 'ticketId')) &&
    isString(objectKey(value, 'ticketUserId')) &&
    isString(objectKey(value, 'isTerminated'))
  );
}

export function explainNewTicketMemberDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'ticketId',
      'ticketUserId',
      'isTerminated',
    ]),
    explainProperty('ticketId', explainString(objectKey(value, 'ticketId'))),
    explainProperty(
      'ticketUserId',
      explainString(objectKey(value, 'ticketUserId')),
    ),
    explainProperty(
      'isTerminated',
      explainString(objectKey(value, 'isTerminated')),
    ),
  ]);
}

export function stringifyNewTicketMemberDTO(value: NewTicketMemberDTO): string {
  return `NewTicketMemberDTO(${value})`;
}

export function parseNewTicketMemberDTO(
  value: unknown,
): NewTicketMemberDTO | undefined {
  if (isNewTicketMemberDTO(value)) return value;
  return undefined;
}
