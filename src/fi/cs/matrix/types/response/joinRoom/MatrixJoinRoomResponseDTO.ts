import {MatrixRoomId, isMatrixRoomId} from '../../core/MatrixRoomId';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixJoinRoomResponseDTO {
  readonly room_id: MatrixRoomId;
}

export function createMatrixJoinRoomResponseDTO(
  room_id: MatrixRoomId,
): MatrixJoinRoomResponseDTO {
  return {
    room_id,
  };
}

export function isMatrixJoinRoomResponseDTO(
  value: unknown,
): value is MatrixJoinRoomResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['room_id']) &&
    isMatrixRoomId(objectKey(value, 'room_id'))
  );
}

export function stringifyMatrixJoinRoomResponseDTO(
  value: MatrixJoinRoomResponseDTO,
): string {
  return `MatrixJoinRoomResponseDTO(${value})`;
}

export function parseMatrixJoinRoomResponseDTO(
  value: unknown,
): MatrixJoinRoomResponseDTO | undefined {
  if (isMatrixJoinRoomResponseDTO(value)) return value;
  return undefined;
}
