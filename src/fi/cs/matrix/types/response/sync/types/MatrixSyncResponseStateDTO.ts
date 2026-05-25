import {concat} from '../../../../../core/functions/concat';
import {find} from '../../../../../core/functions/find';
import {
  MatrixSyncResponseStateEventDTO,
  explainMatrixSyncResponseStateEventDTO,
  isMatrixSyncResponseStateEventDTO,
} from './MatrixSyncResponseStateEventDTO';
import {LogService} from '../../../../../core/LogService';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {isArray, isArrayOf} from '../../../../../core/types/Array';

const LOG = LogService.createLogger('MatrixSyncResponseStateDTO');

export interface MatrixSyncResponseStateDTO {
  readonly events: readonly MatrixSyncResponseStateEventDTO[];
}

export function getEventsFromMatrixSyncResponseStateDTO(
  value: MatrixSyncResponseStateDTO,
): readonly MatrixSyncResponseStateEventDTO[] {
  return concat([], value.events ?? []);
}

export function isMatrixSyncResponseStateDTO(
  value: unknown,
): value is MatrixSyncResponseStateDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['events']) &&
    isArrayOf<MatrixSyncResponseStateEventDTO>(
      objectKey(value, 'events'),
      isMatrixSyncResponseStateEventDTO,
    )
  );
}

export function assertMatrixSyncResponseStateDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError('value was not object');
  }

  if (!hasNoOtherKeysInDevelopment(value, ['events'])) {
    throw new TypeError('value had extra keys');
  }

  if (
    !isArrayOf<MatrixSyncResponseStateEventDTO>(
      objectKey(value, 'events'),
      isMatrixSyncResponseStateEventDTO,
    )
  ) {
    if (!objectKey(value, 'events')) {
      LOG.debug(
        `Not a MatrixSyncResponseStateDTO: ${JSON.stringify(value, null, 2)}`,
      );
      throw new TypeError(
        `Property "events": Not array of MatrixSyncResponseStateEventDTO: Not an array: ${objectKey(value, 'events')}`,
      );
    }
    const events = objectKey(value, 'events');
    const item = isArray(events)
      ? find(
          events,
          (event: unknown) => !isMatrixSyncResponseStateEventDTO(event),
        )
      : undefined;
    throw new TypeError(
      `Property "events": Not array of MatrixSyncResponseStateEventDTO: ${explainMatrixSyncResponseStateEventDTO(item)}`,
    );
  }
}

export function explainMatrixSyncResponseStateDTO(value: unknown): string {
  try {
    assertMatrixSyncResponseStateDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseStateDTO(
  value: MatrixSyncResponseStateDTO,
): string {
  return `MatrixSyncResponseStateDTO(${value})`;
}

export function parseMatrixSyncResponseStateDTO(
  value: unknown,
): MatrixSyncResponseStateDTO | undefined {
  if (isMatrixSyncResponseStateDTO(value)) return value;
  return undefined;
}
