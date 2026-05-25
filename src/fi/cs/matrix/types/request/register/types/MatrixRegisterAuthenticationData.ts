import {isString, isStringOrUndefined} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixRegisterAuthenticationData {
  readonly type: string;
  readonly session?: string;
}

export function isMatrixRegisterAuthenticationData(
  value: unknown,
): value is MatrixRegisterAuthenticationData {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['type', 'session']) &&
    isString(objectKey(value, 'type')) &&
    isStringOrUndefined(objectKey(value, 'session'))
  );
}

export function stringifyMatrixRegisterAuthenticationData(
  value: MatrixRegisterAuthenticationData,
): string {
  return `MatrixRegisterAuthenticationData(${value})`;
}

export function parseMatrixRegisterAuthenticationData(
  value: unknown,
): MatrixRegisterAuthenticationData | undefined {
  if (isMatrixRegisterAuthenticationData(value)) return value;
  return undefined;
}
