import {default as _isObject} from 'lodash/isObject';
import {objectKey} from './RegularObject';

import {default as _isFunction} from 'lodash/isFunction';

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isPromise(value: unknown): value is Promise<any> {
  // @ts-ignore
  return (
    _isObject(value) &&
    _isFunction(objectKey(value, 'then')) &&
    _isFunction(objectKey(value, 'catch'))
  );
}
