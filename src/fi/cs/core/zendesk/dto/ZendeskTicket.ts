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
  explainZendeskSatisfactionRatingOrNullOrUndefined,
  isZendeskSatisfactionRatingOrNullOrUndefined,
  ZendeskSatisfactionRating,
} from './ZendeskSatisfactionRating';
import {
  explainZendeskViaOrNullOrUndefined,
  isZendeskViaOrNullOrUndefined,
  ZendeskVia,
} from './ZendeskVia';
import {
  explainNumberOrNullOrUndefined,
  isNumberOrNullOrUndefined,
} from '../../types/Number';
import {
  explainStringOrNullOrUndefined,
  isStringOrNullOrUndefined,
} from '../../types/String';
import {
  explainBooleanOrUndefined,
  isBooleanOrNullOrUndefined,
} from '../../types/Boolean';
import {
  explainStringArrayOrUndefined,
  isStringArrayOrUndefined,
} from '../../types/StringArray';
import {
  explainArrayOfOrUndefined,
  isArrayOfOrUndefined,
} from '../../types/Array';
import {
  explainNumberArrayOrUndefined,
  isNumberArrayOrUndefined,
} from '../../types/NumberArray';
import {
  explainReadonlyJsonObject,
  isReadonlyJsonObject,
  ReadonlyJsonObject,
} from '../../Json';

export interface ZendeskTicket {
  readonly allow_attachments?: boolean | null | undefined;
  readonly allow_channelback?: boolean | null | undefined;
  readonly assignee_email?: string | null | undefined;
  readonly assignee_id?: number | null | undefined;
  readonly attribute_value_ids?: readonly number[];
  readonly brand_id?: number | null | undefined;
  readonly collaborator_ids?: readonly number[];
  readonly created_at?: string | null | undefined;
  readonly custom_fields?: readonly ReadonlyJsonObject[];
  readonly fields?: readonly ReadonlyJsonObject[];
  readonly custom_status_id?: number | null | undefined;
  readonly description?: string | null | undefined;
  readonly due_at?: string | null | undefined;
  readonly email_cc_ids?: readonly string[];
  readonly external_id?: string | null | undefined;
  readonly follower_ids?: readonly number[];
  readonly followup_ids?: readonly number[];
  readonly forum_topic_id?: number | null | undefined;
  readonly from_messaging_channel?: boolean | null | undefined;
  readonly group_id?: number | null | undefined;
  readonly has_incidents?: boolean | null | undefined;
  readonly id: number | null | undefined;
  readonly is_public?: boolean | null | undefined;
  readonly organization_id?: number | null | undefined;
  readonly priority?: string | null | undefined;
  readonly problem_id?: number | null | undefined;
  readonly raw_subject?: string | null | undefined;
  readonly recipient?: string | null | undefined;
  readonly requester_id: number | null | undefined;
  readonly satisfaction_rating?: ZendeskSatisfactionRating | null | undefined;
  readonly sharing_agreement_ids?: readonly number[];
  readonly status?: string | null | undefined;
  readonly subject?: string | null | undefined;
  readonly submitter_id?: number | null | undefined;
  readonly tags?: readonly string[];
  readonly type?: string | null | undefined;
  readonly updated_at?: string | null | undefined;
  readonly url?: string | null | undefined;
  readonly via?: ZendeskVia | null | undefined;
  readonly generated_timestamp?: number | null | undefined;
}

export function isZendeskTicket(value: unknown): value is ZendeskTicket {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'allow_attachments',
      'allow_channelback',
      'assignee_id',
      'attribute_value_ids',
      'collaborator_ids',
      'created_at',
      'custom_fields',
      'fields',
      'description',
      'due_at',
      'external_id',
      'follower_ids',
      'followup_ids',
      'from_messaging_channel',
      'brand_id',
      'group_id',
      'problem_id',
      'forum_topic_id',
      'custom_status_id',
      'has_incidents',
      'id',
      'organization_id',
      'priority',
      'raw_subject',
      'recipient',
      'requester_id',
      'satisfaction_rating',
      'sharing_agreement_ids',
      'status',
      'subject',
      'submitter_id',
      'tags',
      'email_cc_ids',
      'type',
      'updated_at',
      'url',
      'generated_timestamp',
      'via',
    ]) &&
    isNumberOrNullOrUndefined(objectKey(value, 'assignee_id')) &&
    isNumberArrayOrUndefined(objectKey(value, 'attribute_value_ids')) &&
    isNumberArrayOrUndefined(objectKey(value, 'collaborator_ids')) &&
    isStringOrNullOrUndefined(objectKey(value, 'created_at')) &&
    isArrayOfOrUndefined<ReadonlyJsonObject>(
      objectKey(value, 'custom_fields'),
      isReadonlyJsonObject,
    ) &&
    isArrayOfOrUndefined<ReadonlyJsonObject>(
      objectKey(value, 'fields'),
      isReadonlyJsonObject,
    ) &&
    isStringOrNullOrUndefined(objectKey(value, 'description')) &&
    isStringOrNullOrUndefined(objectKey(value, 'due_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'external_id')) &&
    isNumberArrayOrUndefined(objectKey(value, 'follower_ids')) &&
    isNumberArrayOrUndefined(objectKey(value, 'followup_ids')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'from_messaging_channel')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'allow_attachments')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'allow_channelback')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'brand_id')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'group_id')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'problem_id')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'forum_topic_id')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'custom_status_id')) &&
    isBooleanOrNullOrUndefined(objectKey(value, 'has_incidents')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'id')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'organization_id')) &&
    isStringOrNullOrUndefined(objectKey(value, 'priority')) &&
    isStringOrNullOrUndefined(objectKey(value, 'raw_subject')) &&
    isStringOrNullOrUndefined(objectKey(value, 'recipient')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'requester_id')) &&
    isZendeskSatisfactionRatingOrNullOrUndefined(
      objectKey(value, 'satisfaction_rating'),
    ) &&
    isNumberArrayOrUndefined(objectKey(value, 'sharing_agreement_ids')) &&
    isStringOrNullOrUndefined(objectKey(value, 'status')) &&
    isStringOrNullOrUndefined(objectKey(value, 'subject')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'submitter_id')) &&
    isStringArrayOrUndefined(objectKey(value, 'tags')) &&
    isStringArrayOrUndefined(objectKey(value, 'email_cc_ids')) &&
    isStringOrNullOrUndefined(objectKey(value, 'type')) &&
    isStringOrNullOrUndefined(objectKey(value, 'updated_at')) &&
    isStringOrNullOrUndefined(objectKey(value, 'url')) &&
    isZendeskViaOrNullOrUndefined(objectKey(value, 'via')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'generated_timestamp'))
  );
}

export function explainZendeskTicket(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'allow_attachments',
      'allow_channelback',
      'assignee_id',
      'attribute_value_ids',
      'collaborator_ids',
      'created_at',
      'custom_fields',
      'fields',
      'description',
      'due_at',
      'external_id',
      'follower_ids',
      'followup_ids',
      'from_messaging_channel',
      'brand_id',
      'group_id',
      'problem_id',
      'forum_topic_id',
      'custom_status_id',
      'has_incidents',
      'id',
      'organization_id',
      'priority',
      'raw_subject',
      'recipient',
      'requester_id',
      'satisfaction_rating',
      'sharing_agreement_ids',
      'status',
      'subject',
      'submitter_id',
      'tags',
      'email_cc_ids',
      'type',
      'updated_at',
      'url',
      'generated_timestamp',
      'via',
    ]),
    explainProperty(
      'assignee_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'assignee_id')),
    ),
    explainProperty(
      'attribute_value_ids',
      explainNumberArrayOrUndefined(objectKey(value, 'attribute_value_ids')),
    ),
    explainProperty(
      'collaborator_ids',
      explainNumberArrayOrUndefined(objectKey(value, 'collaborator_ids')),
    ),
    explainProperty(
      'created_at',
      explainStringOrNullOrUndefined(objectKey(value, 'created_at')),
    ),
    explainProperty(
      'custom_fields',
      explainArrayOfOrUndefined<ReadonlyJsonObject>(
        'ReadonlyJsonObject',
        explainReadonlyJsonObject,
        objectKey(value, 'custom_fields'),
        isReadonlyJsonObject,
      ),
    ),
    explainProperty(
      'fields',
      explainArrayOfOrUndefined<ReadonlyJsonObject>(
        'ReadonlyJsonObject',
        explainReadonlyJsonObject,
        objectKey(value, 'fields'),
        isReadonlyJsonObject,
      ),
    ),
    explainProperty(
      'description',
      explainStringOrNullOrUndefined(objectKey(value, 'description')),
    ),
    explainProperty(
      'due_at',
      explainStringOrNullOrUndefined(objectKey(value, 'due_at')),
    ),
    explainProperty(
      'external_id',
      explainStringOrNullOrUndefined(objectKey(value, 'external_id')),
    ),
    explainProperty(
      'follower_ids',
      explainNumberArrayOrUndefined(objectKey(value, 'follower_ids')),
    ),
    explainProperty(
      'followup_ids',
      explainNumberArrayOrUndefined(objectKey(value, 'followup_ids')),
    ),
    explainProperty(
      'from_messaging_channel',
      explainBooleanOrUndefined(objectKey(value, 'from_messaging_channel')),
    ),
    explainProperty(
      'allow_attachments',
      explainBooleanOrUndefined(objectKey(value, 'allow_attachments')),
    ),
    explainProperty(
      'allow_channelback',
      explainBooleanOrUndefined(objectKey(value, 'allow_channelback')),
    ),
    explainProperty(
      'brand_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'brand_id')),
    ),
    explainProperty(
      'group_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'group_id')),
    ),
    explainProperty(
      'problem_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'problem_id')),
    ),
    explainProperty(
      'forum_topic_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'forum_topic_id')),
    ),
    explainProperty(
      'custom_status_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'custom_status_id')),
    ),
    explainProperty(
      'generated_timestamp',
      explainNumberOrNullOrUndefined(objectKey(value, 'generated_timestamp')),
    ),
    explainProperty(
      'has_incidents',
      explainBooleanOrUndefined(objectKey(value, 'has_incidents')),
    ),
    explainProperty(
      'id',
      explainNumberOrNullOrUndefined(objectKey(value, 'id')),
    ),
    explainProperty(
      'organization_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'organization_id')),
    ),
    explainProperty(
      'priority',
      explainStringOrNullOrUndefined(objectKey(value, 'priority')),
    ),
    explainProperty(
      'raw_subject',
      explainStringOrNullOrUndefined(objectKey(value, 'raw_subject')),
    ),
    explainProperty(
      'recipient',
      explainStringOrNullOrUndefined(objectKey(value, 'recipient')),
    ),
    explainProperty(
      'requester_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'requester_id')),
    ),
    explainProperty(
      'satisfaction_rating',
      explainZendeskSatisfactionRatingOrNullOrUndefined(
        objectKey(value, 'satisfaction_rating'),
      ),
    ),
    explainProperty(
      'sharing_agreement_ids',
      explainNumberArrayOrUndefined(objectKey(value, 'sharing_agreement_ids')),
    ),
    explainProperty(
      'status',
      explainStringOrNullOrUndefined(objectKey(value, 'status')),
    ),
    explainProperty(
      'subject',
      explainStringOrNullOrUndefined(objectKey(value, 'subject')),
    ),
    explainProperty(
      'submitter_id',
      explainNumberOrNullOrUndefined(objectKey(value, 'submitter_id')),
    ),
    explainProperty(
      'tags',
      explainStringArrayOrUndefined(objectKey(value, 'tags')),
    ),
    explainProperty(
      'email_cc_ids',
      explainStringArrayOrUndefined(objectKey(value, 'email_cc_ids')),
    ),
    explainProperty(
      'type',
      explainStringOrNullOrUndefined(objectKey(value, 'type')),
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

export function stringifyZendeskTicket(value: ZendeskTicket): string {
  return `ZendeskTicketDTO(${value})`;
}

export function parseZendeskTicket(value: unknown): ZendeskTicket | undefined {
  if (isZendeskTicket(value)) return value;
  return undefined;
}
