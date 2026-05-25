import {MatrixUserId, isMatrixUserId} from '../../../core/MatrixUserId';
import {isUndefined} from '../../../../../core/types/undefined';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';
import {keys} from '../../../../../core/functions/keys';
import {isArrayOf, isArrayOfOrUndefined} from '../../../../../core/types/Array';

export interface MatrixSyncResponseDeviceListsDTO {
  readonly changed?: readonly MatrixUserId[];
  readonly left?: readonly MatrixUserId[] | undefined;
}

export function isMatrixSyncResponseDeviceListsDTO(
  value: unknown,
): value is MatrixSyncResponseDeviceListsDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['changed', 'left']) &&
    isArrayOfOrUndefined<MatrixUserId>(
      objectKey(value, 'changed'),
      isMatrixUserId,
    ) &&
    (isUndefined(objectKey(value, 'left')) ||
      isArrayOf<MatrixUserId>(objectKey(value, 'left'), isMatrixUserId))
  );
}

export function assertMatrixSyncResponseDeviceListsDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError(`Value not regular object: ${value}`);
  }

  if (!hasNoOtherKeysInDevelopment(value, ['changed', 'left'])) {
    throw new TypeError(`Value properties not right: ${keys(value)}`);
  }

  if (!isArrayOf<MatrixUserId>(objectKey(value, 'changed'), isMatrixUserId)) {
    throw new TypeError(
      `Property "changed" not valid: ${objectKey(value, 'changed')}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'left')) ||
      isArrayOf<MatrixUserId>(objectKey(value, 'left'), isMatrixUserId)
    )
  ) {
    throw new TypeError(
      `Property "left" not valid: ${objectKey(value, 'left')}`,
    );
  }
}

export function explainMatrixSyncResponseDeviceListsDTO(
  value: unknown,
): string {
  try {
    assertMatrixSyncResponseDeviceListsDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseDeviceListsDTO(
  value: MatrixSyncResponseDeviceListsDTO,
): string {
  return `MatrixSyncResponseDeviceListsDTO(${value})`;
}

export function parseMatrixSyncResponseDeviceListsDTO(
  value: unknown,
): MatrixSyncResponseDeviceListsDTO | undefined {
  if (isMatrixSyncResponseDeviceListsDTO(value)) return value;
  return undefined;
}
