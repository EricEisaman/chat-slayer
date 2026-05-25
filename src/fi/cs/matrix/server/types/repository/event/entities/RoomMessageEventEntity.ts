import {createRoomEventEntity, RoomEventEntity} from './RoomEventEntity';
import {MatrixType} from '../../../../../types/core/MatrixType';
import {isJsonObject, ReadonlyJsonObject} from '../../../../../../core/Json';
import {isString} from '../../../../../../core/types/String';
import {isNumber} from '../../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../../core/types/OtherKeys';

/**
 * Base type for room message events saved in the repository.
 */
export interface RoomMessageEventEntity extends RoomEventEntity {
  readonly id: string;
  readonly type: MatrixType | string;
  readonly content: ReadonlyJsonObject;
  readonly originServerTs: number;
  readonly senderId: string;
  readonly roomId: string;
  readonly stateKey?: undefined;
}

export function createRoomMessageEventEntity(
  id: string,
  type: MatrixType | string,
  content: ReadonlyJsonObject,
  originServerTs: number,
  senderId: string,
  roomId: string,
): RoomMessageEventEntity {
  return <RoomMessageEventEntity>(
    createRoomEventEntity(
      id,
      type,
      content,
      originServerTs,
      senderId,
      roomId,
      undefined,
    )
  );
}

export function isRoomMessageEventEntity(
  value: unknown,
): value is RoomMessageEventEntity {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'id',
      'type',
      'originServerTs',
      'senderId',
      'roomId',
      'content',
    ]) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'type')) &&
    isNumber(objectKey(value, 'originServerTs')) &&
    isString(objectKey(value, 'senderId')) &&
    isString(objectKey(value, 'roomId')) &&
    isJsonObject(objectKey(value, 'content'))
  );
}

export function stringifyRoomMessageEventEntity(
  value: RoomMessageEventEntity,
): string {
  return `RoomMessageEvent(${value})`;
}

export function parseRoomMessageEventEntity(
  value: unknown,
): RoomMessageEventEntity | undefined {
  if (isRoomMessageEventEntity(value)) return value;
  return undefined;
}
