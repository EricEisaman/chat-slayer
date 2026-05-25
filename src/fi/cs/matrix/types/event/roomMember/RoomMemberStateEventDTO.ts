import {MatrixStateEventOf} from '../../core/MatrixStateEventOf';
import {
  isRoomMemberContentDTO,
  RoomMemberContentDTO,
} from './RoomMemberContentDTO';
import {MatrixType} from '../../core/MatrixType';
import {isString} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../core/types/OtherKeys';

export interface RoomMemberStateEventDTO extends MatrixStateEventOf<RoomMemberContentDTO> {
  readonly type: MatrixType.M_ROOM_MEMBER;
  readonly state_key: string;
  readonly content: RoomMemberContentDTO;
}

export function createRoomMemberStateEventDTO(
  state_key: string,
  content: RoomMemberContentDTO,
): RoomMemberStateEventDTO {
  return {
    type: MatrixType.M_ROOM_MEMBER,
    state_key,
    content,
  };
}

export function isRoomMemberStateEventDTO(
  value: unknown,
): value is RoomMemberStateEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['type', 'state_key', 'content']) &&
    objectKey(value, 'type') === MatrixType.M_ROOM_MEMBER &&
    isString(objectKey(value, 'state_key')) &&
    isRoomMemberContentDTO(objectKey(value, 'content'))
  );
}

export function stringifyRoomMemberStateEventDTO(
  value: RoomMemberStateEventDTO,
): string {
  return `RoomMemberStateEventDTO(${value})`;
}

export function parseRoomMemberStateEventDTO(
  value: unknown,
): RoomMemberStateEventDTO | undefined {
  if (isRoomMemberStateEventDTO(value)) return value;
  return undefined;
}
