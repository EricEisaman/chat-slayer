import {
  isRoomGuestAccessContentDTO,
  RoomGuestAccessContentDTO,
} from './RoomGuestAccessContentDTO';
import {MatrixStateEventOf} from '../../core/MatrixStateEventOf';
import {MatrixType} from '../../core/MatrixType';
import {isString} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface RoomGuestAccessStateEventDTO extends MatrixStateEventOf<RoomGuestAccessContentDTO> {
  readonly type: MatrixType.M_ROOM_GUEST_ACCESS;
  readonly state_key: '';
  readonly content: RoomGuestAccessContentDTO;
}

export function createRoomGuestAccessStateEventDTO(
  content: RoomGuestAccessContentDTO,
): RoomGuestAccessStateEventDTO {
  return {
    type: MatrixType.M_ROOM_GUEST_ACCESS,
    state_key: '',
    content,
  };
}

export function isRoomGuestAccessStateEventDTO(
  value: unknown,
): value is RoomGuestAccessStateEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['type', 'state_key', 'content']) &&
    objectKey(value, 'type') === MatrixType.M_ROOM_GUEST_ACCESS &&
    isString(objectKey(value, 'state_key')) &&
    isRoomGuestAccessContentDTO(objectKey(value, 'content'))
  );
}

export function stringifyRoomGuestAccessStateEventDTO(
  value: RoomGuestAccessStateEventDTO,
): string {
  return `RoomGuestAccessStateEventDTO(${value})`;
}

export function parseRoomGuestAccessStateEventDTO(
  value: unknown,
): RoomGuestAccessStateEventDTO | undefined {
  if (isRoomGuestAccessStateEventDTO(value)) return value;
  return undefined;
}
