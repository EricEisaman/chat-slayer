import {isJsonObject, JsonObject} from '../../../../../core/Json';
import {
  MatrixSyncResponseUnsignedDataDTO,
  explainMatrixSyncResponseUnsignedDataDTO,
  isMatrixSyncResponseUnsignedDataDTO,
} from './MatrixSyncResponseUnsignedDataDTO';
import {MatrixUserId, isMatrixUserId} from '../../../core/MatrixUserId';
import {isUndefined} from '../../../../../core/types/undefined';
import {isString, isStringOrUndefined} from '../../../../../core/types/String';
import {isInteger} from '../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';

export interface MatrixSyncResponseRoomEventDTO {
  readonly content: JsonObject;
  readonly type: string;
  readonly event_id: string;
  readonly sender: MatrixUserId;
  readonly origin_server_ts: number;
  readonly unsigned?: MatrixSyncResponseUnsignedDataDTO;
  readonly state_key?: string;
}

export function isMatrixSyncResponseRoomEventDTO(
  value: unknown,
): value is MatrixSyncResponseRoomEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'content',
      'type',
      'event_id',
      'sender',
      'origin_server_ts',
      'unsigned',
      'state_key',
    ]) &&
    isJsonObject(objectKey(value, 'content')) &&
    isString(objectKey(value, 'type')) &&
    isString(objectKey(value, 'event_id')) &&
    isMatrixUserId(objectKey(value, 'sender')) &&
    isInteger(objectKey(value, 'origin_server_ts')) &&
    (isUndefined(objectKey(value, 'unsigned')) ||
      isMatrixSyncResponseUnsignedDataDTO(objectKey(value, 'unsigned'))) &&
    isStringOrUndefined(objectKey(value, 'state_key'))
  );
}

export function assertMatrixSyncResponseRoomEventDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError('value was not regular object');
  }

  if (
    !hasNoOtherKeysInDevelopment(value, [
      'content',
      'type',
      'event_id',
      'sender',
      'origin_server_ts',
      'unsigned',
      'state_key',
    ])
  ) {
    throw new TypeError(`Had extra properties: All keys: ${keys(value)}`);
  }

  if (!isJsonObject(objectKey(value, 'content'))) {
    throw new TypeError(
      `Property "content" was not correct: ${objectKey(value, 'content')}`,
    );
  }

  if (!isString(objectKey(value, 'type'))) {
    throw new TypeError(
      `Property "type" was not correct: ${objectKey(value, 'type')}`,
    );
  }

  if (!isString(objectKey(value, 'event_id'))) {
    throw new TypeError(
      `Property "event_id" was not correct: ${objectKey(value, 'event_id')}`,
    );
  }

  if (!isMatrixUserId(objectKey(value, 'sender'))) {
    throw new TypeError(
      `Property "sender" was not correct: ${objectKey(value, 'sender')}`,
    );
  }

  if (!isInteger(objectKey(value, 'origin_server_ts'))) {
    throw new TypeError(
      `Property "origin_server_ts" was not correct: ${objectKey(value, 'origin_server_ts')}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'unsigned')) ||
      isMatrixSyncResponseUnsignedDataDTO(objectKey(value, 'unsigned'))
    )
  ) {
    throw new TypeError(
      `Property "unsigned" was not correct: ${explainMatrixSyncResponseUnsignedDataDTO(objectKey(value, 'unsigned'))}`,
    );
  }

  if (!isStringOrUndefined(objectKey(value, 'state_key'))) {
    throw new TypeError(
      `Property "state_key" was not correct: ${objectKey(value, 'state_key')}`,
    );
  }
}

export function explainMatrixSyncResponseRoomEventDTO(value: unknown): string {
  try {
    assertMatrixSyncResponseRoomEventDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseRoomEventDTO(
  value: MatrixSyncResponseRoomEventDTO,
): string {
  return `MatrixSyncResponseRoomEventDTO(${value})`;
}

export function parseMatrixSyncResponseRoomEventDTO(
  value: unknown,
): MatrixSyncResponseRoomEventDTO | undefined {
  if (isMatrixSyncResponseRoomEventDTO(value)) return value;
  return undefined;
}
