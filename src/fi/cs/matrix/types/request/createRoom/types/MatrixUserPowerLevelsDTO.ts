import {MatrixUserId, isMatrixUserId} from '../../../core/MatrixUserId';
import {isUndefined} from '../../../../../core/types/undefined';
import {
  explainNot,
  explainOk,
  explainOr,
} from '../../../../../core/types/explain';
import {isInteger} from '../../../../../core/types/Number';
import {isRegularObjectOf} from '../../../../../core/types/RegularObject';

export type MatrixUserPowerLevelsDTO = {
  [K in MatrixUserId]: number;
};

export function isMatrixUserPowerLevelsDTO(
  value: unknown,
): value is MatrixUserPowerLevelsDTO {
  return isRegularObjectOf<MatrixUserId, number>(
    value,
    isMatrixUserId,
    isInteger,
  );
}

export function explainMatrixUserPowerLevelsDTO(value: unknown): string {
  return isMatrixUserPowerLevelsDTO(value)
    ? explainOk()
    : explainNot('MatrixUserPowerLevelsDTO');
}

export function isMatrixUserPowerLevelsDTOOrUndefined(
  value: unknown,
): value is MatrixUserPowerLevelsDTO | undefined {
  return isUndefined(value) || isMatrixUserPowerLevelsDTO(value);
}

export function explainMatrixUserPowerLevelsDTOOrUndefined(
  value: unknown,
): string {
  return isMatrixUserPowerLevelsDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['MatrixUserPowerLevelsDTO', 'undefined']));
}

export function stringifyMatrixUserPowerLevelsDTO(
  value: MatrixUserPowerLevelsDTO,
): string {
  return `MatrixUserPowerLevelsDTO(${value})`;
}

export function parseMatrixUserPowerLevelsDTO(
  value: unknown,
): MatrixUserPowerLevelsDTO | undefined {
  if (isMatrixUserPowerLevelsDTO(value)) return value;
  return undefined;
}
