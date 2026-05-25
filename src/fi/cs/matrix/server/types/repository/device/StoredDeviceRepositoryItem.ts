import {SimpleStoredRepositoryItem} from '../../../../../core/simpleRepository/types/SimpleStoredRepositoryItem';
import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../core/types/OtherKeys';

export interface StoredDeviceRepositoryItem extends SimpleStoredRepositoryItem {
  /**
   * Unique internal ID
   */
  readonly id: string;

  /**
   * The user who this device belongs to
   */
  readonly userId: string;

  /**
   * Unique device ID which may be provided by the client
   */
  readonly deviceId: string;

  /** Current item data as JSON string
   */
  readonly target: string;
}

export function createStoredDeviceRepositoryItem(
  id: string,
  userId: string,
  deviceId: string,
  target: string,
): StoredDeviceRepositoryItem {
  return {
    id,
    userId,
    deviceId,
    target,
  };
}

export function isStoredDeviceRepositoryItem(
  value: unknown,
): value is StoredDeviceRepositoryItem {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'userId', 'deviceId', 'target']) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'userId')) &&
    isString(objectKey(value, 'deviceId')) &&
    isString(objectKey(value, 'target'))
  );
}

export function stringifyStoredDeviceRepositoryItem(
  value: StoredDeviceRepositoryItem,
): string {
  return `StoredDeviceRepositoryItem(${value})`;
}

export function parseStoredDeviceRepositoryItem(
  value: unknown,
): StoredDeviceRepositoryItem | undefined {
  if (isStoredDeviceRepositoryItem(value)) return value;
  return undefined;
}
