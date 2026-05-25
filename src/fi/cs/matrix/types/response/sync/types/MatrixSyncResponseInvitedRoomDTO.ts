import {
  MatrixSyncResponseInviteStateDTO,
  explainMatrixSyncResponseInviteStateDTO,
  getEventsFromMatrixSyncResponseInviteStateDTO,
  isMatrixSyncResponseInviteStateDTO,
} from './MatrixSyncResponseInviteStateDTO';
import {MatrixSyncResponseStrippedStateDTO} from './MatrixSyncResponseStrippedStateDTO';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';

export interface MatrixSyncResponseInvitedRoomDTO {
  readonly invite_state: MatrixSyncResponseInviteStateDTO;
}

export function getEventsFromMatrixSyncResponseInvitedRoomDTO(
  value: MatrixSyncResponseInvitedRoomDTO,
): readonly MatrixSyncResponseStrippedStateDTO[] {
  return getEventsFromMatrixSyncResponseInviteStateDTO(value.invite_state);
}

export function isMatrixSyncResponseInvitedRoomDTO(
  value: unknown,
): value is MatrixSyncResponseInvitedRoomDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['invite_state']) &&
    isMatrixSyncResponseInviteStateDTO(objectKey(value, 'invite_state'))
  );
}

export function assertMatrixSyncResponseInvitedRoomDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError(`Value not object: ${value}`);
  }

  if (!hasNoOtherKeysInDevelopment(value, ['invite_state'])) {
    throw new TypeError(`Object has extra keys: all keys: ${keys(value)}`);
  }

  if (!isMatrixSyncResponseInviteStateDTO(objectKey(value, 'invite_state'))) {
    throw new TypeError(
      `Property "invite_state" invalid: ${explainMatrixSyncResponseInviteStateDTO(objectKey(value, 'invite_state'))}`,
    );
  }
}

export function explainMatrixSyncResponseInvitedRoomDTO(
  value: unknown,
): string {
  try {
    assertMatrixSyncResponseInvitedRoomDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseInvitedRoomDTO(
  value: MatrixSyncResponseInvitedRoomDTO,
): string {
  return `MatrixSyncResponseInvitedRoomDTO(${value})`;
}

export function parseMatrixSyncResponseInvitedRoomDTO(
  value: unknown,
): MatrixSyncResponseInvitedRoomDTO | undefined {
  if (isMatrixSyncResponseInvitedRoomDTO(value)) return value;
  return undefined;
}
