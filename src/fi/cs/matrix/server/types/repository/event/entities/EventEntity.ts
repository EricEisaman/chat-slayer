import {
  explainReadonlyJsonObject,
  isReadonlyJsonObject,
  ReadonlyJsonObject,
} from '../../../../../../core/Json';
import {MatrixType} from '../../../../../types/core/MatrixType';
import {explain, explainProperty} from '../../../../../../core/types/explain';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../../../../core/types/String';
import {explainNumber, isNumber} from '../../../../../../core/types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../../../core/types/RegularObject';
import {
  explainNoOtherKeys,
  hasNoOtherKeys,
} from '../../../../../../core/types/OtherKeys';

/**
 * The base type for events saved in the repository.
 */
export interface EventEntity {
  readonly id: string;
  readonly type: MatrixType | string;
  readonly content: ReadonlyJsonObject;
  readonly originServerTs: number;
  readonly senderId: string;
  readonly roomId?: string;
  readonly stateKey?: string;
}

export function createEventEntity(
  id: string,
  type: MatrixType | string,
  content: ReadonlyJsonObject,
  originServerTs: number,
  senderId: string,
  roomId?: string,
  stateKey?: string,
): EventEntity {
  return {
    id,
    type,
    originServerTs,
    senderId,
    roomId,
    content,
    stateKey,
  };
}

export function isEventEntity(value: unknown): value is EventEntity {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'id',
      'type',
      'originServerTs',
      'senderId',
      'roomId',
      'content',
      'stateKey',
    ]) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'type')) &&
    isNumber(objectKey(value, 'originServerTs')) &&
    isString(objectKey(value, 'senderId')) &&
    isStringOrUndefined(objectKey(value, 'roomId')) &&
    isReadonlyJsonObject(objectKey(value, 'content')) &&
    isStringOrUndefined(objectKey(value, 'stateKey'))
  );
}

export function explainEventEntity(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'id',
      'type',
      'originServerTs',
      'senderId',
      'roomId',
      'content',
      'stateKey',
    ]),
    explainProperty('id', explainString(objectKey(value, 'id'))),
    explainProperty('type', explainString(objectKey(value, 'type'))),
    explainProperty(
      'originServerTs',
      explainNumber(objectKey(value, 'originServerTs')),
    ),
    explainProperty('senderId', explainString(objectKey(value, 'senderId'))),
    explainProperty(
      'roomId',
      explainStringOrUndefined(objectKey(value, 'roomId')),
    ),
    explainProperty(
      'content',
      explainReadonlyJsonObject(objectKey(value, 'content')),
    ),
    explainProperty(
      'stateKey',
      explainStringOrUndefined(objectKey(value, 'stateKey')),
    ),
  ]);
}

export function stringifyEventEntity(value: EventEntity): string {
  return `Event(${value})`;
}

export function parseEventEntity(value: unknown): EventEntity | undefined {
  if (isEventEntity(value)) return value;
  return undefined;
}
