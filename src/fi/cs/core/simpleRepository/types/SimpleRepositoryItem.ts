import {TestCallbackNonStandard} from '../../types/TestCallback';
import {isString} from '../../types/String';
import {isRegularObject, objectKey} from '../../types/RegularObject';

export interface SimpleRepositoryItem<T> {
  readonly id: string;
  readonly target: T;
}

export function isRepositoryItem<T>(
  value: any,
  isT: TestCallbackNonStandard,
): value is SimpleRepositoryItem<T> {
  return (
    isRegularObject(value) &&
    isString(objectKey(value, 'id')) &&
    isT(objectKey(value, 'target'))
  );
}
