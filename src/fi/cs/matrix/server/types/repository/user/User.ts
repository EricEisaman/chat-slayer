import {isString, isStringOrUndefined} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../core/types/OtherKeys';

export interface User {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly email?: string;
}

export function createUser(
  id: string,
  username: string,
  password: string,
  email?: string | undefined,
): User {
  return {
    id,
    username,
    password,
    email,
  };
}

export function isUser(value: unknown): value is User {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'username', 'password', 'email']) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'username')) &&
    isString(objectKey(value, 'password')) &&
    isStringOrUndefined(objectKey(value, 'email'))
  );
}

export function stringifyUser(value: User): string {
  return `User(${value})`;
}

export function parseUser(value: unknown): User | undefined {
  if (isUser(value)) return value;
  return undefined;
}
