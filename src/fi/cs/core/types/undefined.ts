import {explainOk} from './explain';

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainUndefined(value: unknown): string {
  return isUndefined(value) ? explainOk() : 'not undefined';
}
