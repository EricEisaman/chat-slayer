import {isStringOrUndefined} from '../../types/String';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface TextStyleLayout {
  readonly font?: string;
  readonly color?: string;
  readonly size?: string;
}

export function createTextStyleLayout(
  font?: string,
  color?: string,
  size?: string,
): TextStyleLayout {
  return {
    font,
    color,
    size,
  };
}

export function isTextStyleLayout(value: unknown): value is TextStyleLayout {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['font', 'color', 'size']) &&
    isStringOrUndefined(objectKey(value, 'font')) &&
    isStringOrUndefined(objectKey(value, 'color')) &&
    isStringOrUndefined(objectKey(value, 'size'))
  );
}

export function stringifyTextStyleLayout(value: TextStyleLayout): string {
  return `ComponentTextStyle(${value})`;
}

export function parseTextStyleLayout(
  value: unknown,
): TextStyleLayout | undefined {
  if (isTextStyleLayout(value)) return value;
  return undefined;
}
