import {isRegularObject} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixLeaveRoomResponseDTO {}

export function createMatrixLeaveRoomResponseDTO(): MatrixLeaveRoomResponseDTO {
  return {};
}

export function isMatrixLeaveRoomResponseDTO(
  value: unknown,
): value is MatrixLeaveRoomResponseDTO {
  return isRegularObject(value) && hasNoOtherKeysInDevelopment(value, []);
}

export function stringifyMatrixLeaveRoomResponseDTO(
  value: MatrixLeaveRoomResponseDTO,
): string {
  return `MatrixLeaveRoomResponseDTO(${value})`;
}

export function parseMatrixLeaveRoomResponseDTO(
  value: unknown,
): MatrixLeaveRoomResponseDTO | undefined {
  if (isMatrixLeaveRoomResponseDTO(value)) return value;
  return undefined;
}
