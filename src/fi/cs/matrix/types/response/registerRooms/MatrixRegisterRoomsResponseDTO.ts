import {MatrixRoomId, isMatrixRoomId} from '../../core/MatrixRoomId';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';
import {
  explainReadonlyArrayOfOrUndefined,
  isReadonlyArrayOfOrUndefined,
} from '../../../../core/types/Array';
import {explainStringOrUndefined, isStringOrUndefined} from '../../../../core/types/String';
import {explainBooleanOrUndefined, isBooleanOrUndefined} from '../../../../core/types/Boolean';

export interface MatrixRegisterRoomResultDTO {
  readonly name: string;
  readonly room_id: MatrixRoomId;
  readonly created: boolean;
}

export interface MatrixRegisterRoomsResponseDTO {
  readonly rooms: readonly MatrixRegisterRoomResultDTO[];
}

export function isMatrixRegisterRoomResultDTO(
  value: unknown,
): value is MatrixRegisterRoomResultDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['name', 'room_id', 'created']) &&
    isStringOrUndefined(objectKey(value, 'name')) &&
    typeof objectKey(value, 'name') === 'string' &&
    isMatrixRoomId(objectKey(value, 'room_id')) &&
    isBooleanOrUndefined(objectKey(value, 'created')) &&
    typeof objectKey(value, 'created') === 'boolean'
  );
}

export function createMatrixRegisterRoomsResponseDTO(
  rooms: readonly MatrixRegisterRoomResultDTO[],
): MatrixRegisterRoomsResponseDTO {
  return {rooms};
}

export function createMatrixRegisterRoomResultDTO(
  name: string,
  room_id: MatrixRoomId,
  created: boolean,
): MatrixRegisterRoomResultDTO {
  return {name, room_id, created};
}

export function isMatrixRegisterRoomsResponseDTO(
  value: unknown,
): value is MatrixRegisterRoomsResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['rooms']) &&
    isReadonlyArrayOfOrUndefined<MatrixRegisterRoomResultDTO>(
      objectKey(value, 'rooms'),
      isMatrixRegisterRoomResultDTO,
    )
  );
}
