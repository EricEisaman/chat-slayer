import {isArray} from './Array';
import {isString} from './String';
import {explainNot, explainOk, explainOr} from './explain';
import {isUndefined} from './undefined';
import {every} from '../functions/every';
import {isNull} from './Null';

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isStringArray(value: unknown): value is string[] {
  return !!value && isArray(value) && every(value, isString);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainStringArray(value: unknown): string {
  return isStringArray(value) ? explainOk() : explainNot('string[]');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isStringArrayOrUndefined(
  value: unknown,
): value is string[] | undefined {
  return isUndefined(value) || isStringArray(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainStringArrayOrUndefined(value: unknown): string {
  return isStringArrayOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['string[]', 'undefined']));
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isStringArrayOrNullOrUndefined(
  value: unknown,
): value is string[] | undefined {
  return isNull(value) || isUndefined(value) || isStringArray(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainStringArrayOrNullOrUndefined(value: unknown): string {
  return isStringArrayOrNullOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['string[]', 'null', 'undefined']));
}
