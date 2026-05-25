import {MatrixType} from '../../../core/MatrixType';
import {MatrixUserId} from '../../../core/MatrixUserId';
import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixIdentifierDTO {
  readonly type: MatrixType.M_ID_USER;
  readonly user: string | MatrixUserId;
}

export function createMatrixIdentifierDTO(
  user: string | MatrixUserId,
): MatrixIdentifierDTO {
  return {
    type: MatrixType.M_ID_USER,
    user,
  };
}

export function isMatrixIdentifierDTO(
  value: unknown,
): value is MatrixIdentifierDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['user', 'type']) &&
    objectKey(value, 'type') === MatrixType.M_ID_USER &&
    isString(objectKey(value, 'user'))
  );
}

export function stringifyMatrixIdentifierDTO(
  value: MatrixIdentifierDTO,
): string {
  return `MatrixIdentifierDTO(${value})`;
}

export function parseMatrixIdentifierDTO(
  value: unknown,
): MatrixIdentifierDTO | undefined {
  if (isMatrixIdentifierDTO(value)) return value;
  return undefined;
}
