import {
  MatrixRegisterAuthenticationData,
  isMatrixRegisterAuthenticationData,
} from './types/MatrixRegisterAuthenticationData';
import {isUndefined} from '../../../../core/types/undefined';
import {isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixRegisterRequestDTO {
  readonly auth?: MatrixRegisterAuthenticationData;
  readonly username?: string;
  readonly password?: string;
  readonly device_id?: string;
  readonly initial_device_display_name?: string;
  readonly inhibit_login?: boolean;
}

export function createMatrixRegisterRequestDTO(
  auth?: MatrixRegisterAuthenticationData,
  username?: string,
  password?: string,
  device_id?: string,
  initial_device_display_name?: string,
  inhibit_login?: boolean,
): MatrixRegisterRequestDTO {
  return {
    auth,
    username,
    password,
    device_id,
    initial_device_display_name,
    inhibit_login,
  };
}

export function isMatrixMatrixRegisterRequestDTO(
  value: unknown,
): value is MatrixRegisterRequestDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'auth',
      'username',
      'password',
      'device_id',
      'initial_device_display_name',
      'inhibit_login',
    ]) &&
    (isUndefined(objectKey(value, 'auth')) ||
      isMatrixRegisterAuthenticationData(objectKey(value, 'auth'))) &&
    isStringOrUndefined(objectKey(value, 'username')) &&
    isStringOrUndefined(objectKey(value, 'password')) &&
    isStringOrUndefined(objectKey(value, 'device_id')) &&
    isStringOrUndefined(objectKey(value, 'initial_device_display_name')) &&
    isStringOrUndefined(objectKey(value, 'inhibit_login'))
  );
}

export function stringifyMatrixMatrixRegisterRequestDTO(
  value: MatrixRegisterRequestDTO,
): string {
  return `MatrixMatrixRegisterDTO(${value})`;
}

export function parseMatrixMatrixRegisterRequestDTO(
  value: unknown,
): MatrixRegisterRequestDTO | undefined {
  if (isMatrixMatrixRegisterRequestDTO(value)) return value;
  return undefined;
}
