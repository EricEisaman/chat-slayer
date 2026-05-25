import {isArray} from './Array';
import {objectKey} from './RegularObject';

import {isNumber} from './Number';
import {every} from '../functions/every';
import {explainNot, explainOk, explainOr} from './explain';
import {isUndefined} from './undefined';

export type NumberPair = readonly [number, number];

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberPair(value: unknown): value is NumberPair {
  return (
    !!value && isArray(value) && value.length === 2 && every(value, isNumber)
  );
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberPair(value: unknown): string {
  return isNumberPair(value) ? explainOk() : explainNot('[number, number]');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberPairOrUndefined(
  value: unknown,
): value is [number, number] | undefined {
  return isUndefined(value) || isNumberPair(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberPairOrUndefined(value: unknown): string {
  return isNumberPairOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['[number, number]', 'undefined']));
}
