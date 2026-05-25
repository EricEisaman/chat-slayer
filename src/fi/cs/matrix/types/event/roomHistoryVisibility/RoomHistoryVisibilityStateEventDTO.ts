import {
  isRoomHistoryVisibilityStateContentDTO,
  RoomHistoryVisibilityStateContentDTO,
} from './RoomHistoryVisibilityStateContentDTO';
import {MatrixStateEventOf} from '../../core/MatrixStateEventOf';
import {MatrixType} from '../../core/MatrixType';
import {isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface RoomHistoryVisibilityStateEventDTO extends MatrixStateEventOf<RoomHistoryVisibilityStateContentDTO> {
  readonly type: MatrixType.M_ROOM_HISTORY_VISIBILITY;
  readonly state_key: string;
  readonly content: RoomHistoryVisibilityStateContentDTO;
}

export function createRoomHistoryVisibilityStateEventDTO(
  content: RoomHistoryVisibilityStateContentDTO,
): RoomHistoryVisibilityStateEventDTO {
  return {
    type: MatrixType.M_ROOM_HISTORY_VISIBILITY,
    state_key: '',
    content,
  };
}

export function isRoomHistoryVisibilityStateEventDTO(
  value: unknown,
): value is RoomHistoryVisibilityStateEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['type', 'state_key', 'content']) &&
    objectKey(value, 'type') === MatrixType.M_ROOM_HISTORY_VISIBILITY &&
    isStringOrUndefined(objectKey(value, 'state_key')) &&
    isRoomHistoryVisibilityStateContentDTO(objectKey(value, 'content'))
  );
}

export function stringifyRoomHistoryVisibilityStateEventDTO(
  value: RoomHistoryVisibilityStateEventDTO,
): string {
  return `RoomHistoryVisibilityStateEventDTO(${value})`;
}

export function parseRoomHistoryVisibilityStateEventDTO(
  value: unknown,
): RoomHistoryVisibilityStateEventDTO | undefined {
  if (isRoomHistoryVisibilityStateEventDTO(value)) return value;
  return undefined;
}
