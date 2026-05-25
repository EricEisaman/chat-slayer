import {
  MatrixSyncResponseStrippedStateDTO,
  explainMatrixSyncResponseStrippedStateDTO,
  isMatrixSyncResponseStrippedStateDTO,
} from './MatrixSyncResponseStrippedStateDTO';
import {find} from '../../../../../core/functions/find';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';
import {isArray, isArrayOf} from '../../../../../core/types/Array';

export interface MatrixSyncResponseInviteStateDTO {
  readonly events: readonly MatrixSyncResponseStrippedStateDTO[];
}

export function getEventsFromMatrixSyncResponseInviteStateDTO(
  value: MatrixSyncResponseInviteStateDTO,
): readonly MatrixSyncResponseStrippedStateDTO[] {
  return value.events ?? [];
}

export function isMatrixSyncResponseInviteStateDTO(
  value: unknown,
): value is MatrixSyncResponseInviteStateDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['events']) &&
    isArrayOf(objectKey(value, 'events'), isMatrixSyncResponseStrippedStateDTO)
  );
}

export function assertMatrixSyncResponseInviteStateDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError(`value invalid: ${value}`);
  }
  if (!hasNoOtherKeysInDevelopment(value, ['events'])) {
    throw new TypeError(`value has extra keys: all keys: ${keys(value)}`);
  }
  if (
    !isArrayOf(objectKey(value, 'events'), isMatrixSyncResponseStrippedStateDTO)
  ) {
    const events = objectKey(value, 'events');
    const item = isArray(events)
      ? find(
          events,
          (event: unknown) => !isMatrixSyncResponseStrippedStateDTO(event),
        )
      : undefined;
    throw new TypeError(
      `Property "events" had invalid item: ${explainMatrixSyncResponseStrippedStateDTO(item)}`,
    );
  }
}

export function explainMatrixSyncResponseInviteStateDTO(
  value: unknown,
): string {
  try {
    assertMatrixSyncResponseInviteStateDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseInviteStateDTO(
  value: MatrixSyncResponseInviteStateDTO,
): string {
  return `MatrixSyncResponseInviteStateDTO(${value})`;
}

export function parseMatrixSyncResponseInviteStateDTO(
  value: unknown,
): MatrixSyncResponseInviteStateDTO | undefined {
  if (isMatrixSyncResponseInviteStateDTO(value)) return value;
  return undefined;
}
