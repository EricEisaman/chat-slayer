import {isString} from '../../types/String';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface Font {
  readonly name: string;
  readonly family: string;
  readonly weight: string;
}

export function createFont(name: string, family: string, weight: string): Font {
  return {
    name,
    family,
    weight,
  };
}

export function isFont(value: unknown): value is Font {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['name', 'family', 'weight']) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'family')) &&
    isString(objectKey(value, 'weight'))
  );
}

export function stringifyFont(value: Font): string {
  return `Font(${value})`;
}

export function parseFont(value: unknown): Font | undefined {
  if (isFont(value)) return value;
  return undefined;
}
