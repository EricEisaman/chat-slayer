import {isInteger} from '../../../../../core/types/Number';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixSyncResponseUnreadNotificationCountsDTO {
  readonly highlight_count: number;
  readonly notification_count: number;
}

export function isMatrixSyncResponseUnreadNotificationCountsDTO(
  value: unknown,
): value is MatrixSyncResponseUnreadNotificationCountsDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'highlight_count',
      'notification_count',
    ]) &&
    isInteger(objectKey(value, 'highlight_count')) &&
    isInteger(objectKey(value, 'notification_count'))
  );
}

export function stringifyMatrixSyncResponseUnreadNotificationCountsDTO(
  value: MatrixSyncResponseUnreadNotificationCountsDTO,
): string {
  return `MatrixSyncResponseUnreadNotificationCountsDTO(${value})`;
}

export function parseMatrixSyncResponseUnreadNotificationCountsDTO(
  value: unknown,
): MatrixSyncResponseUnreadNotificationCountsDTO | undefined {
  if (isMatrixSyncResponseUnreadNotificationCountsDTO(value)) return value;
  return undefined;
}
