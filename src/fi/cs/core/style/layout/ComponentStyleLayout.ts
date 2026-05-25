import {TextStyleLayout, isTextStyleLayout} from './TextStyleLayout';
import {BorderStyleLayout, isBorderStyleLayout} from './BorderStyleLayout';
import {
  BackgroundStyleLayout,
  isBackgroundStyleLayout,
} from './BackgroundStyleLayout';
import {isUndefined} from '../../types/undefined';
import {isString} from '../../types/String';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface ComponentStyleLayout {
  readonly text?: TextStyleLayout;
  readonly border?: BorderStyleLayout;
  readonly background?: BackgroundStyleLayout;
  readonly padding?: string;
}

export function createComponentStyleLayout(
  text?: TextStyleLayout,
  border?: BorderStyleLayout,
  background?: BackgroundStyleLayout,
  padding?: string,
): ComponentStyleLayout {
  return {
    background,
    padding,
    text,
    border,
  };
}

export function isComponentStyleLayout(
  value: unknown,
): value is ComponentStyleLayout {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['background', 'padding', 'text', 'border']) &&
    (isUndefined(objectKey(value, 'background')) ||
      isBackgroundStyleLayout(objectKey(value, 'background'))) &&
    (isUndefined(objectKey(value, 'text')) ||
      isTextStyleLayout(objectKey(value, 'text'))) &&
    (isUndefined(objectKey(value, 'border')) ||
      isBorderStyleLayout(objectKey(value, 'border'))) &&
    (isUndefined(objectKey(value, 'padding')) ||
      isString(objectKey(value, 'padding')))
  );
}

export function stringifyComponentStyleLayout(
  value: ComponentStyleLayout,
): string {
  return `ComponentStyleLayout(${value})`;
}

export function parseComponentStyleLayout(
  value: unknown,
): ComponentStyleLayout | undefined {
  if (isComponentStyleLayout(value)) return value;
  return undefined;
}
