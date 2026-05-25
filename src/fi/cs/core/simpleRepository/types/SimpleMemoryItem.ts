import {
  SimpleStoredRepositoryItem,
  StoredRepositoryItemTestCallback,
} from './SimpleStoredRepositoryItem';
import {isBoolean} from '../../types/Boolean';
import {isString} from '../../types/String';
import {isNumber} from '../../types/Number';
import {isStringArrayOrUndefined} from '../../types/StringArray';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface SimpleMemoryItem<T extends SimpleStoredRepositoryItem> {
  readonly id: string;
  readonly version: number;
  readonly data: T;
  readonly deleted: boolean;
  readonly members?: readonly string[];
  readonly invited?: readonly string[];
}

export function createMemoryItem<T extends SimpleStoredRepositoryItem>(
  id: string,
  version: number,
  data: T,
  deleted: boolean,
  members?: readonly string[],
  invited?: readonly string[],
): SimpleMemoryItem<T> {
  return {
    id,
    version,
    data,
    deleted,
    members,
    invited,
  };
}

export function isMemoryItem<T extends SimpleStoredRepositoryItem>(
  value: any,
  isT: StoredRepositoryItemTestCallback,
): value is SimpleMemoryItem<T> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'id',
      'version',
      'data',
      'deleted',
      'members',
      'invited',
    ]) &&
    isString(objectKey(value, 'id')) &&
    isNumber(objectKey(value, 'version')) &&
    isT(objectKey(value, 'data')) &&
    isBoolean(objectKey(value, 'deleted')) &&
    isStringArrayOrUndefined(objectKey(value, 'members')) &&
    isStringArrayOrUndefined(objectKey(value, 'invited'))
  );
}
