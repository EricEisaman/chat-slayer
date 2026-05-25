import {isRoomMembershipType, RoomMembershipType} from './RoomMembershipType';
import {isMatrixRoomId, MatrixRoomId} from '../../core/MatrixRoomId';
import {ReadonlyJsonObject} from '../../../../core/Json';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface RoomJoinRulesAllowConditionDTO extends ReadonlyJsonObject {
  readonly type: RoomMembershipType;
  readonly room_id: MatrixRoomId;
}

export function createRoomJoinRulesAllowConditionDTO(
  type: RoomMembershipType,
  room_id: MatrixRoomId,
): RoomJoinRulesAllowConditionDTO {
  return {
    type,
    room_id,
  };
}

export function isRoomJoinRulesAllowConditionDTO(
  value: unknown,
): value is RoomJoinRulesAllowConditionDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['type', 'room_id']) &&
    isRoomMembershipType(objectKey(value, 'type')) &&
    isMatrixRoomId(objectKey(value, 'room_id'))
  );
}

export function stringifyRoomJoinRulesAllowConditionDTO(
  value: RoomJoinRulesAllowConditionDTO,
): string {
  return `RoomJoinRulesAllowConditionDTO(${value})`;
}

export function parseRoomJoinRulesAllowConditionDTO(
  value: unknown,
): RoomJoinRulesAllowConditionDTO | undefined {
  if (isRoomJoinRulesAllowConditionDTO(value)) return value;
  return undefined;
}
