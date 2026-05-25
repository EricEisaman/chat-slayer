import {MatrixRoomId, isMatrixRoomId} from '../../core/MatrixRoomId';
import {MatrixRoomAlias, isMatrixRoomAlias} from '../../core/MatrixRoomAlias';
import {isUndefined} from '../../../../core/types/undefined';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixCreateRoomResponseDTO {
  readonly room_id: MatrixRoomId;
  readonly room_alias?: MatrixRoomAlias;
}

export function createMatrixCreateRoomResponseDTO(
  room_id: MatrixRoomId,
  room_alias?: MatrixRoomAlias,
) {
  return {
    room_id,
    room_alias,
  };
}

export function isMatrixCreateRoomResponseDTO(
  value: unknown,
): value is MatrixCreateRoomResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['room_id', 'room_alias']) &&
    isMatrixRoomId(objectKey(value, 'room_id')) &&
    (isUndefined(objectKey(value, 'room_alias')) ||
      isMatrixRoomAlias(objectKey(value, 'room_alias')))
  );
}

export function stringifyMatrixCreateRoomResponseDTO(
  value: MatrixCreateRoomResponseDTO,
): string {
  return `MatrixCreateRoomResponseDTO(${value})`;
}

export function parseMatrixCreateRoomResponseDTO(
  value: unknown,
): MatrixCreateRoomResponseDTO | undefined {
  if (isMatrixCreateRoomResponseDTO(value)) return value;
  return undefined;
}
