import {
  MatrixSyncResponseEventDTO,
  isMatrixSyncResponseEventDTO,
} from './MatrixSyncResponseEventDTO';
import {isJsonObjectOrUndefined, JsonObject} from '../../../../../core/Json';
import {MatrixUserId, isMatrixUserId} from '../../../core/MatrixUserId';
import {isUndefined} from '../../../../../core/types/undefined';
import {isStringOrUndefined} from '../../../../../core/types/String';
import {isIntegerOrUndefined} from '../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';

/**
 *
 * Note! The property "redacted_because" is defined as a string in room specs, but object in
 * ClientServer-API.
 *
 * @see https://matrix.org/docs/spec/client_server/latest#get-matrix-client-r0-sync
 * @see https://spec.matrix.org/unstable/rooms/v1/
 * @see https://spec.matrix.org/unstable/rooms/v3/
 * @see https://spec.matrix.org/unstable/rooms/v4/
 */
export interface MatrixSyncResponseUnsignedDataDTO {
  readonly age?: number;
  readonly prev_content?: JsonObject;
  readonly prev_sender?: MatrixUserId;
  readonly redacted_because?: MatrixSyncResponseEventDTO;
  readonly replaces_state?: string;
  readonly transaction_id?: string;
}

export function isMatrixSyncResponseUnsignedDataDTO(
  value: unknown,
): value is MatrixSyncResponseUnsignedDataDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'age',
      'prev_content',
      'prev_sender',
      'redacted_because',
      'replaces_state',
      'transaction_id',
    ]) &&
    isIntegerOrUndefined(objectKey(value, 'age')) &&
    isJsonObjectOrUndefined(objectKey(value, 'prev_content')) &&
    (isUndefined(objectKey(value, 'prev_sender')) ||
      isMatrixUserId(objectKey(value, 'prev_sender'))) &&
    (isUndefined(objectKey(value, 'redacted_because')) ||
      isMatrixSyncResponseEventDTO(objectKey(value, 'redacted_because'))) &&
    isStringOrUndefined(objectKey(value, 'replaces_state')) &&
    isStringOrUndefined(objectKey(value, 'transaction_id'))
  );
}

export function assertMatrixSyncResponseUnsignedDataDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError('Value was not regular object');
  }

  if (
    !hasNoOtherKeysInDevelopment(value, [
      'age',
      'prev_content',
      'prev_sender',
      'redacted_because',
      'replaces_state',
      'transaction_id',
    ])
  ) {
    throw new TypeError(`Value had extra properties: All keys: ${keys(value)}`);
  }

  if (!isIntegerOrUndefined(objectKey(value, 'age'))) {
    throw new TypeError(
      `Property "age" was not valid: ${objectKey(value, 'age')}`,
    );
  }

  if (!isJsonObjectOrUndefined(objectKey(value, 'prev_content'))) {
    throw new TypeError(
      `Property "prev_content" was not valid: ${objectKey(value, 'prev_content')}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'prev_sender')) ||
      isMatrixUserId(objectKey(value, 'prev_sender'))
    )
  ) {
    throw new TypeError(
      `Property "prev_sender" was not valid: ${objectKey(value, 'prev_sender')}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'redacted_because')) ||
      isMatrixSyncResponseEventDTO(objectKey(value, 'redacted_because'))
    )
  ) {
    throw new TypeError(
      `Property "redacted_because" was not valid: ${objectKey(value, 'redacted_because')}`,
    );
  }

  if (!isStringOrUndefined(objectKey(value, 'replaces_state'))) {
    throw new TypeError(
      `Property "replaces_state" was not valid: ${objectKey(value, 'replaces_state')}`,
    );
  }

  if (!isStringOrUndefined(objectKey(value, 'transaction_id'))) {
    throw new TypeError(
      `Property "transaction_id" was not valid: ${objectKey(value, 'transaction_id')}`,
    );
  }
}

export function explainMatrixSyncResponseUnsignedDataDTO(
  value: unknown,
): string {
  try {
    assertMatrixSyncResponseUnsignedDataDTO(value);
    return 'No errors detected';
  } catch (err: any) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseUnsignedDataDTO(
  value: MatrixSyncResponseUnsignedDataDTO,
): string {
  return `MatrixSyncResponseUnsignedData(${value})`;
}

export function parseMatrixSyncResponseUnsignedDataDTO(
  value: unknown,
): MatrixSyncResponseUnsignedDataDTO | undefined {
  if (isMatrixSyncResponseUnsignedDataDTO(value)) return value;
  return undefined;
}
