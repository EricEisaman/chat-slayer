//

import {isBoolean} from '../types/Boolean';
import {isRegularObject, objectKey} from './RegularObject';
import {hasNoOtherKeys} from './OtherKeys';

export interface HealthCheckDTO {
  readonly ready?: boolean;
}

export function createHealthCheckDTO(ready: boolean): HealthCheckDTO {
  return {ready};
}

export function isHealthCheckDTO(value: unknown): value is HealthCheckDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['ready']) &&
    isBoolean(objectKey(value, 'ready'))
  );
}

export function stringifyHealthCheckDTO(value: HealthCheckDTO): string {
  return `HealthCheckDTO(${value.ready})`;
}

export function parseHealthCheckDTO(
  value: unknown,
): HealthCheckDTO | undefined {
  if (isHealthCheckDTO(value)) return value;
  if (isBoolean(value)) return createHealthCheckDTO(value);
  return undefined;
}
