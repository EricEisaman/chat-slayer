import {
  explainSimpleRepositoryMember,
  isSimpleRepositoryMember,
  SimpleRepositoryMember,
} from './SimpleRepositoryMember';
import {ExplainCallback} from '../../types/ExplainCallback';
import {TestCallbackNonStandard} from '../../types/TestCallback';
import {explain, explainProperty} from '../../types/explain';
import {
  explainBooleanOrUndefined,
  isBooleanOrUndefined,
} from '../../types/Boolean';
import {explainString, isString} from '../../types/String';
import {explainNumber, isNumber} from '../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainArrayOrUndefinedOf,
  isArrayOrUndefinedOf,
} from '../../types/Array';

export interface SimpleRepositoryEntry<T> {
  readonly data: T;
  readonly id: string;
  readonly version: number;
  readonly deleted?: boolean;

  /**
   * Users who have active access to the resource (eg. joined in the Matrix room)
   */
  readonly members?: readonly SimpleRepositoryMember[];
}

export function createRepositoryEntry<T>(
  data: T,
  id: string,
  version: number,
  deleted?: boolean,
  members?: readonly SimpleRepositoryMember[],
): SimpleRepositoryEntry<T> {
  return {
    data,
    id,
    version,
    deleted,
    members,
  };
}

export function isRepositoryEntry<T>(
  value: any,
  isT: TestCallbackNonStandard,
): value is SimpleRepositoryEntry<T> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'data',
      'id',
      'version',
      'deleted',
      'members',
    ]) &&
    isT(objectKey(value, 'data')) &&
    isString(objectKey(value, 'id')) &&
    isNumber(objectKey(value, 'version')) &&
    isBooleanOrUndefined(objectKey(value, 'deleted')) &&
    isArrayOrUndefinedOf<SimpleRepositoryMember>(
      objectKey(value, 'members'),
      isSimpleRepositoryMember,
    )
  );
}

export function explainRepositoryEntry(
  value: any,
  explainT: ExplainCallback,
): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'data',
      'id',
      'version',
      'deleted',
      'members',
    ]),
    explainProperty('data', explainT(objectKey(value, 'data'))),
    explainProperty('id', explainString(objectKey(value, 'id'))),
    explainProperty('version', explainNumber(objectKey(value, 'version'))),
    explainProperty(
      'deleted',
      explainBooleanOrUndefined(objectKey(value, 'deleted')),
    ),
    explainProperty(
      'members',
      explainArrayOrUndefinedOf<SimpleRepositoryMember>(
        'RepositoryMember',
        explainSimpleRepositoryMember,
        objectKey(value, 'members'),
        isSimpleRepositoryMember,
      ),
    ),
  ]);
}
