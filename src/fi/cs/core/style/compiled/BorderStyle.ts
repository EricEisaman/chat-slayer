import {BorderType, isBorderType} from '../types/BorderType';
import {Size, isSize} from '../types/Size';
import {Color, isColor} from '../types/Color';
import {isUndefined} from '../../types/undefined';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface BorderStyle {
  readonly size?: Size;
  readonly type?: BorderType;
  readonly radius?: Size;
  readonly color?: Color;
}

export function createBorderStyle(
  size?: Size,
  color?: Color,
  type?: BorderType,
  radius?: Size,
): BorderStyle {
  return {
    size,
    color,
    type,
    radius,
  };
}

export function isBorderStyle(value: unknown): value is BorderStyle {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['size', 'type', 'radius', 'color']) &&
    (isUndefined(objectKey(value, 'size')) ||
      isSize(objectKey(value, 'size'))) &&
    (isUndefined(objectKey(value, 'type')) ||
      isBorderType(objectKey(value, 'type'))) &&
    (isUndefined(objectKey(value, 'radius')) ||
      isSize(objectKey(value, 'radius'))) &&
    (isUndefined(objectKey(value, 'color')) ||
      isColor(objectKey(value, 'color')))
  );
}

export function stringifyBorderStyle(value: BorderStyle): string {
  return `BorderStyle(${value})`;
}

export function parseBorderStyle(value: unknown): BorderStyle | undefined {
  if (isBorderStyle(value)) return value;
  return undefined;
}
