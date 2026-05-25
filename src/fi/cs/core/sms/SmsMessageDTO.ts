import {explain, explainProperty} from '../types/explain';
import {explainString, isString} from '../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../types/OtherKeys';

export interface SmsMessageDTO {
  readonly to: string;
  readonly body: string;
}

export function createSmsMessageDTO(to: string, body: string): SmsMessageDTO {
  return {
    to,
    body,
  };
}

export function isSmsMessageDTO(value: unknown): value is SmsMessageDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['to', 'body']) &&
    isString(objectKey(value, 'to')) &&
    isString(objectKey(value, 'body'))
  );
}

export function explainSmsMessageDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['to', 'body']),
    explainProperty('to', explainString(objectKey(value, 'to'))),
    explainProperty('body', explainString(objectKey(value, 'body'))),
  ]);
}

export function stringifySmsMessageDTO(value: SmsMessageDTO): string {
  return `SmsMessageDTO(${value})`;
}

export function parseSmsMessageDTO(value: unknown): SmsMessageDTO | undefined {
  if (isSmsMessageDTO(value)) return value;
  return undefined;
}
