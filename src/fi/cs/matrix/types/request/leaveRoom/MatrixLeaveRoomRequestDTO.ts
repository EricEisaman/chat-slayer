import {isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixLeaveRoomRequestDTO {
  readonly reason?: string;
}

export function createMatrixLeaveRoomRequestDTO(
  reason: string | undefined,
): MatrixLeaveRoomRequestDTO {
  return {
    reason,
  };
}

export function isMatrixLeaveRoomRequestDTO(
  value: unknown,
): value is MatrixLeaveRoomRequestDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['reason']) &&
    isStringOrUndefined(objectKey(value, 'reason'))
  );
}

export function stringifyMatrixLeaveRoomRequestDTO(
  value: MatrixLeaveRoomRequestDTO,
): string {
  return `MatrixLeaveRoomRequestDTO(${value})`;
}

export function parseMatrixLeaveRoomRequestDTO(
  value: unknown,
): MatrixLeaveRoomRequestDTO | undefined {
  if (isMatrixLeaveRoomRequestDTO(value)) return value;
  return undefined;
}
