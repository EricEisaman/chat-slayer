import {isBooleanOrUndefined} from '../../../../core/types/Boolean';
import {isString, isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixWhoAmIResponseDTO {
  readonly user_id: string;
  readonly device_id?: string;
  readonly is_guest?: boolean;
}

export function createMatrixWhoAmIResponseDTO(
  user_id: string,
  device_id?: string | undefined,
  is_guest?: boolean | undefined,
): MatrixWhoAmIResponseDTO {
  return {
    user_id,
    device_id,
    is_guest,
  };
}

export function isMatrixWhoAmIResponseDTO(
  value: unknown,
): value is MatrixWhoAmIResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['device_id', 'is_guest', 'user_id']) &&
    isString(objectKey(value, 'user_id')) &&
    isStringOrUndefined(objectKey(value, 'device_id')) &&
    isBooleanOrUndefined(objectKey(value, 'is_guest'))
  );
}

export function stringifyMatrixWhoAmIResponseDTO(
  value: MatrixWhoAmIResponseDTO,
): string {
  return `MatrixWhoAmIResponseDTO(${value})`;
}

export function parseMatrixWhoAmIResponseDTO(
  value: unknown,
): MatrixWhoAmIResponseDTO | undefined {
  if (isMatrixWhoAmIResponseDTO(value)) return value;
  return undefined;
}
