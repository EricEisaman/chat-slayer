import {
  isMatrixHistoryVisibility,
  MatrixHistoryVisibility,
} from './MatrixHistoryVisibility';
import {ReadonlyJsonObject} from '../../../../core/Json';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface RoomHistoryVisibilityStateContentDTO extends ReadonlyJsonObject {
  readonly history_visibility: MatrixHistoryVisibility;
}

export function createRoomHistoryVisibilityStateContentDTO(
  history_visibility: MatrixHistoryVisibility,
): RoomHistoryVisibilityStateContentDTO {
  return {
    history_visibility,
  };
}

export function isRoomHistoryVisibilityStateContentDTO(
  value: unknown,
): value is RoomHistoryVisibilityStateContentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['history_visibility']) &&
    isMatrixHistoryVisibility(objectKey(value, 'history_visibility'))
  );
}

export function stringifyRoomHistoryVisibilityStateContentDTO(
  value: RoomHistoryVisibilityStateContentDTO,
): string {
  return `RoomHistoryVisibilityStateContentDTO(${value})`;
}

export function parseRoomHistoryVisibilityStateContentDTO(
  value: unknown,
): RoomHistoryVisibilityStateContentDTO | undefined {
  if (isRoomHistoryVisibilityStateContentDTO(value)) return value;
  return undefined;
}
