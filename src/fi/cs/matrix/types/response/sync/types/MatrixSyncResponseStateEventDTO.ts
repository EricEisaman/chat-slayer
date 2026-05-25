import {
  MatrixSyncResponseUnsignedDataDTO,
  isMatrixSyncResponseUnsignedDataDTO,
  explainMatrixSyncResponseUnsignedDataDTO,
} from './MatrixSyncResponseUnsignedDataDTO';
import {isJsonObject, JsonObject} from '../../../../../core/Json';
import {isUndefined} from '../../../../../core/types/undefined';
import {isString} from '../../../../../core/types/String';
import {isInteger} from '../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';

export interface MatrixSyncResponseStateEventDTO {
  readonly content: JsonObject;
  readonly type: string;
  readonly event_id: string;
  readonly sender: string;
  readonly origin_server_ts: number;
  readonly unsigned?: MatrixSyncResponseUnsignedDataDTO;
  readonly prev_content?: JsonObject;
  readonly state_key: string;
}

export function isMatrixSyncResponseStateEventDTO(
  value: unknown,
): value is MatrixSyncResponseStateEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'content',
      'type',
      'event_id',
      'sender',
      'origin_server_ts',
      'unsigned',
      'prev_content',
      'state_key',
    ]) &&
    isJsonObject(objectKey(value, 'content')) &&
    isString(objectKey(value, 'type')) &&
    isString(objectKey(value, 'event_id')) &&
    isString(objectKey(value, 'sender')) &&
    isInteger(objectKey(value, 'origin_server_ts')) &&
    (isUndefined(objectKey(value, 'unsigned')) ||
      isMatrixSyncResponseUnsignedDataDTO(objectKey(value, 'unsigned'))) &&
    (isUndefined(objectKey(value, 'prev_content')) ||
      isJsonObject(objectKey(value, 'prev_content'))) &&
    isString(objectKey(value, 'state_key'))
  );
}

export function assertMatrixSyncResponseStateEventDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError(`value was not regular object: ${value}`);
  }

  if (
    !hasNoOtherKeysInDevelopment(value, [
      'content',
      'type',
      'event_id',
      'sender',
      'origin_server_ts',
      'unsigned',
      'prev_content',
      'state_key',
    ])
  ) {
    throw new TypeError(`value had extra keys: all keys: ${keys(value)}`);
  }

  if (!isJsonObject(objectKey(value, 'content'))) {
    throw new TypeError(
      `Property "content" not JsonObject: ${objectKey(value, 'content')}`,
    );
  }

  if (!isString(objectKey(value, 'type'))) {
    throw new TypeError(
      `Property "type" not valid: ${objectKey(value, 'type')}`,
    );
  }

  if (!isString(objectKey(value, 'event_id'))) {
    throw new TypeError(
      `Property "event_id" not valid: ${objectKey(value, 'event_id')}`,
    );
  }

  if (!isString(objectKey(value, 'sender'))) {
    throw new TypeError(
      `Property "sender" not valid: ${objectKey(value, 'sender')}`,
    );
  }

  if (!isInteger(objectKey(value, 'origin_server_ts'))) {
    throw new TypeError(
      `Property "origin_server_ts" not valid: ${objectKey(value, 'origin_server_ts')}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'unsigned')) ||
      isMatrixSyncResponseUnsignedDataDTO(objectKey(value, 'unsigned'))
    )
  ) {
    throw new TypeError(
      `Property "unsigned" not valid: ${explainMatrixSyncResponseUnsignedDataDTO(objectKey(value, 'unsigned'))}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'prev_content')) ||
      isJsonObject(objectKey(value, 'prev_content'))
    )
  ) {
    throw new TypeError(
      `Property "prev_content" not valid: ${objectKey(value, 'prev_content')}`,
    );
  }

  if (!isString(objectKey(value, 'state_key'))) {
    throw new TypeError(
      `Property "state_key" not valid: ${objectKey(value, 'state_key')}`,
    );
  }
}

export function explainMatrixSyncResponseStateEventDTO(value: unknown): string {
  try {
    assertMatrixSyncResponseStateEventDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseStateEventDTO(
  value: MatrixSyncResponseStateEventDTO,
): string {
  return `MatrixSyncResponseStateEventDTO(${value})`;
}

export function parseMatrixSyncResponseStateEventDTO(
  value: unknown,
): MatrixSyncResponseStateEventDTO | undefined {
  if (isMatrixSyncResponseStateEventDTO(value)) return value;
  return undefined;
}
