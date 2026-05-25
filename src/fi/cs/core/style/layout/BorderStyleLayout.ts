import {BorderType, isBorderType} from '../types/BorderType';
import {isUndefined} from '../../types/undefined';
import {isString} from '../../types/String';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface BorderStyleLayout {
  readonly size?: string;
  readonly type?: BorderType;
  readonly radius?: string;
  readonly color?: string;
}

export function createBorderStyleLayout(
  size?: string,
  color?: string,
  type?: BorderType,
  radius?: string,
): BorderStyleLayout {
  return {
    size,
    color,
    type,
    radius,
  };
}

export function isBorderStyleLayout(
  value: unknown,
): value is BorderStyleLayout {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['size', 'type', 'radius', 'color']) &&
    (isUndefined(objectKey(value, 'size')) ||
      isString(objectKey(value, 'size'))) &&
    (isUndefined(objectKey(value, 'type')) ||
      isBorderType(objectKey(value, 'type'))) &&
    (isUndefined(objectKey(value, 'radius')) ||
      isString(objectKey(value, 'radius'))) &&
    (isUndefined(objectKey(value, 'color')) ||
      isString(objectKey(value, 'color')))
  );
}

export function stringifyBorderStyleLayout(value: BorderStyleLayout): string {
  return `ComponentBorderStyle(${value})`;
}

export function parseBorderStyleLayout(
  value: unknown,
): BorderStyleLayout | undefined {
  if (isBorderStyleLayout(value)) return value;
  return undefined;
}
