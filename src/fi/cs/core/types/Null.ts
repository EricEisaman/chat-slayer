import {explainNot, explainOk} from './explain';
import {default as _isNull} from 'lodash/isNull';
import {isUndefined} from './undefined';

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNull(value: unknown): value is null {
  return _isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNull(value: unknown): string {
  return isNull(value) ? explainOk() : explainNot('null');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return _isNull(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNullOrUndefined(value: unknown): string {
  return isNullOrUndefined(value)
    ? explainOk()
    : explainNot('null or undefined');
}
