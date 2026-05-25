import {isObject} from './Object';
import {IS_DEVELOPMENT} from '../constants/environment';
import {default as _filter} from 'lodash/filter';
import {explainOk} from './explain';
import {keys} from '../functions/keys';

/**
 *
 * @param obj
 * @param acceptedKeys
 * @__PURE__
 * @nosideeffects
 */
export function getOtherKeys(
  obj: any,
  acceptedKeys: readonly string[],
): readonly string[] {
  return _filter(
    keys(obj),
    (key: string): boolean => !acceptedKeys.includes(key),
  );
}

/**
 *
 * @param obj
 * @param acceptedKeys
 * @__PURE__
 * @nosideeffects
 */
export function hasNoOtherKeys(
  obj: any,
  acceptedKeys: readonly string[],
): boolean {
  return isObject(obj) && getOtherKeys(obj, acceptedKeys).length === 0;
}

/**
 *
 * @param value
 * @param array
 * @__PURE__
 * @nosideeffects
 */
export function hasNoOtherKeysInDevelopment(
  value: unknown,
  array: readonly string[],
): boolean {
  return IS_DEVELOPMENT ? hasNoOtherKeys(value, array) : true;
}

export function explainNoOtherKeys(
  value: unknown,
  array: readonly string[],
): string {
  if (!hasNoOtherKeys(value, array)) {
    return `Value had extra properties: ${_filter(
      keys(value),
      (item: string): boolean => !array.includes(item),
    )}`;
  } else {
    return explainOk();
  }
}

export function explainNoOtherKeysInDevelopment(
  value: unknown,
  array: readonly string[],
): string {
  if (!hasNoOtherKeysInDevelopment(value, array)) {
    return `Value had extra properties: ${_filter(
      keys(value),
      (item: string): boolean => !array.includes(item),
    )}`;
  } else {
    return explainOk();
  }
}
