import {isArray} from '../../../../core/types/Array';
import {isString, isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixAuthFlowDTO {
  readonly stages: readonly string[];
}

export function createMatrixAuthFlowDTO(
  stages: readonly string[],
): MatrixAuthFlowDTO {
  return {stages};
}

export function isMatrixAuthFlowDTO(
  value: unknown,
): value is MatrixAuthFlowDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['stages']) &&
    (() => {
      const stages = objectKey(value, 'stages');
      return (
        stages !== undefined &&
        isArray(stages) &&
        stages.every((s: unknown) => isString(s))
      );
    })()
  );
}

export interface MatrixAuthFlowsResponseDTO {
  readonly flows: readonly MatrixAuthFlowDTO[];
  readonly params: Readonly<Record<string, unknown>>;
  readonly session: string;
  readonly completed?: readonly string[];
}

export function createMatrixAuthFlowsResponseDTO(
  session: string,
  flows: readonly MatrixAuthFlowDTO[] = [
    createMatrixAuthFlowDTO(['m.login.dummy']),
  ],
  params: Readonly<Record<string, unknown>> = {},
  completed?: readonly string[],
): MatrixAuthFlowsResponseDTO {
  return {
    flows,
    params,
    session,
    completed,
  };
}

export function isMatrixAuthFlowsResponseDTO(
  value: unknown,
): value is MatrixAuthFlowsResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'flows',
      'params',
      'session',
      'completed',
    ]) &&
    isString(objectKey(value, 'session')) &&
    (() => {
      const flows = objectKey(value, 'flows');
      return (
        flows !== undefined &&
        isArray(flows) &&
        flows.every((f: unknown) => isMatrixAuthFlowDTO(f))
      );
    })() &&
    isRegularObject(objectKey(value, 'params'))
  );
}
