import {isString} from '../../../core/types/String';
import {isRegularObject, objectKey} from '../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../core/types/OtherKeys';

export interface MatrixEventContentDTO {
  readonly body: string;
  readonly msgtype: string;
}

export function isMatrixEventContentDTO(
  value: unknown,
): value is MatrixEventContentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['body', 'msgtype']) &&
    isString(objectKey(value, 'body')) &&
    isString(objectKey(value, 'msgtype'))
  );
}

export function stringifyMatrixEventContentDTO(
  value: MatrixEventContentDTO,
): string {
  return `MatrixEventContentDTO(${value})`;
}

export function parseMatrixEventContentDTO(
  value: unknown,
): MatrixEventContentDTO | undefined {
  if (isMatrixEventContentDTO(value)) return value;
  return undefined;
}
