import {isMatrixType, MatrixType} from './MatrixType';
import {ReadonlyJsonObject} from '../../../core/Json';
import {TestCallbackNonStandardOf} from '../../../core/types/TestCallback';
import {isStringOrUndefined} from '../../../core/types/String';
import {isRegularObject, objectKey} from '../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../core/types/OtherKeys';

export interface MatrixStateEventOf<T extends ReadonlyJsonObject> {
  readonly type: MatrixType | string;
  readonly state_key?: string;
  readonly content: T;
}

export function isMatrixStateEventOf<T extends ReadonlyJsonObject>(
  value: any,
  isContent: TestCallbackNonStandardOf<T>,
): value is MatrixStateEventOf<T> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['type', 'state_key', 'content']) &&
    isMatrixType(objectKey(value, 'type')) &&
    isStringOrUndefined(objectKey(value, 'state_key')) &&
    isContent(objectKey(value, 'content'))
  );
}
