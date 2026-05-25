import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixHomeServerDTO {
  readonly base_url: string;
}

export function createMatrixHomeServerDTO(
  base_url: string,
): MatrixHomeServerDTO {
  return {
    base_url,
  };
}

export function isMatrixHomeServerDTO(
  value: unknown,
): value is MatrixHomeServerDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['base_url']) &&
    isString(objectKey(value, 'base_url'))
  );
}

export function stringifyMatrixHomeServerDTO(
  value: MatrixHomeServerDTO,
): string {
  if (!isMatrixHomeServerDTO(value))
    throw new TypeError(`Not MatrixHomeServerDTO: ${value}`);
  return `MatrixHomeServerDTO(${value})`;
}

export function parseMatrixHomeServerDTO(
  value: unknown,
): MatrixHomeServerDTO | undefined {
  if (isMatrixHomeServerDTO(value)) return value;
  return undefined;
}
