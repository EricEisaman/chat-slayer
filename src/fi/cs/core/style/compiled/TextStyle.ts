import {Font, isFont} from '../types/Font';
import {Color, isColor} from '../types/Color';
import {Size, isSize} from '../types/Size';
import {isUndefined} from '../../types/undefined';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface TextStyle {
  readonly font?: Font;
  readonly color?: Color;
  readonly size?: Size;
}

export function createTextStyle(
  font?: Font,
  color?: Color,
  size?: Size,
): TextStyle {
  return {
    font,
    color,
    size,
  };
}

export function isTextStyle(value: unknown): value is TextStyle {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['font', 'color', 'size']) &&
    (isUndefined(objectKey(value, 'font')) ||
      isFont(objectKey(value, 'font'))) &&
    (isUndefined(objectKey(value, 'color')) ||
      isColor(objectKey(value, 'color'))) &&
    (isUndefined(objectKey(value, 'size')) || isSize(objectKey(value, 'size')))
  );
}

export function stringifyTextStyle(value: TextStyle): string {
  return `ComponentTextStyle(${value})`;
}

export function parseTextStyle(value: unknown): TextStyle | undefined {
  if (isTextStyle(value)) return value;
  return undefined;
}
