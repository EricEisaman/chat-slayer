import {
  explainJokerStringObject,
  isJokerStringObject,
  JokerStringObject,
} from './JokerStringObject';
import {explain, explainProperty} from '../../../../types/explain';
import {explainString, isString} from '../../../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../../types/OtherKeys';

export interface JokerComApiRegisterDTO {
  readonly trackingId: string;
  readonly headers: JokerStringObject;
}

export function createJokerComApiRegisterDTO(
  trackingId: string,
  headers: JokerStringObject,
): JokerComApiRegisterDTO {
  return {
    trackingId,
    headers,
  };
}

export function isJokerComApiRegisterDTO(
  value: unknown,
): value is JokerComApiRegisterDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['trackingId', 'headers']) &&
    isString(objectKey(value, 'trackingId')) &&
    isJokerStringObject(objectKey(value, 'headers'))
  );
}

export function explainJokerComApiRegisterDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['trackingId', 'headers']),
    explainProperty(
      'trackingId',
      explainString(objectKey(value, 'trackingId')),
    ),
    explainProperty(
      'headers',
      explainJokerStringObject(objectKey(value, 'headers')),
    ),
  ]);
}

export function stringifyJokerComApiRegisterDTO(
  value: JokerComApiRegisterDTO,
): string {
  return `JokerComApiRegisterDTO(${value})`;
}

export function parseJokerComApiRegisterDTO(
  value: unknown,
): JokerComApiRegisterDTO | undefined {
  if (isJokerComApiRegisterDTO(value)) return value;
  return undefined;
}
