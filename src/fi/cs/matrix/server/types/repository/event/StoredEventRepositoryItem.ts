import {SimpleStoredRepositoryItem} from '../../../../../core/simpleRepository/types/SimpleStoredRepositoryItem';
import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../core/types/OtherKeys';

export interface StoredEventRepositoryItem extends SimpleStoredRepositoryItem {
  /**
   * Unique ID
   */
  readonly id: string;

  /** Current item data as JSON string
   */
  readonly target: string;

  readonly senderId: string;
  readonly roomId?: string;
}

export function createStoredEventRepositoryItem(
  id: string,
  target: string,
  senderId: string,
  roomId?: string,
): StoredEventRepositoryItem {
  return {
    id,
    target,
    senderId,
    roomId,
  };
}

export function isStoredEventRepositoryItem(
  value: unknown,
): value is StoredEventRepositoryItem {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'target']) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'target'))
  );
}

export function stringifyStoredEventRepositoryItem(
  value: StoredEventRepositoryItem,
): string {
  return `StoredEventRepositoryItem(${value})`;
}

export function parseStoredEventRepositoryItem(
  value: unknown,
): StoredEventRepositoryItem | undefined {
  if (isStoredEventRepositoryItem(value)) return value;
  return undefined;
}
