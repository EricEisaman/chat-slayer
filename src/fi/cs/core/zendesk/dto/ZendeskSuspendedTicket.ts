import {
  explainZendeskAttachment,
  isZendeskAttachment,
  ZendeskAttachment,
} from './ZendeskAttachment';
import {
  explainZendeskViaOrNullOrUndefined,
  isZendeskViaOrNullOrUndefined,
  ZendeskVia,
} from './ZendeskVia';
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
  explainZendeskAuthorOrNullOrUndefined,
  isZendeskAuthorOrNullOrUndefined,
  ZendeskAuthor,
} from './ZendeskAuthor';
import {
  explainArrayOfOrUndefined,
  isArrayOfOrUndefined,
} from '../../types/Array';
import {
  explainNumber,
  explainNumberOrNullOrUndefined,
  isNumber,
  isNumberOrNullOrUndefined,
} from '../../types/Number';
import {
  explainStringOrNullOrUndefined,
  isStringOrNullOrUndefined,
} from '../../types/String';
import {
  explainStringArrayOrNullOrUndefined,
  isStringArrayOrNullOrUndefined,
} from '../../types/StringArray';

export interface ZendeskSuspendedTicket {
  readonly attachments?: readonly ZendeskAttachment[];
  readonly author?: ZendeskAuthor | null | undefined;
  readonly brand_id?: number | null | undefined;
  readonly cause?: string | null | undefined;
  readonly cause_id?: number | null | undefined;
  readonly content?: string | null | undefined;
  readonly created_at?: string | null | undefined;
  readonly error_messages?: readonly string[] | null | undefined;
  readonly id: number;
  readonly message_id?: string | null | undefined;
  readonly recipient?: string | null | undefined;
  readonly subject?: string | null | undefined;
  readonly ticket_id?: number | null | undefined;
  readonly updated_at?: string | null | undefined;
  readonly url?: string | null | undefined;
  readonly via?: ZendeskVia | null | undefined;
}

export function isZendeskSuspendedTicket(
  value: unknown,
): value is ZendeskSuspendedTicket {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'attachments',
      'author',
      'brand_id',
      'cause',
      'cause_id',
      'content',
      'created_at',
      'error_messages',
      'id',
      'message_id',
      'recipient',
      'subject',
      'ticket_id',
      'updated_at',
      'url',
      'via',
    ]) &&
    isArrayOfOrUndefined<ZendeskAttachment>(
      objectKey(value, 'attachments'),
      isZendeskAttachment,
    ) &&
    isZendeskAuthorOrNullOrUndefined(objectKey(value, 'author')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'brand_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'cause')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'cause_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'content')) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isStringArrayOrNullOrUndefined(objectKey(value, 'error_messages')) &&
    isNumber(objectKey(value, 'id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'message_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'recipient')) &&
    isStringOrNullOrUndefined(objectKey(value, 'subject')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'ticket_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'updated_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'url')) &&
    isZendeskViaOrNullOrUndefined(objectKey(value, 'via'))
  );
}

export function explainZendeskSuspendedTicket(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'attachments',
      'author',
      'brand_id',
      'cause',
      'cause_id',
      'content',
      'created_at',
      'error_messages',
      'id',
      'message_id',
      'recipient',
      'subject',
      'ticket_id',
      'updated_at',
      'url',
      'via',
    ]),
    explainProperty(
      'attachments',
      explainArrayOfOrUndefined<ZendeskAttachment>(
        'ZendeskAttachment',
        explainZendeskAttachment,
        objectKey(value, 'attachments'),
        isZendeskAttachment,
      ),
    ),
    explainProperty(
      'author',
      explainZendeskAuthorOrNullOrUndefined(objectKey(value, 'author')),
    ),
    explainProperty(
      'brand_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'brand_id')),
    ),
    explainProperty(
      'cause',
      explainStringOrNullOrUndefined(objectKey(value, 'cause')),
    ),
    explainProperty(
      'cause_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'cause_id')),
    ),
    explainProperty(
      'content',
      explainStringOrNullOrUndefined(objectKey(value, 'content')),
    ),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'error_messages',
      explainStringArrayOrNullOrUndefined(objectKey(value, 'error_messages')),
    ),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'message_id',
      explainStringOrNullOrUndefined(objectKey(value, 'message_id')),
    ),
    explainProperty(
      'recipient',
      explainStringOrNullOrUndefined(objectKey(value, 'recipient')),
    ),
    explainProperty(
      'subject',
      explainStringOrNullOrUndefined(objectKey(value, 'subject')),
    ),
    explainProperty(
      'ticket_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'ticket_id')),
    ),
    explainProperty(
      'updated_at',
      explainStringOrNullOrUndefined(objectKey(value, 'updated_at')),
    ),
    explainProperty(
      'url',
      explainStringOrNullOrUndefined(objectKey(value, 'url')),
    ),
    explainProperty(
      'via',
      explainZendeskViaOrNullOrUndefined(objectKey(value, 'via')),
    ),
  ]);
}

export function stringifyZendeskSuspendedTicket(
  value: ZendeskSuspendedTicket,
): string {
  return `ZendeskSuspendedTicket(${value})`;
}

export function parseZendeskSuspendedTicket(
  value: unknown,
): ZendeskSuspendedTicket | undefined {
  if (isZendeskSuspendedTicket(value)) return value;
  return undefined;
}
