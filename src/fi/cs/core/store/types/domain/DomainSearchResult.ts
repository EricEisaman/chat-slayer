import {explainProduct, isProduct, Product} from '../product/Product';
import {
  DomainSearchState,
  explainDomainSearchState,
  isDomainSearchState,
} from './DomainSearchState';
import {explain, explainProperty} from '../../../types/explain';
import {explainString, isString} from '../../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../types/OtherKeys';
import {explainArrayOf, isArrayOf} from '../../../types/Array';

export interface DomainSearchResult {
  /**
   * Domain name
   */
  readonly name: string;

  readonly state: DomainSearchState;

  /**
   * Available products to buy if any found
   */
  readonly productList: readonly Product[];
}

export function createDomainSearchResult(
  name: string,
  state: DomainSearchState,
  productList: readonly Product[],
): DomainSearchResult {
  return {
    name,
    state,
    productList,
  };
}

export function isDomainSearchResult(
  value: unknown,
): value is DomainSearchResult {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['name', 'state', 'productList']) &&
    isString(objectKey(value, 'name')) &&
    isDomainSearchState(objectKey(value, 'state')) &&
    isArrayOf<Product>(objectKey(value, 'productList'), isProduct)
  );
}

export function explainDomainSearchResult(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['name', 'state', 'product']),
    explainProperty('name', explainString(objectKey(value, 'name'))),
    explainProperty(
      'state',
      explainDomainSearchState(objectKey(value, 'state')),
    ),
    explainProperty(
      'product',
      explainArrayOf<Product>(
        'Product',
        explainProduct,
        objectKey(value, 'productList'),
        isProduct,
      ),
    ),
  ]);
}

export function stringifyDomainSearchResult(value: DomainSearchResult): string {
  return `DomainSearchResult(${value})`;
}

export function parseDomainSearchResult(
  value: unknown,
): DomainSearchResult | undefined {
  if (isDomainSearchResult(value)) return value;
  return undefined;
}
