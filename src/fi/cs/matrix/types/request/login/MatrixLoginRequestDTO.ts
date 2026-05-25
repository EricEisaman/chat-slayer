import {
  isMatrixIdentifierDTO,
  MatrixIdentifierDTO,
} from './types/MatrixIdentifierDTO';
import {isMatrixLoginType, MatrixLoginType} from './MatrixLoginType';
import {MatrixUserId} from '../../core/MatrixUserId';
import {isUndefined} from '../../../../core/types/undefined';
import {isString, isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixLoginRequestDTO {
  readonly type: MatrixLoginType;
  readonly identifier?: MatrixIdentifierDTO;

  /**
   * Required when type is MatrixLoginType.M_LOGIN_PASSWORD
   */
  readonly password?: string;

  readonly device_id?: string;

  /**
   * Use `identifier`
   * @deprecated
   */
  readonly address?: string;

  readonly initial_device_display_name?: string;

  /**
   * Use `identifier`
   * @deprecated
   */
  readonly medium?: string;

  /**
   * Required when type is MatrixLoginType.M_LOGIN_TOKEN
   */
  readonly token?: string;

  /**
   * Use `identifier`
   * @deprecated
   */
  readonly user?: MatrixUserId | string;
}

export function isMatrixLoginRequestDTO(
  value: unknown,
): value is MatrixLoginRequestDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'type',
      'identifier',
      'password',
      'device_id',
      'address',
      'initial_device_display_name',
      'medium',
      'token',
      'user',
    ]) &&
    isMatrixLoginType(objectKey(value, 'type')) &&
    (isUndefined(objectKey(value, 'identifier')) ||
      isMatrixIdentifierDTO(objectKey(value, 'identifier'))) &&
    (objectKey(value, 'type') === MatrixLoginType.M_LOGIN_PASSWORD
      ? isString(objectKey(value, 'password'))
      : isStringOrUndefined(objectKey(value, 'password'))) &&
    isStringOrUndefined(objectKey(value, 'device_id')) &&
    isStringOrUndefined(objectKey(value, 'address')) &&
    isStringOrUndefined(objectKey(value, 'initial_device_display_name')) &&
    isStringOrUndefined(objectKey(value, 'medium')) &&
    (objectKey(value, 'type') === MatrixLoginType.M_LOGIN_TOKEN
      ? isString(objectKey(value, 'token'))
      : isStringOrUndefined(objectKey(value, 'token'))) &&
    isStringOrUndefined(objectKey(value, 'user'))
  );
}

export function stringifyMatrixLoginRequestDTO(
  value: MatrixLoginRequestDTO,
): string {
  return `MatrixLoginRequestDTO(${value})`;
}

export function parseMatrixLoginRequestDTO(
  value: unknown,
): MatrixLoginRequestDTO | undefined {
  if (isMatrixLoginRequestDTO(value)) return value;
  return undefined;
}
