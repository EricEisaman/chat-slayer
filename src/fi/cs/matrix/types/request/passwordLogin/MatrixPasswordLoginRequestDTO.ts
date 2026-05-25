import {MatrixIdentifierDTO} from '../login/types/MatrixIdentifierDTO';
import {objectKey} from '../../../../core/types/RegularObject';

import {MatrixLoginType} from '../login/MatrixLoginType';
import {
  isMatrixLoginRequestDTO,
  MatrixLoginRequestDTO,
} from '../login/MatrixLoginRequestDTO';

export interface MatrixPasswordLoginRequestDTO extends MatrixLoginRequestDTO {
  readonly type: MatrixLoginType.M_LOGIN_PASSWORD;
  readonly identifier: MatrixIdentifierDTO;
  readonly password: string;
}

export function createMatrixPasswordLoginRequestDTO(
  identifier: MatrixIdentifierDTO,
  password: string,
): MatrixPasswordLoginRequestDTO {
  return {
    type: MatrixLoginType.M_LOGIN_PASSWORD,
    identifier,
    password,
  };
}

export function isMatrixPasswordLoginRequestDTO(
  value: unknown,
): value is MatrixPasswordLoginRequestDTO {
  return (
    isMatrixLoginRequestDTO(value) &&
    objectKey(value, 'type') === MatrixLoginType.M_LOGIN_PASSWORD
  );
}

export function stringifyMatrixPasswordLoginRequestDTO(
  value: MatrixPasswordLoginRequestDTO,
): string {
  return `MatrixPasswordLoginDTO(${value})`;
}

export function parseMatrixPasswordLoginRequestDTO(
  value: unknown,
): MatrixPasswordLoginRequestDTO | undefined {
  if (isMatrixPasswordLoginRequestDTO(value)) return value;
  return undefined;
}
