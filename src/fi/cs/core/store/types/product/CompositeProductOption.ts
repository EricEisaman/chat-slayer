import {
  explainProductIdListWithAmount,
  isProductIdListWithAmount,
  ProductIdListWithAmount,
} from './ProductIdList';
import {explain, explainProperty} from '../../../types/explain';
import {
  explainStringOrUndefined,
  isStringOrUndefined,
} from '../../../types/String';
import {
  explainNumber,
  explainNumberOrUndefined,
  isNumber,
  isNumberOrUndefined,
} from '../../../types/Number';
import {
  explainNumberOrStringOrBooleanOrUndefined,
  isNumberOrStringOrBooleanOrUndefined,
} from '../../../types/NumberOrStringOrBooleanOrUndefined';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../types/OtherKeys';

export interface CompositeProductOption {
  readonly value: number | string | boolean;
  readonly minAmount: number;
  readonly maxAmount?: number;

  /**
   * If defined, make this option part of a group.
   *
   * E.g. only one in a group can be selected at one time.
   */
  readonly groupBy?: string;

  /**
   * These products will be selected if user selects this option
   */
  readonly products: ProductIdListWithAmount;
}

export function createCompositeProductOption(
  value: number | string | boolean,
  products: ProductIdListWithAmount,
  groupBy?: string,
  minAmount?: number,
  maxAmount?: number,
): CompositeProductOption {
  return {
    value,
    groupBy,
    products: products ?? [],
    minAmount: minAmount ?? 0,
    maxAmount,
  };
}

export function isCompositeProductOption(
  value: unknown,
): value is CompositeProductOption {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'value',
      'products',
      'groupBy',
      'minAmount',
      'maxAmount',
    ]) &&
    isNumberOrStringOrBooleanOrUndefined(objectKey(value, 'value')) &&
    isStringOrUndefined(objectKey(value, 'groupBy')) &&
    isProductIdListWithAmount(objectKey(value, 'products')) &&
    isNumber(objectKey(value, 'minAmount')) &&
    isNumberOrUndefined(objectKey(value, 'maxAmount'))
  );
}

export function explainCompositeProductOption(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'value',
      'products',
      'groupBy',
      'minAmount',
      'maxAmount',
    ]),
    explainProperty(
      'value',
      explainNumberOrStringOrBooleanOrUndefined(objectKey(value, 'value')),
    ),
    explainProperty(
      'products',
      explainProductIdListWithAmount(objectKey(value, 'products')),
    ),
    explainProperty(
      'groupBy',
      explainStringOrUndefined(objectKey(value, 'groupBy')),
    ),
    explainProperty('minAmount', explainNumber(objectKey(value, 'minAmount'))),
    explainProperty(
      'maxAmount',
      explainNumberOrUndefined(objectKey(value, 'maxAmount')),
    ),
  ]);
}

export function stringifyCompositeProductOption(
  value: CompositeProductOption,
): string {
  return `CompositeProductOption(${value})`;
}

export function parseCompositeProductOption(
  value: unknown,
): CompositeProductOption | undefined {
  if (isCompositeProductOption(value)) return value;
  return undefined;
}
