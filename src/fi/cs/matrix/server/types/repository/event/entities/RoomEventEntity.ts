import {createEventEntity, EventEntity} from './EventEntity';
import {MatrixType} from '../../../../../types/core/MatrixType';
import {isJsonObject, ReadonlyJsonObject} from '../../../../../../core/Json';
import {
  isString,
  isStringOrUndefined,
} from '../../../../../../core/types/String';
import {isNumber} from '../../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../../core/types/OtherKeys';

/**
 * Base type for room events saved in the repository.
 */
export interface RoomEventEntity extends EventEntity {
  readonly id: string;
  readonly type: MatrixType | string;
  readonly content: ReadonlyJsonObject;
  readonly originServerTs: number;
  readonly senderId: string;
  readonly roomId: string;
  readonly stateKey?: string;
}

export function createRoomEventEntity(
  id: string,
  type: MatrixType | string,
  content: ReadonlyJsonObject,
  originServerTs: number,
  senderId: string,
  roomId: string,
  stateKey?: string,
): RoomEventEntity {
  return <RoomEventEntity>(
    createEventEntity(
      id,
      type,
      content,
      originServerTs,
      senderId,
      roomId,
      stateKey,
    )
  );
}

export function isRoomEventEntity(value: unknown): value is RoomEventEntity {
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
    isString(objectKey(value, 'roomId')) &&
    isJsonObject(objectKey(value, 'content')) &&
    isStringOrUndefined(objectKey(value, 'stateKey'))
  );
}

export function stringifyRoomEventEntity(value: RoomEventEntity): string {
  return `RoomEvent(${value})`;
}

export function parseRoomEventEntity(
  value: unknown,
): RoomEventEntity | undefined {
  if (isRoomEventEntity(value)) return value;
  return undefined;
}
