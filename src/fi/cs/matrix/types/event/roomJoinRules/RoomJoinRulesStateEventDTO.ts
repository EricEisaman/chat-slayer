import {
  isRoomJoinRulesStateContentDTO,
  RoomJoinRulesStateContentDTO,
} from './RoomJoinRulesStateContentDTO';
import {MatrixStateEventOf} from '../../core/MatrixStateEventOf';
import {MatrixType} from '../../core/MatrixType';
import {isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

/**
 */
export interface RoomJoinRulesStateEventDTO extends MatrixStateEventOf<RoomJoinRulesStateContentDTO> {
  readonly type: MatrixType.M_ROOM_JOIN_RULES;
  readonly state_key: string;
  readonly content: RoomJoinRulesStateContentDTO;
}

export function createRoomJoinRulesStateEventDTO(
  content: RoomJoinRulesStateContentDTO,
): RoomJoinRulesStateEventDTO {
  return {
    type: MatrixType.M_ROOM_JOIN_RULES,
    state_key: '',
    content,
  };
}

export function isRoomJoinRulesStateEventDTO(
  value: unknown,
): value is RoomJoinRulesStateEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['type', 'state_key', 'content']) &&
    objectKey(value, 'type') === MatrixType.M_ROOM_HISTORY_VISIBILITY &&
    isStringOrUndefined(objectKey(value, 'state_key')) &&
    isRoomJoinRulesStateContentDTO(objectKey(value, 'content'))
  );
}

export function stringifyRoomJoinRulesStateEventDTO(
  value: RoomJoinRulesStateEventDTO,
): string {
  return `RoomJoinRulesStateEventDTO(${value})`;
}

export function parseRoomJoinRulesStateEventDTO(
  value: unknown,
): RoomJoinRulesStateEventDTO | undefined {
  if (isRoomJoinRulesStateEventDTO(value)) return value;
  return undefined;
}
