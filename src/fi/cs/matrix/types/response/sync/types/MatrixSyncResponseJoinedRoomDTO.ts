import {
  MatrixSyncResponseRoomSummaryDTO,
  isMatrixSyncResponseRoomSummaryDTO,
} from './MatrixSyncResponseRoomSummaryDTO';
import {
  MatrixSyncResponseStateDTO,
  explainMatrixSyncResponseStateDTO,
  getEventsFromMatrixSyncResponseStateDTO,
  isMatrixSyncResponseStateDTO,
} from './MatrixSyncResponseStateDTO';
import {
  MatrixSyncResponseTimelineDTO,
  explainMatrixSyncResponseTimelineDTO,
  getEventsFromMatrixSyncResponseTimelineDTO,
  isMatrixSyncResponseTimelineDTO,
} from './MatrixSyncResponseTimelineDTO';
import {
  MatrixSyncResponseEphemeralDTO,
  getEventsFromMatrixSyncResponseEphemeralDTO,
  isMatrixSyncResponseEphemeralDTO,
} from './MatrixSyncResponseEphemeralDTO';
import {
  MatrixSyncResponseAccountDataDTO,
  getEventsFromMatrixSyncResponseAccountDataDTO,
  isMatrixSyncResponseAccountDataDTO,
} from './MatrixSyncResponseAccountDataDTO';
import {
  MatrixSyncResponseUnreadNotificationCountsDTO,
  isMatrixSyncResponseUnreadNotificationCountsDTO,
} from './MatrixSyncResponseUnreadNotificationCountsDTO';
import {concat} from '../../../../../core/functions/concat';
import {MatrixSyncResponseEventDTO} from './MatrixSyncResponseEventDTO';
import {MatrixSyncResponseRoomEventDTO} from './MatrixSyncResponseRoomEventDTO';
import {isUndefined} from '../../../../../core/types/undefined';
import {isNumberOrUndefined} from '../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixSyncResponseJoinedRoomDTO {
  readonly summary?: MatrixSyncResponseRoomSummaryDTO;
  readonly state?: MatrixSyncResponseStateDTO;
  readonly timeline?: MatrixSyncResponseTimelineDTO;
  readonly ephemeral?: MatrixSyncResponseEphemeralDTO;
  readonly account_data?: MatrixSyncResponseAccountDataDTO;
  readonly unread_notifications?: MatrixSyncResponseUnreadNotificationCountsDTO;
  readonly 'org.matrix.msc2654.unread_count'?: number;
}

export function getEventsFromMatrixSyncResponseJoinedRoomDTO(
  value: MatrixSyncResponseJoinedRoomDTO,
): readonly (MatrixSyncResponseRoomEventDTO | MatrixSyncResponseEventDTO)[] {
  return concat(
    [] as readonly (
      | MatrixSyncResponseRoomEventDTO
      | MatrixSyncResponseEventDTO
    )[],
    value.state ? getEventsFromMatrixSyncResponseStateDTO(value.state) : [],
    value.timeline
      ? getEventsFromMatrixSyncResponseTimelineDTO(value.timeline)
      : [],
    value.ephemeral
      ? getEventsFromMatrixSyncResponseEphemeralDTO(value.ephemeral)
      : [],
    value.account_data
      ? getEventsFromMatrixSyncResponseAccountDataDTO(value.account_data)
      : [],
  );
}

export function isMatrixSyncResponseJoinedRoomDTO(
  value: unknown,
): value is MatrixSyncResponseJoinedRoomDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'summary',
      'state',
      'timeline',
      'ephemeral',
      'account_data',
      'unread_notifications',
      'org.matrix.msc2654.unread_count',
    ]) &&
    (isUndefined(objectKey(value, 'summary')) ||
      isMatrixSyncResponseRoomSummaryDTO(objectKey(value, 'summary'))) &&
    (isUndefined(objectKey(value, 'state')) ||
      isMatrixSyncResponseStateDTO(objectKey(value, 'state'))) &&
    (isUndefined(objectKey(value, 'timeline')) ||
      isMatrixSyncResponseTimelineDTO(objectKey(value, 'timeline'))) &&
    (isUndefined(objectKey(value, 'ephemeral')) ||
      isMatrixSyncResponseEphemeralDTO(objectKey(value, 'ephemeral'))) &&
    (isUndefined(objectKey(value, 'account_data')) ||
      isMatrixSyncResponseAccountDataDTO(objectKey(value, 'account_data'))) &&
    (isUndefined(objectKey(value, 'unread_notifications')) ||
      isMatrixSyncResponseUnreadNotificationCountsDTO(
        objectKey(value, 'unread_notifications'),
      )) &&
    isNumberOrUndefined(value['org.matrix.msc2654.unread_count'])
  );
}

export function assertMatrixSyncResponseJoinedRoomDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError(`value was not object: ${value}`);
  }

  if (
    !hasNoOtherKeysInDevelopment(value, [
      'summary',
      'state',
      'timeline',
      'ephemeral',
      'account_data',
      'unread_notifications',
      'org.matrix.msc2654.unread_count',
    ])
  ) {
    throw new TypeError(`value had extra keys: ${value}`);
  }

  if (
    !(
      isUndefined(objectKey(value, 'summary')) ||
      isMatrixSyncResponseRoomSummaryDTO(objectKey(value, 'summary'))
    )
  ) {
    throw new TypeError(`Property "summary" was invalid: ${value}`);
  }

  if (
    !(
      isUndefined(objectKey(value, 'state')) ||
      isMatrixSyncResponseStateDTO(objectKey(value, 'state'))
    )
  ) {
    throw new TypeError(
      `Property "state" was invalid: ${explainMatrixSyncResponseStateDTO(objectKey(value, 'state'))}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'timeline')) ||
      isMatrixSyncResponseTimelineDTO(objectKey(value, 'timeline'))
    )
  ) {
    throw new TypeError(
      `Property "timeline" was invalid: ${explainMatrixSyncResponseTimelineDTO(objectKey(value, 'timeline'))}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'ephemeral')) ||
      isMatrixSyncResponseEphemeralDTO(objectKey(value, 'ephemeral'))
    )
  ) {
    throw new TypeError(`Property "ephemeral" was invalid: ${value}`);
  }

  if (
    !(
      isUndefined(objectKey(value, 'account_data')) ||
      isMatrixSyncResponseAccountDataDTO(objectKey(value, 'account_data'))
    )
  ) {
    throw new TypeError(`Property "account_data" was invalid: ${value}`);
  }

  if (
    !(
      isUndefined(objectKey(value, 'unread_notifications')) ||
      isMatrixSyncResponseUnreadNotificationCountsDTO(
        objectKey(value, 'unread_notifications'),
      )
    )
  ) {
    throw new TypeError(
      `Property "unread_notifications" was invalid: ${value}`,
    );
  }

  if (!isNumberOrUndefined(value['org.matrix.msc2654.unread_count'])) {
    throw new TypeError(
      `Property "org.matrix.msc2654.unread_count" was invalid: ${value}`,
    );
  }
}

export function explainMatrixSyncResponseJoinedRoomDTO(value: unknown): string {
  try {
    assertMatrixSyncResponseJoinedRoomDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseJoinedRoomDTO(
  value: MatrixSyncResponseJoinedRoomDTO,
): string {
  return `MatrixSyncResponseJoinedRoomDTO(${value})`;
}

export function parseMatrixSyncResponseJoinedRoomDTO(
  value: unknown,
): MatrixSyncResponseJoinedRoomDTO | undefined {
  if (isMatrixSyncResponseJoinedRoomDTO(value)) return value;
  return undefined;
}
