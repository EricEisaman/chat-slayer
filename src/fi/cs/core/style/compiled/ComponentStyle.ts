import {TextStyle, isTextStyle} from './TextStyle';
import {BorderStyle, isBorderStyle} from './BorderStyle';
import {BackgroundStyle, isBackgroundStyle} from './BackgroundStyle';
import {Size, isSize} from '../types/Size';
import {isUndefined} from '../../types/undefined';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface ComponentStyle {
  readonly text?: TextStyle;
  readonly border?: BorderStyle;
  readonly background?: BackgroundStyle;
  readonly padding?: Size;
}

export function createComponentStyle(
  text?: TextStyle,
  border?: BorderStyle,
  background?: BackgroundStyle,
  padding?: Size,
): ComponentStyle {
  return {
    background,
    padding,
    text,
    border,
  };
}

export function isComponentStyle(value: unknown): value is ComponentStyle {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['background', 'padding', 'text', 'border']) &&
    (isUndefined(objectKey(value, 'background')) ||
      isBackgroundStyle(objectKey(value, 'background'))) &&
    (isUndefined(objectKey(value, 'text')) ||
      isTextStyle(objectKey(value, 'text'))) &&
    (isUndefined(objectKey(value, 'border')) ||
      isBorderStyle(objectKey(value, 'border'))) &&
    (isUndefined(objectKey(value, 'padding')) ||
      isSize(objectKey(value, 'padding')))
  );
}

export function stringifyComponentStyle(value: ComponentStyle): string {
  return `ComponentStyle(${value})`;
}

export function parseComponentStyle(
  value: unknown,
): ComponentStyle | undefined {
  if (isComponentStyle(value)) return value;
  return undefined;
}
