//

import {explain, explainProperty} from './explain';
import {explainString, isString} from './String';
import {explainNumberOrUndefined, isNumberOrUndefined} from './Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from './RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from './OtherKeys';

export interface ErrorDTO {
  readonly error: string;
  readonly code?: number;
}

export function createErrorDTO(error: string, code?: number): ErrorDTO {
  return {
    error,
    code,
  };
}

export function isErrorDTO(value: unknown): value is ErrorDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['error', 'code']) &&
    isString(objectKey(value, 'error')) &&
    isNumberOrUndefined(objectKey(value, 'code'))
  );
}

export function explainErrorDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['error', 'code']),
    explainProperty('error', explainString(objectKey(value, 'error'))),
    explainProperty('code', explainNumberOrUndefined(objectKey(value, 'code'))),
  ]);
}

export function stringifyErrorDTO(value: ErrorDTO): string {
  return `ErrorDTO(${value})`;
}

export function parseErrorDTO(value: unknown): ErrorDTO | undefined {
  if (isErrorDTO(value)) return value;
  return undefined;
}
