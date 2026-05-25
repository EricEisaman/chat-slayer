import {isString} from '../../../../../core/types/String';
import {isInteger} from '../../../../../core/types/Number';
import {isRegularObjectOf} from '../../../../../core/types/RegularObject';

export interface MatrixSyncResponseDeviceOneTimeKeysCountDTO {
  readonly [key: string]: number;
}

export function isMatrixSyncResponseDeviceOneTimeKeysCountDTO(
  value: unknown,
): value is MatrixSyncResponseDeviceOneTimeKeysCountDTO {
  return isRegularObjectOf<string, number>(value, isString, isInteger);
}

export function stringifyMatrixSyncResponseDeviceOneTimeKeysCountDTO(
  value: MatrixSyncResponseDeviceOneTimeKeysCountDTO,
): string {
  return `MatrixSyncResponseDeviceOneTimeKeysCountDTO(${value})`;
}

export function parseMatrixSyncResponseDeviceOneTimeKeysCountDTO(
  value: unknown,
): MatrixSyncResponseDeviceOneTimeKeysCountDTO | undefined {
  if (isMatrixSyncResponseDeviceOneTimeKeysCountDTO(value)) return value;
  return undefined;
}
