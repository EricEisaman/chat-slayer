import {isMatrixUserId, MatrixUserId} from '../../core/MatrixUserId';
import {isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixInviteToRoomRequestDTO {
  readonly user_id: MatrixUserId;
  readonly reason?: string;
}

export function createMatrixInviteToRoomRequestDTO(
  user_id: MatrixUserId,
  reason: string | undefined,
): MatrixInviteToRoomRequestDTO {
  return {
    reason,
    user_id,
  };
}

export function isMatrixInviteToRoomRequestDTO(
  value: unknown,
): value is MatrixInviteToRoomRequestDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['reason', 'user_id']) &&
    isMatrixUserId(objectKey(value, 'user_id')) &&
    isStringOrUndefined(objectKey(value, 'reason'))
  );
}

export function stringifyMatrixInviteToRoomRequestDTO(
  value: MatrixInviteToRoomRequestDTO,
): string {
  return `MatrixInviteToRoomRequestDTO(${value})`;
}

export function parseMatrixInviteToRoomRequestDTO(
  value: unknown,
): MatrixInviteToRoomRequestDTO | undefined {
  if (isMatrixInviteToRoomRequestDTO(value)) return value;
  return undefined;
}
