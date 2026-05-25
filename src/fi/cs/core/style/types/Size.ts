import {isString} from '../../types/String';

export type Size = string;

export function createSize(value: string): Size {
  return value;
}

export function isSize(value: unknown): value is Size {
  return isString(value);
}

export function stringifySize(value: Size): string {
  return `Size(${value})`;
}

export function parseSize(value: unknown): Size | undefined {
  if (isSize(value)) return value;
  return undefined;
}
