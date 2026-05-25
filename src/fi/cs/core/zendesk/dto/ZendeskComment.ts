import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explain, explainProperty} from '../../types/explain';
import {
  explainZendeskAttachment,
  isZendeskAttachment,
  ZendeskAttachment,
} from './ZendeskAttachment';
import {
  explainReadonlyJsonObjectOrNullOrUndefined,
  isReadonlyJsonObjectOrNullOrUndefined,
  ReadonlyJsonObject,
} from '../../Json';
import {
  explainZendeskViaOrNullOrUndefined,
  isZendeskViaOrNullOrUndefined,
  ZendeskVia,
} from './ZendeskVia';
import {
  explainStringOrNullOrUndefined,
  isStringOrNullOrUndefined,
} from '../../types/String';
import {
  explainArrayOf,
  explainArrayOfOrUndefined,
  isArrayOf,
  isArrayOfOrUndefined,
} from '../../types/Array';
import {
  explainNumber,
  explainNumberOrNullOrUndefined,
  isNumber,
  isNumberOrNullOrUndefined,
} from '../../types/Number';
import {
  explainBooleanOrNullOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';

export interface ZendeskComment {
  readonly attachments: readonly ZendeskAttachment[];
  readonly audit_id?: number | null | undefined;
  readonly author_id?: number | null | undefined;
  readonly body?: string | null | undefined;
  readonly created_at?: string | null | undefined;
  readonly html_body?: string | null | undefined;
  readonly id: number;
  readonly metadata?: ReadonlyJsonObject | null | undefined;
  readonly plain_body?: string | null | undefined;
  readonly public?: boolean | null | undefined;
  readonly type?: string | null | undefined;
  readonly uploads?: readonly ZendeskAttachment[];
  readonly via?: ZendeskVia | null | undefined;
}

export function createZendeskComment(
  id: number,
  attachments: readonly ZendeskAttachment[],
  audit_id?: number | null | undefined,
  author_id?: number | null | undefined,
  body?: string | null | undefined,
  created_at?: string | null | undefined,
  html_body?: string | null | undefined,
  metadata?: ReadonlyJsonObject | null | undefined,
  plain_body?: string | null | undefined,
  isPublic?: boolean | null | undefined,
  type?: string | null | undefined,
  uploads?: readonly ZendeskAttachment[],
  via?: ZendeskVia | null | undefined,
): ZendeskComment {
  return {
    id,
    attachments,
    audit_id,
    author_id,
    body,
    created_at,
    html_body,
    metadata,
    plain_body,
    public: isPublic,
    type,
    uploads,
    via,
  };
}

export function isZendeskComment(value: unknown): value is ZendeskComment {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'id',
      'attachments',
      'audit_id',
      'author_id',
      'body',
      'created_at',
      'html_body',
      'metadata',
      'plain_body',
      'public',
      'type',
      'uploads',
      'via',
    ]) &&
    isNumber(objectKey(value, 'id')) &&
    isArrayOf<ZendeskAttachment>(
      objectKey(value, 'attachments'),
      isZendeskAttachment,
    ) &&
    isNumberOrNullOrUndefined(objectKey(value, 'audit_id')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'author_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'body')) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'html_body')) &&
    isReadonlyJsonObjectOrNullOrUndefined(objectKey(value, 'metadata')) &&
    isStringOrNullOrUndefined(objectKey(value, 'plain_body')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'public')) &&
    isStringOrNullOrUndefined(objectKey(value, 'type')) &&
    isArrayOfOrUndefined<ZendeskAttachment>(
      objectKey(value, 'uploads'),
      isZendeskAttachment,
    ) &&
    isZendeskViaOrNullOrUndefined(objectKey(value, 'via'))
  );
}

export function explainZendeskComment(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'id',
      'attachments',
      'audit_id',
      'author_id',
      'body',
      'created_at',
      'html_body',
      'metadata',
      'plain_body',
      'public',
      'type',
      'uploads',
      'via',
    ]),
    explainProperty('id', explainNumber(objectKey(value, 'id'))),
    explainProperty(
      'attachments',
      explainArrayOf<ZendeskAttachment>(
        'ZendeskAttachment',
        explainZendeskAttachment,
        objectKey(value, 'attachments'),
        isZendeskAttachment,
      ),
    ),
    explainProperty(
      'uploads',
      explainArrayOfOrUndefined<ZendeskAttachment>(
        'ZendeskAttachment',
        explainZendeskAttachment,
        objectKey(value, 'uploads'),
        isZendeskAttachment,
      ),
    ),
    explainProperty(
      'audit_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'audit_id')),
    ),
    explainProperty(
      'author_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'author_id')),
    ),
    explainProperty(
      'body',
      explainStringOrNullOrUndefined(objectKey(value, 'body')),
    ),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'html_body',
      explainStringOrNullOrUndefined(objectKey(value, 'html_body')),
    ),
    explainProperty(
      'metadata',
      explainReadonlyJsonObjectOrNullOrUndefined(objectKey(value, 'metadata')),
    ),
    explainProperty(
      'plain_body',
      explainStringOrNullOrUndefined(objectKey(value, 'plain_body')),
    ),
    explainProperty(
      'public',
      explainBooleanOrNullOrUndefined(objectKey(value, 'public')),
    ),
    explainProperty(
      'type',
      explainStringOrNullOrUndefined(objectKey(value, 'type')),
    ),
    explainProperty(
      'via',
      explainZendeskViaOrNullOrUndefined(objectKey(value, 'via')),
    ),
  ]);
}

export function stringifyZendeskComment(value: ZendeskComment): string {
  return `ZendeskComment(${value})`;
}

export function parseZendeskComment(
  value: unknown,
): ZendeskComment | undefined {
  if (isZendeskComment(value)) return value;
  return undefined;
}
