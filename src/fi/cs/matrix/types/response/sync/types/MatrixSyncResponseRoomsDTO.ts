import {
  MatrixRoomId,
  explainMatrixRoomId,
  isMatrixRoomId,
} from '../../../core/MatrixRoomId';
import {
  MatrixSyncResponseJoinedRoomDTO,
  explainMatrixSyncResponseJoinedRoomDTO,
  getEventsFromMatrixSyncResponseJoinedRoomDTO,
  isMatrixSyncResponseJoinedRoomDTO,
} from './MatrixSyncResponseJoinedRoomDTO';
import {
  MatrixSyncResponseInvitedRoomDTO,
  explainMatrixSyncResponseInvitedRoomDTO,
  getEventsFromMatrixSyncResponseInvitedRoomDTO,
  isMatrixSyncResponseInvitedRoomDTO,
} from './MatrixSyncResponseInvitedRoomDTO';
import {
  MatrixSyncResponseLeftRoomDTO,
  getEventsFromMatrixSyncResponseLeftRoomDTO,
  isMatrixSyncResponseLeftRoomDTO,
} from './MatrixSyncResponseLeftRoomDTO';
import {concat} from '../../../../../core/functions/concat';
import {reduce} from '../../../../../core/functions/reduce';
import {MatrixSyncResponseAnyEventDTO} from './MatrixSyncResponseAnyEventDTO';
import {isUndefined} from '../../../../../core/types/undefined';
import {
  explainRegularObjectOf,
  isRegularObject,
  isRegularObjectOf,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';

export interface MatrixSyncResponseRoomsDTO {
  readonly join?: {[K in MatrixRoomId]: MatrixSyncResponseJoinedRoomDTO};
  readonly invite?: {[K in MatrixRoomId]: MatrixSyncResponseInvitedRoomDTO};
  readonly leave?: {[K in MatrixRoomId]: MatrixSyncResponseLeftRoomDTO};
}

interface getEventsCallback<T> {
  (value: T): readonly MatrixSyncResponseAnyEventDTO[];
}

function getEventsFromObject<T>(
  value: {[K in MatrixRoomId]: T},
  callback: getEventsCallback<T>,
): readonly MatrixSyncResponseAnyEventDTO[] {
  const propertyKeys: readonly string[] = keys(value);
  return reduce(
    propertyKeys,
    (
      arr: readonly MatrixSyncResponseAnyEventDTO[],
      key: string,
    ): readonly MatrixSyncResponseAnyEventDTO[] => {
      return concat(arr, callback(value[key]));
    },
    [],
  );
}

export function getEventsFromMatrixSyncResponseRoomsDTO(
  value: MatrixSyncResponseRoomsDTO,
): readonly MatrixSyncResponseAnyEventDTO[] {
  return concat(
    [] as readonly MatrixSyncResponseAnyEventDTO[],
    getEventsFromObject(
      value.join ?? {},
      getEventsFromMatrixSyncResponseJoinedRoomDTO,
    ),
    getEventsFromObject(
      value.invite ?? {},
      getEventsFromMatrixSyncResponseInvitedRoomDTO,
    ),
    getEventsFromObject(
      value.leave ?? {},
      getEventsFromMatrixSyncResponseLeftRoomDTO,
    ),
  );
}

export function isMatrixSyncResponseRoomsDTO(
  value: unknown,
): value is MatrixSyncResponseRoomsDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['join', 'invite', 'peek', 'leave']) &&
    (isUndefined(objectKey(value, 'join')) ||
      isRegularObjectOf<MatrixRoomId, MatrixSyncResponseJoinedRoomDTO>(
        objectKey(value, 'join'),
        isMatrixRoomId,
        isMatrixSyncResponseJoinedRoomDTO,
      )) &&
    (isUndefined(objectKey(value, 'invite')) ||
      isRegularObjectOf<MatrixRoomId, MatrixSyncResponseInvitedRoomDTO>(
        objectKey(value, 'invite'),
        isMatrixRoomId,
        isMatrixSyncResponseInvitedRoomDTO,
      )) &&
    (isUndefined(objectKey(value, 'leave')) ||
      isRegularObjectOf<MatrixRoomId, MatrixSyncResponseLeftRoomDTO>(
        objectKey(value, 'leave'),
        isMatrixRoomId,
        isMatrixSyncResponseLeftRoomDTO,
      ))
  );
}

export function assertMatrixSyncResponseRoomsDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError('value was not regular object');
  }

  const propertyKeys = ['join', 'invite', 'leave', 'peek'];

  if (!hasNoOtherKeysInDevelopment(value, propertyKeys)) {
    throw new TypeError(
      `MatrixSyncResponseRoomsDTO: hasNoOtherKeysInDevelopment: ${explainNoOtherKeys(value, propertyKeys)}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'join')) ||
      isRegularObjectOf<MatrixRoomId, MatrixSyncResponseJoinedRoomDTO>(
        objectKey(value, 'join'),
        isMatrixRoomId,
        isMatrixSyncResponseJoinedRoomDTO,
      )
    )
  ) {
    throw new TypeError(
      `Property "join" was invalid: ${explainRegularObjectOf<
        MatrixRoomId,
        MatrixSyncResponseJoinedRoomDTO
      >(
        objectKey(value, 'join'),
        isMatrixRoomId,
        isMatrixSyncResponseJoinedRoomDTO,
        explainMatrixRoomId,
        explainMatrixSyncResponseJoinedRoomDTO,
      )}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'invite')) ||
      isRegularObjectOf<MatrixRoomId, MatrixSyncResponseInvitedRoomDTO>(
        objectKey(value, 'invite'),
        isMatrixRoomId,
        isMatrixSyncResponseInvitedRoomDTO,
      )
    )
  ) {
    throw new TypeError(
      `Property "invite" was invalid: ${explainRegularObjectOf<MatrixRoomId, MatrixSyncResponseInvitedRoomDTO>(objectKey(value, 'invite'), isMatrixRoomId, isMatrixSyncResponseInvitedRoomDTO, explainMatrixRoomId, explainMatrixSyncResponseInvitedRoomDTO)}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'leave')) ||
      isRegularObjectOf<MatrixRoomId, MatrixSyncResponseLeftRoomDTO>(
        objectKey(value, 'leave'),
        isMatrixRoomId,
        isMatrixSyncResponseLeftRoomDTO,
      )
    )
  ) {
    throw new TypeError('Property "leave" was invalid');
  }
}

export function explainMatrixSyncResponseRoomsDTO(value: unknown): string {
  try {
    assertMatrixSyncResponseRoomsDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseRoomsDTO(
  value: MatrixSyncResponseRoomsDTO,
): string {
  return `MatrixSyncResponseRoomsDTO(${value})`;
}

export function parseMatrixSyncResponseRoomsDTO(
  value: unknown,
): MatrixSyncResponseRoomsDTO | undefined {
  if (isMatrixSyncResponseRoomsDTO(value)) return value;
  return undefined;
}
