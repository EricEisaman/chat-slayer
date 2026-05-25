import {isJsonObject, JsonObject} from '../../../../../core/Json';
import {MatrixType, isMatrixType} from '../../../core/MatrixType';
import {MatrixUserId, isMatrixUserId} from '../../../core/MatrixUserId';
import {isUndefined} from '../../../../../core/types/undefined';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixSyncResponseEventDTO {
  readonly content: JsonObject;
  readonly type: MatrixType;
  readonly sender?: MatrixUserId;
}

export function isMatrixSyncResponseEventDTO(
  value: unknown,
): value is MatrixSyncResponseEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['content', 'type', 'sender']) &&
    isJsonObject(objectKey(value, 'content')) &&
    isMatrixType(objectKey(value, 'type')) &&
    (isUndefined(objectKey(value, 'sender')) ||
      isMatrixUserId(objectKey(value, 'sender')))
  );
}

export function stringifyMatrixSyncResponseEventDTO(
  value: MatrixSyncResponseEventDTO,
): string {
  return `MatrixSyncResponseEventDTO(${value})`;
}

export function parseMatrixSyncResponseEventDTO(
  value: unknown,
): MatrixSyncResponseEventDTO | undefined {
  if (isMatrixSyncResponseEventDTO(value)) return value;
  return undefined;
}
