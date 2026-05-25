import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixIdentityServerInformationDTO {
  readonly base_url: string;
}

export function createMatrixIdentityServerInformationDTO(
  base_url: string,
): MatrixIdentityServerInformationDTO {
  return {
    base_url,
  };
}

export function isMatrixIdentityServerInformationDTO(
  value: unknown,
): value is MatrixIdentityServerInformationDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['base_url']) &&
    isString(objectKey(value, 'base_url'))
  );
}

export function stringifyMatrixIdentityServerInformationDTO(
  value: MatrixIdentityServerInformationDTO,
): string {
  if (!isMatrixIdentityServerInformationDTO(value))
    throw new TypeError(`Not MatrixIdentityServerInformationDTO: ${value}`);
  return `MatrixIdentityServerInformationDTO(${value})`;
}

export function parseMatrixIdentityServerInformationDTO(
  value: unknown,
): MatrixIdentityServerInformationDTO | undefined {
  if (isMatrixIdentityServerInformationDTO(value)) return value;
  return undefined;
}
