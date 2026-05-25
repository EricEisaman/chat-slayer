import {SimpleStoredRepositoryItem} from '../../../../../core/simpleRepository/types/SimpleStoredRepositoryItem';
import {MatrixVisibility} from '../../../../types/request/createRoom/types/MatrixVisibility';
import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../core/types/OtherKeys';

export interface StoredRoomRepositoryItem extends SimpleStoredRepositoryItem {
  /**
   * Unique ID
   */
  readonly id: string;

  /** Current item data as JSON string
   */
  readonly target: string;

  readonly visibility: MatrixVisibility;
}

export function createStoredRoomRepositoryItem(
  id: string,
  target: string,
  visibility: MatrixVisibility,
): StoredRoomRepositoryItem {
  return {
    id,
    target,
    visibility,
  };
}

export function isStoredRoomRepositoryItem(
  value: unknown,
): value is StoredRoomRepositoryItem {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'target', 'visibility']) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'target')) &&
    isString(objectKey(value, 'visibility'))
  );
}

export function stringifyStoredRoomRepositoryItem(
  value: StoredRoomRepositoryItem,
): string {
  return `StoredRoomRepositoryItem(${value})`;
}

export function parseStoredRoomRepositoryItem(
  value: unknown,
): StoredRoomRepositoryItem | undefined {
  if (isStoredRoomRepositoryItem(value)) return value;
  return undefined;
}
