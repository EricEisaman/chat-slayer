import {SimpleStoredRepositoryItem} from '../../../../../core/simpleRepository/types/SimpleStoredRepositoryItem';
import {isString, isStringOrUndefined} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../core/types/OtherKeys';

export interface StoredUserRepositoryItem extends SimpleStoredRepositoryItem {
  /**
   * Unique ID in the database
   */
  readonly id: string;

  /**
   * Unique username
   */
  readonly username: string;

  /**
   * Email address
   */
  readonly email?: string;

  /** Current item data as JSON string
   */
  readonly target: string;
}

export function createStoredUserRepositoryItem(
  id: string,
  target: string,
  username: string,
  email?: string | undefined,
): StoredUserRepositoryItem {
  return {
    id,
    username,
    email,
    target,
  };
}

export function isStoredUserRepositoryItem(
  value: unknown,
): value is StoredUserRepositoryItem {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'username', 'email', 'target']) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'username')) &&
    isStringOrUndefined(objectKey(value, 'email')) &&
    isString(objectKey(value, 'target'))
  );
}

export function stringifyStoredUserRepositoryItem(
  value: StoredUserRepositoryItem,
): string {
  return `StoredUserRepositoryItem(${value})`;
}

export function parseStoredUserRepositoryItem(
  value: unknown,
): StoredUserRepositoryItem | undefined {
  if (isStoredUserRepositoryItem(value)) return value;
  return undefined;
}
