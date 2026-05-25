import {isUndefined} from '../../../../../core/types/undefined';
import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../../../../core/types/explain';
import {
  explainNumberOrUndefined,
  isNumberOrUndefined,
} from '../../../../../core/types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../../../../core/types/OtherKeys';

export interface MatrixNotificationPowerLevelsDTO {
  readonly room: number;
}

export function isMatrixNotificationPowerLevelsDTO(
  value: unknown,
): value is MatrixNotificationPowerLevelsDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['room']) &&
    isNumberOrUndefined(objectKey(value, 'room'))
  );
}

export function explainMatrixNotificationPowerLevelsDTO(
  value: unknown,
): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['room']),
    explainProperty('room', explainNumberOrUndefined(objectKey(value, 'room'))),
  ]);
}

export function isMatrixNotificationPowerLevelsDTOOrUndefined(
  value: unknown,
): value is MatrixNotificationPowerLevelsDTO | undefined {
  return isUndefined(value) || isMatrixNotificationPowerLevelsDTO(value);
}

export function explainMatrixNotificationPowerLevelsDTOOrUndefined(
  value: unknown,
): string {
  return isMatrixNotificationPowerLevelsDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['MatrixNotificationPowerLevelsDTO', 'undefined']));
}

export function stringifyMatrixNotificationPowerLevelsDTO(
  value: MatrixNotificationPowerLevelsDTO,
): string {
  return `MatrixNotificationPowerLevelsDTO(${value})`;
}

export function parseMatrixNotificationPowerLevelsDTO(
  value: unknown,
): MatrixNotificationPowerLevelsDTO | undefined {
  if (isMatrixNotificationPowerLevelsDTO(value)) return value;
  return undefined;
}
