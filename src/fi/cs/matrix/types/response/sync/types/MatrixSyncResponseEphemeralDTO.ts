import {concat} from '../../../../../core/functions/concat';
import {
  MatrixSyncResponseEventDTO,
  isMatrixSyncResponseEventDTO,
} from './MatrixSyncResponseEventDTO';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {isArrayOf} from '../../../../../core/types/Array';

export interface MatrixSyncResponseEphemeralDTO {
  readonly events: readonly MatrixSyncResponseEventDTO[];
}

export function getEventsFromMatrixSyncResponseEphemeralDTO(
  value: MatrixSyncResponseEphemeralDTO,
): readonly MatrixSyncResponseEventDTO[] {
  return concat([], value.events ?? []);
}

export function isMatrixSyncResponseEphemeralDTO(
  value: unknown,
): value is MatrixSyncResponseEphemeralDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['events']) &&
    isArrayOf(objectKey(value, 'events'), isMatrixSyncResponseEventDTO)
  );
}

export function stringifyMatrixSyncResponseEphemeralDTO(
  value: MatrixSyncResponseEphemeralDTO,
): string {
  return `MatrixSyncResponseEphemeralDTO(${value})`;
}

export function parseMatrixSyncResponseEphemeralDTO(
  value: unknown,
): MatrixSyncResponseEphemeralDTO | undefined {
  if (isMatrixSyncResponseEphemeralDTO(value)) return value;
  return undefined;
}
