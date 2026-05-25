import {
  explainSmsMessageDTO,
  isSmsMessageDTO,
  SmsMessageDTO,
} from './SmsMessageDTO';
import {explain, explainProperty} from '../types/explain';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../types/OtherKeys';
import {explainArrayOf, isArrayOf} from '../types/Array';

export interface SmsMessageListDTO {
  readonly payload: readonly SmsMessageDTO[];
}

export function createSmsMessageListDTO(
  payload: readonly SmsMessageDTO[],
): SmsMessageListDTO {
  return {
    payload,
  };
}

export function isSmsMessageListDTO(
  value: unknown,
): value is SmsMessageListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['payload']) &&
    isArrayOf<SmsMessageDTO>(objectKey(value, 'payload'), isSmsMessageDTO)
  );
}

export function explainSmsMessageListDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['payload']),
    explainProperty(
      'payload',
      explainArrayOf<SmsMessageDTO>(
        'SmsMessageDTO',
        explainSmsMessageDTO,
        objectKey(value, 'payload'),
        isSmsMessageDTO,
      ),
    ),
  ]);
}

export function stringifySmsMessageListDTO(value: SmsMessageListDTO): string {
  return `SmsMessageListDTO(${value})`;
}

export function parseSmsMessageListDTO(
  value: unknown,
): SmsMessageListDTO | undefined {
  if (isSmsMessageListDTO(value)) return value;
  return undefined;
}
