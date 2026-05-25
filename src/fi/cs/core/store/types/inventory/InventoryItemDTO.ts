import {isBoolean} from '../../../types/Boolean';
import {
  explainProductType,
  isProductType,
  ProductType,
} from '../product/ProductType';
import {
  explainProductPriceType,
  isProductPriceType,
  ProductPriceType,
} from '../product/ProductPriceType';
import {
  isInventoryState,
  InventoryState,
  explainInventoryState,
} from './InventoryState';
import {
  explainInventoryData,
  InventoryData,
  isInventoryData,
} from './data/InventoryData';
import {ReadonlyJsonObject} from '../../../Json';
import {explain, explainProperty} from '../../../types/explain';
import {explainBoolean} from '../../../types/Boolean';
import {explainString, isString} from '../../../types/String';
import {explainNumber, isNumber} from '../../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../types/OtherKeys';

export interface InventoryItemDTO extends ReadonlyJsonObject {
  readonly inventoryItemId: string;
  readonly clientId: string;
  readonly updated: string;
  readonly created: string;
  readonly date: string;
  readonly endDate: string;
  readonly state: InventoryState;
  readonly title: string;
  readonly summary: string;
  readonly productId: string;
  readonly productType: ProductType;
  readonly priceSum: number;
  readonly priceVatPercent: number;
  readonly priceType: ProductPriceType;
  readonly internalNote: string;
  readonly onHold: boolean;
  readonly isTerminated: boolean;
  readonly data: InventoryData;
}

export function createInventoryItemDTO(
  inventoryItemId: string,
  clientId: string,
  updated: string,
  created: string,
  date: string,
  endDate: string,
  state: InventoryState | undefined,
  title: string,
  summary: string,
  productId: string,
  productType: ProductType,
  priceSum: number,
  priceVatPercent: number,
  priceType: ProductPriceType,
  internalNote: string,
  onHold: boolean,
  isTerminated: boolean,
  data: InventoryData = {},
): InventoryItemDTO {
  return {
    inventoryItemId,
    clientId,
    updated,
    created,
    date,
    endDate,
    state: state ?? InventoryState.UNINITIALIZED,
    title,
    summary,
    productId,
    productType,
    priceSum,
    priceVatPercent,
    priceType,
    internalNote,
    onHold,
    isTerminated,
    data,
  };
}

export function isInventoryItemDTO(value: unknown): value is InventoryItemDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'inventoryItemId',
      'clientId',
      'updated',
      'created',
      'date',
      'endDate',
      'state',
      'title',
      'summary',
      'productId',
      'productType',
      'priceSum',
      'priceVatPercent',
      'priceType',
      'internalNote',
      'isTerminated',
      'onHold',
      'data',
    ]) &&
    isString(objectKey(value, 'inventoryItemId')) &&
    isString(objectKey(value, 'clientId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'date')) &&
    isString(objectKey(value, 'endDate')) &&
    isInventoryState(objectKey(value, 'state')) &&
    isString(objectKey(value, 'title')) &&
    isString(objectKey(value, 'summary')) &&
    isString(objectKey(value, 'productId')) &&
    isProductType(objectKey(value, 'productType')) &&
    isNumber(objectKey(value, 'priceSum')) &&
    isNumber(objectKey(value, 'priceVatPercent')) &&
    isProductPriceType(objectKey(value, 'priceType')) &&
    isString(objectKey(value, 'internalNote')) &&
    isBoolean(objectKey(value, 'isTerminated')) &&
    isBoolean(objectKey(value, 'onHold')) &&
    isInventoryData(objectKey(value, 'data'))
  );
}

export function explainInventoryItemDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'inventoryItemId',
      'clientId',
      'updated',
      'created',
      'date',
      'endDate',
      'state',
      'title',
      'summary',
      'productId',
      'productType',
      'priceSum',
      'priceVatPercent',
      'priceType',
      'internalNote',
      'isTerminated',
      'onHold',
      'data',
    ]),
    explainProperty(
      'inventoryItemId',
      explainString(objectKey(value, 'inventoryItemId')),
    ),
    explainProperty('clientId', explainString(objectKey(value, 'clientId'))),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty('created', explainString(objectKey(value, 'created'))),
    explainProperty('date', explainString(objectKey(value, 'date'))),
    explainProperty('endDate', explainString(objectKey(value, 'endDate'))),
    explainProperty('state', explainInventoryState(objectKey(value, 'state'))),
    explainProperty('title', explainString(objectKey(value, 'title'))),
    explainProperty('summary', explainString(objectKey(value, 'summary'))),
    explainProperty('productId', explainString(objectKey(value, 'productId'))),
    explainProperty(
      'productType',
      explainProductType(objectKey(value, 'productType')),
    ),
    explainProperty('priceSum', explainNumber(objectKey(value, 'priceSum'))),
    explainProperty(
      'priceVatPercent',
      explainNumber(objectKey(value, 'priceVatPercent')),
    ),
    explainProperty(
      'priceType',
      explainProductPriceType(objectKey(value, 'priceType')),
    ),
    explainProperty(
      'internalNote',
      explainString(objectKey(value, 'internalNote')),
    ),
    explainProperty(
      'isTerminated',
      explainBoolean(objectKey(value, 'isTerminated')),
    ),
    explainProperty('onHold', explainBoolean(objectKey(value, 'onHold'))),
    explainProperty('data', explainInventoryData(objectKey(value, 'data'))),
  ]);
}

export function stringifyInventoryItemDTO(value: InventoryItemDTO): string {
  return `InventoryItemDTO(${value})`;
}

export function parseInventoryItemDTO(
  value: unknown,
): InventoryItemDTO | undefined {
  if (isInventoryItemDTO(value)) return value;
  return undefined;
}
