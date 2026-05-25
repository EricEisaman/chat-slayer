import {isString} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface PutRoomStateWithEventTypeResponseDTO {
  readonly event_id: string;
}

export function createPutRoomStateWithEventTypeResponseDTO(
  event_id: string,
): PutRoomStateWithEventTypeResponseDTO {
  return {
    event_id,
  };
}

export function isPutRoomStateWithEventTypeResponseDTO(
  value: unknown,
): value is PutRoomStateWithEventTypeResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['event_id']) &&
    isString(objectKey(value, 'event_id'))
  );
}

export function stringifyPutRoomStateWithEventTypeResponseDTO(
  value: PutRoomStateWithEventTypeResponseDTO,
): string {
  return `PutRoomStateWithEventTypeDTO(${value})`;
}

export function parsePutRoomStateWithEventTypeResponseDTO(
  value: unknown,
): PutRoomStateWithEventTypeResponseDTO | undefined {
  if (isPutRoomStateWithEventTypeResponseDTO(value)) return value;
  return undefined;
}
