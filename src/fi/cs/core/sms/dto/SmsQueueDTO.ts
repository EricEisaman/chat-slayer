import {isBoolean} from '../../types/Boolean';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {explainString, explainStringOrNull, isString} from '../../types/String';
import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../types/explain';
import {isUndefined} from '../../types/undefined';

/**
 * SMS Queue DTO
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/accounts
 *
 */
export interface SmsQueueDTO {
  readonly smsQueueId: string;
  readonly invoiceId: string;
  readonly clientId: string;
  readonly updated: string;
  readonly created: string;
  readonly senderAddress: string;
  readonly targetAddress: string;
  readonly message: string;
  readonly sent: boolean;
  readonly failed: boolean;
  readonly isTerminated: boolean;
}

export function createSmsQueueDTO(
  smsQueueId: string,
  invoiceId: string,
  clientId: string,
  updated: string,
  created: string,
  senderAddress: string,
  targetAddress: string,
  message: string,
  sent: boolean,
  failed: boolean,
  isTerminated: boolean,
): SmsQueueDTO {
  return {
    smsQueueId,
    invoiceId,
    clientId,
    updated,
    created,
    senderAddress,
    targetAddress,
    message,
    sent,
    failed,
    isTerminated,
  };
}

export function isSmsQueueDTO(value: unknown): value is SmsQueueDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'smsQueueId',
      'invoiceId',
      'clientId',
      'updated',
      'created',
      'senderAddress',
      'targetAddress',
      'message',
      'sent',
      'failed',
      'isTerminated',
    ]) &&
    isString(objectKey(value, 'smsQueueId')) &&
    isString(objectKey(value, 'invoiceId')) &&
    isString(objectKey(value, 'clientId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'senderAddress')) &&
    isString(objectKey(value, 'targetAddress')) &&
    isString(objectKey(value, 'message')) &&
    isBoolean(objectKey(value, 'sent')) &&
    isBoolean(objectKey(value, 'failed')) &&
    isBoolean(objectKey(value, 'isTerminated'))
  );
}

export function explainSmsQueueDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'smsQueueId',
      'invoiceId',
      'clientId',
      'updated',
      'created',
      'senderAddress',
      'targetAddress',
      'message',
      'sent',
      'failed',
      'isTerminated',
    ]),
    explainProperty(
      'smsQueueId',
      explainString(objectKey(value, 'smsQueueId')),
    ),
    explainProperty('invoiceId', explainString(objectKey(value, 'invoiceId'))),
    explainProperty('clientId', explainString(objectKey(value, 'clientId'))),
    explainProperty(
      'updated',
      explainStringOrNull(objectKey(value, 'updated')),
    ),
    explainProperty(
      'created',
      explainStringOrNull(objectKey(value, 'created')),
    ),
    explainProperty(
      'senderAddress',
      explainString(objectKey(value, 'senderAddress')),
    ),
    explainProperty(
      'targetAddress',
      explainString(objectKey(value, 'targetAddress')),
    ),
    explainProperty('message', explainString(objectKey(value, 'message'))),
    explainProperty('sent', explainStringOrNull(objectKey(value, 'sent'))),
    explainProperty('failed', explainStringOrNull(objectKey(value, 'failed'))),
    explainProperty(
      'isTerminated',
      explainString(objectKey(value, 'isTerminated')),
    ),
  ]);
}

export function parseSmsQueueDTO(value: unknown): SmsQueueDTO | undefined {
  if (isSmsQueueDTO(value)) return value;
  return undefined;
}

export function isSmsQueueDTOOrUndefined(
  value: unknown,
): value is SmsQueueDTO | undefined {
  return isUndefined(value) || isSmsQueueDTO(value);
}

export function explainSmsQueueDTOOrUndefined(value: unknown): string {
  return isSmsQueueDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['SmsQueueDTO', 'undefined']));
}
