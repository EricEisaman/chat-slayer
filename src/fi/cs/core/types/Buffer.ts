import {default as _isBuffer} from 'lodash/isBuffer';

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isBuffer(value: unknown): value is Buffer {
  return _isBuffer(value);
}
