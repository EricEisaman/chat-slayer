import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixPreviousRoomDTO {
  readonly room_id: string;
  readonly event_id: string;
}

export function isMatrixPreviousRoomDTO(
  value: unknown,
): value is MatrixPreviousRoomDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['room_id', 'event_id']) &&
    isString(objectKey(value, 'room_id')) &&
    isString(objectKey(value, 'event_id'))
  );
}

export function stringifyMatrixPreviousRoomDTO(
  value: MatrixPreviousRoomDTO,
): string {
  return `MatrixPreviousRoomDTO(${value})`;
}

export function parseMatrixPreviousRoomDTO(
  value: unknown,
): MatrixPreviousRoomDTO | undefined {
  if (isMatrixPreviousRoomDTO(value)) return value;
  return undefined;
}
