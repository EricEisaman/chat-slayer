import {isString} from '../../types/String';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface BackgroundStyleLayout {
  readonly color: string;
}

export function createBackgroundStyleLayout(
  color: string,
): BackgroundStyleLayout {
  return {
    color,
  };
}

export function isBackgroundStyleLayout(
  value: unknown,
): value is BackgroundStyleLayout {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['color']) &&
    isString(objectKey(value, 'color'))
  );
}

export function stringifyBackgroundStyleLayout(
  value: BackgroundStyleLayout,
): string {
  return `BackgroundStyle(${value})`;
}

export function parseBackgroundStyleLayout(
  value: unknown,
): BackgroundStyleLayout | undefined {
  if (isBackgroundStyleLayout(value)) return value;
  return undefined;
}
