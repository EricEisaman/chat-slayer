import {
  MatrixSyncResponseUnsignedDataDTO,
  isMatrixSyncResponseUnsignedDataDTO,
} from './MatrixSyncResponseUnsignedDataDTO';
import {isJsonObject, JsonObject} from '../../../../../core/Json';
import {isUndefined} from '../../../../../core/types/undefined';
import {isString, isStringOrUndefined} from '../../../../../core/types/String';
import {isNumberOrUndefined} from '../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';

export interface MatrixSyncResponseStrippedStateDTO {
  readonly content: JsonObject;
  readonly state_key: string;
  readonly type: string;
  readonly sender: string;
  readonly origin_server_ts?: number;
  readonly unsigned?: MatrixSyncResponseUnsignedDataDTO;
  readonly event_id?: string;
}

export function isMatrixSyncResponseStrippedStateDTO(
  value: unknown,
): value is MatrixSyncResponseStrippedStateDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'content',
      'state_key',
      'type',
      'sender',
      'origin_server_ts',
      'unsigned',
      'event_id',
    ]) &&
    isJsonObject(objectKey(value, 'content')) &&
    isString(objectKey(value, 'state_key')) &&
    isString(objectKey(value, 'type')) &&
    isString(objectKey(value, 'sender')) &&
    isNumberOrUndefined(objectKey(value, 'origin_server_ts')) &&
    (isUndefined(objectKey(value, 'unsigned')) ||
      isMatrixSyncResponseUnsignedDataDTO(objectKey(value, 'unsigned'))) &&
    isStringOrUndefined(objectKey(value, 'event_id'))
  );
}

export function assertMatrixSyncResponseStrippedStateDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError(`invalid: ${value}`);
  }
  if (
    !hasNoOtherKeysInDevelopment(value, [
      'content',
      'state_key',
      'type',
      'sender',
      'origin_server_ts',
      'unsigned',
      'event_id',
    ])
  ) {
    throw new TypeError(`one key is extra: ${keys(value)}`);
  }
  if (!isJsonObject(objectKey(value, 'content'))) {
    throw new TypeError(
      `Property "content" invalid: ${objectKey(value, 'content')}`,
    );
  }
  if (!isString(objectKey(value, 'state_key'))) {
    throw new TypeError(
      `Property "state_key" invalid: ${objectKey(value, 'state_key')}`,
    );
  }
  if (!isString(objectKey(value, 'type'))) {
    throw new TypeError(`Property "type" invalid: ${objectKey(value, 'type')}`);
  }
  if (!isString(objectKey(value, 'sender'))) {
    throw new TypeError(
      `Property "sender" invalid: ${objectKey(value, 'sender')}`,
    );
  }
  if (!isNumberOrUndefined(objectKey(value, 'origin_server_ts'))) {
    throw new TypeError(
      `Property "origin_server_ts" invalid: ${objectKey(value, 'origin_server_ts')}`,
    );
  }
  if (
    !(
      isUndefined(objectKey(value, 'unsigned')) ||
      isMatrixSyncResponseUnsignedDataDTO(objectKey(value, 'unsigned'))
    )
  ) {
    throw new TypeError(
      `Property "unsigned" invalid: ${objectKey(value, 'unsigned')}`,
    );
  }
  if (!isStringOrUndefined(objectKey(value, 'event_id'))) {
    throw new TypeError(
      `Property "event_id" invalid: ${objectKey(value, 'event_id')}`,
    );
  }
}

export function explainMatrixSyncResponseStrippedStateDTO(
  value: unknown,
): string {
  try {
    assertMatrixSyncResponseStrippedStateDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseStrippedStateDTO(
  value: MatrixSyncResponseStrippedStateDTO,
): string {
  return `MatrixSyncResponseStrippedStateDTO(${value})`;
}

export function parseMatrixSyncResponseStrippedStateDTO(
  value: unknown,
): MatrixSyncResponseStrippedStateDTO | undefined {
  if (isMatrixSyncResponseStrippedStateDTO(value)) return value;
  return undefined;
}
