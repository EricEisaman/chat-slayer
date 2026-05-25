import {isRegularObject} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixInviteToRoomResponseDTO {}

export function createMatrixInviteToRoomResponseDTO(): MatrixInviteToRoomResponseDTO {
  return {};
}

export function isMatrixInviteToRoomResponseDTO(
  value: unknown,
): value is MatrixInviteToRoomResponseDTO {
  return isRegularObject(value) && hasNoOtherKeysInDevelopment(value, []);
}

export function stringifyMatrixInviteToRoomResponseDTO(
  value: MatrixInviteToRoomResponseDTO,
): string {
  return `MatrixInviteToRoomResponseDTO(${value})`;
}

export function parseMatrixInviteToRoomResponseDTO(
  value: unknown,
): MatrixInviteToRoomResponseDTO | undefined {
  if (isMatrixInviteToRoomResponseDTO(value)) return value;
  return undefined;
}
