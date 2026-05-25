import {
  explainZendeskSuspendedTicket,
  isZendeskSuspendedTicket,
  ZendeskSuspendedTicket,
} from './ZendeskSuspendedTicket';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explain, explainProperty} from '../../types/explain';

export interface ZendeskSuspendedTicketDTO {
  readonly suspended_ticket: ZendeskSuspendedTicket;
}

export function createZendeskSuspendedTicketDTO(
  suspended_ticket: ZendeskSuspendedTicket,
): ZendeskSuspendedTicketDTO {
  return {
    suspended_ticket,
  };
}

export function isZendeskSuspendedTicketDTO(
  value: unknown,
): value is ZendeskSuspendedTicketDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['suspended_ticket']) &&
    isZendeskSuspendedTicket(objectKey(value, 'suspended_ticket'))
  );
}

export function explainZendeskSuspendedTicketDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['suspended_ticket']),
    explainProperty(
      'suspended_ticket',
      explainZendeskSuspendedTicket(objectKey(value, 'suspended_ticket')),
    ),
  ]);
}

export function stringifyZendeskSuspendedTicketDTO(
  value: ZendeskSuspendedTicketDTO,
): string {
  return `ZendeskSuspendedTicketDTO(${value})`;
}

export function parseZendeskSuspendedTicketDTO(
  value: unknown,
): ZendeskSuspendedTicketDTO | undefined {
  if (isZendeskSuspendedTicketDTO(value)) return value;
  return undefined;
}
