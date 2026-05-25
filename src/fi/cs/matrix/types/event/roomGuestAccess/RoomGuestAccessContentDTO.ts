import {isMatrixGuestAccess, MatrixGuestAccess} from './MatrixGuestAccess';
import {ReadonlyJsonObject} from '../../../../core/Json';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface RoomGuestAccessContentDTO extends ReadonlyJsonObject {
  readonly guest_access: MatrixGuestAccess;
}

export function createRoomGuestAccessContentDTO(
  guest_access: MatrixGuestAccess,
): RoomGuestAccessContentDTO {
  return {
    guest_access,
  };
}

export function isRoomGuestAccessContentDTO(
  value: unknown,
): value is RoomGuestAccessContentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['guest_access']) &&
    isMatrixGuestAccess(objectKey(value, 'guest_access'))
  );
}

export function stringifyRoomGuestAccessContentDTO(
  value: RoomGuestAccessContentDTO,
): string {
  return `RoomGuestAccessContentDTO(${value})`;
}

export function parseRoomGuestAccessContentDTO(
  value: unknown,
): RoomGuestAccessContentDTO | undefined {
  if (isRoomGuestAccessContentDTO(value)) return value;
  return undefined;
}
