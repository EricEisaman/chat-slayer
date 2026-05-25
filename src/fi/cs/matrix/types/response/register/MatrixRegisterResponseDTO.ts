import {isString, isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixRegisterResponseDTO {
  readonly user_id: string;
  readonly access_token?: string;

  /**
   * @deprecated Clients should extract the server_name from user_id
   */
  readonly home_server?: string;

  readonly device_id?: string;
}

export function createMatrixRegisterResponseDTO(
  user_id: string,
  access_token?: string,
  home_server?: string,
  device_id?: string,
): MatrixRegisterResponseDTO {
  return {
    user_id,
    access_token,
    home_server,
    device_id,
  };
}

export function isMatrixRegisterResponseDTO(
  value: unknown,
): value is MatrixRegisterResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'user_id',
      'access_token',
      'home_server',
      'device_id',
    ]) &&
    isString(objectKey(value, 'user_id')) &&
    isStringOrUndefined(objectKey(value, 'access_token')) &&
    isStringOrUndefined(objectKey(value, 'home_server')) &&
    isStringOrUndefined(objectKey(value, 'device_id'))
  );
}

export function stringifyMatrixRegisterResponseDTO(
  value: MatrixRegisterResponseDTO,
): string {
  return `MatrixRegisterResponseDTO(${value})`;
}

export function parseMatrixRegisterResponseDTO(
  value: unknown,
): MatrixRegisterResponseDTO | undefined {
  if (isMatrixRegisterResponseDTO(value)) return value;
  return undefined;
}
