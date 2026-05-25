import {Color, isColor} from '../types/Color';
import {isUndefined} from '../../types/undefined';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface BackgroundStyle {
  readonly color?: Color;
}

export function createBackgroundStyle(color?: Color): BackgroundStyle {
  return {
    color,
  };
}

export function isBackgroundStyle(value: unknown): value is BackgroundStyle {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['color']) &&
    (isUndefined(objectKey(value, 'color')) ||
      isColor(objectKey(value, 'color')))
  );
}

export function stringifyBackgroundStyle(value: BackgroundStyle): string {
  return `BackgroundStyle(${value})`;
}

export function parseBackgroundStyle(
  value: unknown,
): BackgroundStyle | undefined {
  if (isBackgroundStyle(value)) return value;
  return undefined;
}
