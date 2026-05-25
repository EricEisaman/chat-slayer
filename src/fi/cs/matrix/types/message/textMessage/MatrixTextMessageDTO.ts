import {isMatrixType, MatrixType} from '../../core/MatrixType';
import {isString} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

/**
 */
export interface MatrixTextMessageDTO {
  readonly msgtype: MatrixType;
  readonly body: string;
}

export function createMatrixTextMessageDTO(body: string): MatrixTextMessageDTO {
  return {
    msgtype: MatrixType.M_TEXT,
    body,
  };
}

export function isMatrixTextMessageDTO(
  value: unknown,
): value is MatrixTextMessageDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['msgtype', 'body']) &&
    isMatrixType(objectKey(value, 'msgtype')) &&
    isString(objectKey(value, 'body'))
  );
}

export function stringifyMatrixTextMessageDTO(
  value: MatrixTextMessageDTO,
): string {
  return `MatrixTextMessageDTO(${value})`;
}

export function parseMatrixTextMessageDTO(
  value: unknown,
): MatrixTextMessageDTO | undefined {
  if (isMatrixTextMessageDTO(value)) return value;
  return undefined;
}
