import {createRoomEventEntity, RoomEventEntity} from './RoomEventEntity';
import {MatrixType} from '../../../../../types/core/MatrixType';
import {
  isReadonlyJsonObject,
  ReadonlyJsonObject,
} from '../../../../../../core/Json';
import {isString} from '../../../../../../core/types/String';
import {isNumber} from '../../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../../core/types/OtherKeys';

/**
 * Base type for room state events saved in the repository.
 */
export interface RoomStateEventEntity extends RoomEventEntity {
  readonly id: string;
  readonly type: MatrixType | string;
  readonly content: ReadonlyJsonObject;
  readonly originServerTs: number;
  readonly senderId: string;
  readonly roomId: string;
  readonly stateKey: string;
}

export function createRoomStateEventEntity(
  id: string,
  type: MatrixType | string,
  content: ReadonlyJsonObject,
  originServerTs: number,
  senderId: string,
  roomId: string,
  stateKey: string,
): RoomStateEventEntity {
  return <RoomStateEventEntity>(
    createRoomEventEntity(
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

export function isRoomStateEvent(
  value: unknown,
): value is RoomStateEventEntity {
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
    isReadonlyJsonObject(objectKey(value, 'content')) &&
    isString(objectKey(value, 'stateKey'))
  );
}

export function stringifyRoomStateEvent(value: RoomStateEventEntity): string {
  return `RoomStateEvent(${value})`;
}

export function parseRoomStateEvent(
  value: unknown,
): RoomStateEventEntity | undefined {
  if (isRoomStateEvent(value)) return value;
  return undefined;
}
