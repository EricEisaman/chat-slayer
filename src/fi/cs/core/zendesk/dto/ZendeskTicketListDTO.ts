import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {explain, explainProperty} from '../../types/explain';
import {
  explainZendeskTicket,
  isZendeskTicket,
  ZendeskTicket,
} from './ZendeskTicket';
import {
  explainStringOrNullOrUndefined,
  isStringOrNullOrUndefined,
} from '../../types/String';
import {explainBoolean, isBoolean} from '../../types/Boolean';
import {explainArrayOf, isArrayOf} from '../../types/Array';

export interface ZendeskTicketListDTO {
  readonly after_cursor?: string | null | undefined;
  readonly after_url?: string | null | undefined;
  readonly before_cursor?: string | null | undefined;
  readonly before_url?: string | null | undefined;
  readonly end_of_stream: boolean;
  readonly tickets: readonly ZendeskTicket[];
}

export function createZendeskTicketListDTO(
  after_cursor: string | null | undefined,
  after_url: string | null | undefined,
  before_cursor: string | null | undefined,
  before_url: string | null | undefined,
  end_of_stream: boolean,
  tickets: readonly ZendeskTicket[],
): ZendeskTicketListDTO {
  return {
    after_cursor,
    after_url,
    before_cursor,
    before_url,
    end_of_stream,
    tickets,
  };
}

export function isZendeskTicketListDTO(
  value: unknown,
): value is ZendeskTicketListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'after_cursor',
      'after_url',
      'before_cursor',
      'before_url',
      'end_of_stream',
      'tickets',
    ]) &&
    isStringOrNullOrUndefined(objectKey(value, 'after_cursor')) &&
    isStringOrNullOrUndefined(objectKey(value, 'after_url')) &&
    isStringOrNullOrUndefined(objectKey(value, 'before_cursor')) &&
    isStringOrNullOrUndefined(objectKey(value, 'before_url')) &&
    isBoolean(objectKey(value, 'end_of_stream')) &&
    isArrayOf<ZendeskTicket>(objectKey(value, 'tickets'), isZendeskTicket)
  );
}

export function explainZendeskTicketListDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'after_cursor',
      'after_url',
      'before_cursor',
      'before_url',
      'end_of_stream',
      'tickets',
    ]),
    explainProperty(
      'after_cursor',
      explainStringOrNullOrUndefined(objectKey(value, 'after_cursor')),
    ),
    explainProperty(
      'after_url',
      explainStringOrNullOrUndefined(objectKey(value, 'after_url')),
    ),
    explainProperty(
      'before_cursor',
      explainStringOrNullOrUndefined(objectKey(value, 'before_cursor')),
    ),
    explainProperty(
      'before_url',
      explainStringOrNullOrUndefined(objectKey(value, 'before_url')),
    ),
    explainProperty(
      'end_of_stream',
      explainBoolean(objectKey(value, 'end_of_stream')),
    ),
    explainProperty(
      'tickets',
      explainArrayOf<ZendeskTicket>(
        'ZendeskTicketDTO',
        explainZendeskTicket,
        objectKey(value, 'tickets'),
        isZendeskTicket,
      ),
    ),
  ]);
}

export function stringifyZendeskTicketListDTO(
  value: ZendeskTicketListDTO,
): string {
  return `ZendeskTicketListDTO(${value})`;
}

export function parseZendeskTicketListDTO(
  value: unknown,
): ZendeskTicketListDTO | undefined {
  if (isZendeskTicketListDTO(value)) return value;
  return undefined;
}
