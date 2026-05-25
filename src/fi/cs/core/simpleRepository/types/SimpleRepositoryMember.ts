import {explain, explainProperty} from '../../types/explain';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../types/OtherKeys';

export interface SimpleRepositoryMember {
  readonly id: string;
  readonly displayName?: string;
  readonly avatarUrl?: string;
}

export function createSimpleRepositoryMember(
  id: string,
  displayName?: string,
  avatarUrl?: string,
): SimpleRepositoryMember {
  return {
    id,
    displayName,
    avatarUrl,
  };
}

export function isSimpleRepositoryMember(
  value: unknown,
): value is SimpleRepositoryMember {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'displayName', 'avatarUrl']) &&
    isString(objectKey(value, 'id')) &&
    isStringOrUndefined(objectKey(value, 'displayName')) &&
    isStringOrUndefined(objectKey(value, 'avatarUrl'))
  );
}

export function explainSimpleRepositoryMember(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['id', 'displayName', 'avatarUrl']),
    explainProperty('id', explainString(objectKey(value, 'id'))),
    explainProperty(
      'displayName',
      explainStringOrUndefined(objectKey(value, 'displayName')),
    ),
    explainProperty(
      'avatarUrl',
      explainStringOrUndefined(objectKey(value, 'avatarUrl')),
    ),
  ]);
}

export function stringifySimpleRepositoryMember(
  value: SimpleRepositoryMember,
): string {
  return `RepositoryMember(${value})`;
}

export function parseSimpleRepositoryMember(
  value: unknown,
): SimpleRepositoryMember | undefined {
  if (isSimpleRepositoryMember(value)) return value;
  return undefined;
}
