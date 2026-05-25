import {
  MatrixSyncResponseStateDTO,
  getEventsFromMatrixSyncResponseStateDTO,
  isMatrixSyncResponseStateDTO,
} from './MatrixSyncResponseStateDTO';
import {
  MatrixSyncResponseTimelineDTO,
  getEventsFromMatrixSyncResponseTimelineDTO,
  isMatrixSyncResponseTimelineDTO,
} from './MatrixSyncResponseTimelineDTO';
import {
  MatrixSyncResponseAccountDataDTO,
  getEventsFromMatrixSyncResponseAccountDataDTO,
  isMatrixSyncResponseAccountDataDTO,
} from './MatrixSyncResponseAccountDataDTO';
import {concat} from '../../../../../core/functions/concat';
import {MatrixSyncResponseEventDTO} from './MatrixSyncResponseEventDTO';
import {MatrixSyncResponseRoomEventDTO} from './MatrixSyncResponseRoomEventDTO';
import {MatrixSyncResponseStateEventDTO} from './MatrixSyncResponseStateEventDTO';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixSyncResponseLeftRoomDTO {
  readonly state: MatrixSyncResponseStateDTO;
  readonly timeline: MatrixSyncResponseTimelineDTO;
  readonly account_data: MatrixSyncResponseAccountDataDTO;
}

export function getEventsFromMatrixSyncResponseLeftRoomDTO(
  value: MatrixSyncResponseLeftRoomDTO,
): readonly (
  | MatrixSyncResponseStateEventDTO
  | MatrixSyncResponseRoomEventDTO
  | MatrixSyncResponseEventDTO
)[] {
  return concat(
    [] as readonly (
      | MatrixSyncResponseStateEventDTO
      | MatrixSyncResponseRoomEventDTO
      | MatrixSyncResponseEventDTO
    )[],
    getEventsFromMatrixSyncResponseStateDTO(value.state),
    getEventsFromMatrixSyncResponseTimelineDTO(value.timeline),
    getEventsFromMatrixSyncResponseAccountDataDTO(value.account_data),
  );
}

export function isMatrixSyncResponseLeftRoomDTO(
  value: unknown,
): value is MatrixSyncResponseLeftRoomDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['state', 'timeline', 'account_data']) &&
    isMatrixSyncResponseStateDTO(objectKey(value, 'state')) &&
    isMatrixSyncResponseTimelineDTO(objectKey(value, 'timeline')) &&
    isMatrixSyncResponseAccountDataDTO(objectKey(value, 'account_data'))
  );
}

export function stringifyMatrixSyncResponseLeftRoomDTO(
  value: MatrixSyncResponseLeftRoomDTO,
): string {
  return `MatrixSyncResponseLeftRoomDTO(${value})`;
}

export function parseMatrixSyncResponseLeftRoomDTO(
  value: unknown,
): MatrixSyncResponseLeftRoomDTO | undefined {
  if (isMatrixSyncResponseLeftRoomDTO(value)) return value;
  return undefined;
}
