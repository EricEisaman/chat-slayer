import {
  MatrixSyncResponseRoomEventDTO,
  explainMatrixSyncResponseRoomEventDTO,
  isMatrixSyncResponseRoomEventDTO,
} from './MatrixSyncResponseRoomEventDTO';
import {concat} from '../../../../../core/functions/concat';
import {find} from '../../../../../core/functions/find';
import {isBoolean} from '../../../../../core/types/Boolean';
import {isString, isStringOrUndefined} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';
import {isArray, isArrayOf} from '../../../../../core/types/Array';

export interface MatrixSyncResponseTimelineDTO {
  readonly events: readonly MatrixSyncResponseRoomEventDTO[];
  readonly limited: boolean;
  readonly prev_batch?: string;
}

export function getEventsFromMatrixSyncResponseTimelineDTO(
  value: MatrixSyncResponseTimelineDTO,
): readonly MatrixSyncResponseRoomEventDTO[] {
  return concat([], value.events ?? []);
}

export function isMatrixSyncResponseTimelineDTO(
  value: unknown,
): value is MatrixSyncResponseTimelineDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['events', 'limited', 'prev_batch']) &&
    isArrayOf(objectKey(value, 'events'), isMatrixSyncResponseRoomEventDTO) &&
    isBoolean(objectKey(value, 'limited')) &&
    isStringOrUndefined(objectKey(value, 'prev_batch'))
  );
}

export function assertMatrixSyncResponseTimelineDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError(`value not object: ${value}`);
  }

  if (
    !hasNoOtherKeysInDevelopment(value, ['events', 'limited', 'prev_batch'])
  ) {
    throw new TypeError(`Extra properties in value: all keys: ${keys(value)}`);
  }

  if (
    !isArrayOf(objectKey(value, 'events'), isMatrixSyncResponseRoomEventDTO)
  ) {
    const events = objectKey(value, 'events');
    const event = isArray(events)
      ? find(events, (item: unknown) => !isMatrixSyncResponseRoomEventDTO(item))
      : undefined;
    throw new TypeError(
      `Property "events" item was not correct: ${explainMatrixSyncResponseRoomEventDTO(event)}`,
    );
  }

  if (!isBoolean(objectKey(value, 'limited'))) {
    throw new TypeError(
      `Property "limited" was not boolean: ${objectKey(value, 'limited')}`,
    );
  }

  if (!isString(objectKey(value, 'prev_batch'))) {
    throw new TypeError(
      `Property "prev_batch" was not string: ${objectKey(value, 'prev_batch')}`,
    );
  }
}

export function explainMatrixSyncResponseTimelineDTO(value: unknown): string {
  try {
    assertMatrixSyncResponseTimelineDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseTimelineDTO(
  value: MatrixSyncResponseTimelineDTO,
): string {
  return `MatrixSyncResponseTimelineDTO(${value})`;
}

export function parseMatrixSyncResponseTimelineDTO(
  value: unknown,
): MatrixSyncResponseTimelineDTO | undefined {
  if (isMatrixSyncResponseTimelineDTO(value)) return value;
  return undefined;
}
