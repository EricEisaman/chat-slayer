import {isArray} from './Array';
import isBoolean from 'lodash/isBoolean';
import {every} from '../functions/every';

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isBooleanArray(value: unknown): value is boolean[] {
  return !!value && isArray(value) && every(value, isBoolean);
}
