import {
  explainShoppingCartItem,
  isShoppingCartItem,
  ShoppingCartItem,
} from './ShoppingCartItem';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../types/OtherKeys';
import {explainArrayOf, isArrayOf} from '../../../types/Array';
import {explain, explainProperty} from '../../../types/explain';

export interface ShoppingCart {
  readonly items: readonly ShoppingCartItem[];
}

export function createShoppingCart(items?: ShoppingCartItem[]) {
  return {
    items: items ?? [],
  };
}

export function isShoppingCart(value: unknown): value is ShoppingCart {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['items']) &&
    isArrayOf<ShoppingCartItem>(objectKey(value, 'items'), isShoppingCartItem)
  );
}

export function explainShoppingCart(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['items']),
    explainProperty(
      'items',
      explainArrayOf<ShoppingCartItem>(
        'ShoppingCartItem',
        explainShoppingCartItem,
        objectKey(value, 'items'),
        isShoppingCartItem,
      ),
    ),
  ]);
}

export function stringifyShoppingCart(value: ShoppingCart): string {
  return `ShoppingCart(${value})`;
}

export function parseShoppingCart(value: unknown): ShoppingCart | undefined {
  if (isShoppingCart(value)) return value;
  return undefined;
}
