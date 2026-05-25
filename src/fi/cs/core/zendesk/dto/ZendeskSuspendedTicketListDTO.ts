import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explainZendeskMeta, isZendeskMeta, ZendeskMeta} from './ZendeskMeta';
import {explain, explainProperty} from '../../types/explain';
import {
  explainZendeskLinks,
  isZendeskLinks,
  ZendeskLinks,
} from './ZendeskLinks';
import {explainArrayOf, isArrayOf} from '../../types/Array';
import {
  explainZendeskSuspendedTicket,
  isZendeskSuspendedTicket,
  ZendeskSuspendedTicket,
} from './ZendeskSuspendedTicket';

export interface ZendeskSuspendedTicketListDTO {
  readonly suspended_tickets: readonly ZendeskSuspendedTicket[];
  readonly meta: ZendeskMeta;
  readonly links: ZendeskLinks;
}

export function createZendeskSuspendedTicketListDTO(
  suspended_tickets: readonly ZendeskSuspendedTicket[],
  meta: ZendeskMeta,
  links: ZendeskLinks,
): ZendeskSuspendedTicketListDTO {
  return {
    suspended_tickets,
    meta,
    links,
  };
}

export function isZendeskSuspendedTicketListDTO(
  value: unknown,
): value is ZendeskSuspendedTicketListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'suspended_tickets',
      'meta',
      'links',
    ]) &&
    isArrayOf<ZendeskSuspendedTicket>(
      objectKey(value, 'suspended_tickets'),
      isZendeskSuspendedTicket,
    ) &&
    isZendeskMeta(objectKey(value, 'meta')) &&
    isZendeskLinks(objectKey(value, 'links'))
  );
}

export function explainZendeskSuspendedTicketListDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'suspended_tickets',
      'meta',
      'links',
    ]),
    explainProperty(
      'suspended_tickets',
      explainArrayOf<ZendeskSuspendedTicket>(
        'ZendeskSuspendedTicket',
        explainZendeskSuspendedTicket,
        objectKey(value, 'suspended_tickets'),
        isZendeskSuspendedTicket,
      ),
    ),
    explainProperty('meta', explainZendeskMeta(objectKey(value, 'meta'))),
    explainProperty('links', explainZendeskLinks(objectKey(value, 'links'))),
  ]);
}

export function stringifyZendeskSuspendedTicketListDTO(
  value: ZendeskSuspendedTicketListDTO,
): string {
  return `ZendeskSuspendedTicketListDTO(${value})`;
}

export function parseZendeskSuspendedTicketListDTO(
  value: unknown,
): ZendeskSuspendedTicketListDTO | undefined {
  if (isZendeskSuspendedTicketListDTO(value)) return value;
  return undefined;
}
