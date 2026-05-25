import {isString} from '../../types/String';

export type Color = string;

export function createColor(value: string): Color {
  return value;
}

export function isColor(value: unknown): value is Color {
  return isString(value);
}

export function stringifyColor(value: Color): string {
  return `Color(${value})`;
}

export function parseColor(value: unknown): Color | undefined {
  if (isColor(value)) return value;
  return undefined;
}
