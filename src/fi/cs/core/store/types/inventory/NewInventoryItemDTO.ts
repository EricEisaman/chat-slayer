import {
  explainBooleanOrUndefined,
  isBooleanOrUndefined,
} from '../../../types/Boolean';
import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../../types/explain';
import {isUndefined} from '../../../types/undefined';
import {
  explainProductTypeOrUndefined,
  isProductTypeOrUndefined,
  ProductType,
} from '../product/ProductType';
import {
  explainProductPriceTypeOrUndefined,
  isProductPriceTypeOrUndefined,
  ProductPriceType,
} from '../product/ProductPriceType';
import {
  explainInventoryStateOrUndefined,
  InventoryState,
  isInventoryStateOrUndefined,
} from './InventoryState';
import {
  explainReadonlyJsonObjectOrUndefined,
  isReadonlyJsonObjectOrUndefined,
  ReadonlyJsonObject,
} from '../../../Json';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../types/String';
import {
  explainNumberOrUndefined,
  isNumberOrUndefined,
} from '../../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../types/OtherKeys';

export interface NewInventoryItemDTO {
  readonly clientId: string;
  readonly date?: string;
  readonly endDate?: string;
  readonly state?: InventoryState;
  readonly title?: string;
  readonly summary?: string;
  readonly productId?: string;
  readonly productType?: ProductType;
  readonly priceSum?: number;
  readonly priceVatPercent?: number;
  readonly priceType?: ProductPriceType;
  readonly internalNote?: string;
  readonly onHold?: boolean;
  readonly isTerminated?: boolean;
  readonly data?: ReadonlyJsonObject;
}

export function createNewInventoryItemDTO(
  clientId: string,
  date: string | undefined,
  endDate: string | undefined,
  title: string | undefined,
  state: InventoryState | undefined,
  summary: string | undefined,
  productId: string | undefined,
  productType: ProductType | undefined,
  priceSum: number | undefined,
  priceVatPercent: number | undefined,
  priceType: ProductPriceType | undefined,
  internalNote: string | undefined,
  onHold: boolean | undefined,
  isTerminated: boolean | undefined,
  data: ReadonlyJsonObject = {},
): NewInventoryItemDTO {
  return {
    clientId,
    date,
    endDate,
    state,
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

export function isNewInventoryItemDTO(
  value: unknown,
): value is NewInventoryItemDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'clientId',
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
    isString(objectKey(value, 'clientId')) &&
    isStringOrUndefined(objectKey(value, 'date')) &&
    isStringOrUndefined(objectKey(value, 'endDate')) &&
    isInventoryStateOrUndefined(objectKey(value, 'state')) &&
    isStringOrUndefined(objectKey(value, 'title')) &&
    isStringOrUndefined(objectKey(value, 'summary')) &&
    isStringOrUndefined(objectKey(value, 'productId')) &&
    isProductTypeOrUndefined(objectKey(value, 'productType')) &&
    isNumberOrUndefined(objectKey(value, 'priceSum')) &&
    isNumberOrUndefined(objectKey(value, 'priceVatPercent')) &&
    isProductPriceTypeOrUndefined(objectKey(value, 'priceType')) &&
    isStringOrUndefined(objectKey(value, 'internalNote')) &&
    isBooleanOrUndefined(objectKey(value, 'isTerminated')) &&
    isBooleanOrUndefined(objectKey(value, 'onHold')) &&
    isReadonlyJsonObjectOrUndefined(objectKey(value, 'data'))
  );
}

export function stringifyNewInventoryItemDTO(
  value: NewInventoryItemDTO,
): string {
  return `NewInventoryItemDTO(${value})`;
}

export function parseNewInventoryItemDTO(
  value: unknown,
): NewInventoryItemDTO | undefined {
  if (isNewInventoryItemDTO(value)) return value;
  return undefined;
}

export function explainNewInventoryItemDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'clientId',
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
    explainProperty('clientId', explainString(objectKey(value, 'clientId'))),
    explainProperty('date', explainStringOrUndefined(objectKey(value, 'date'))),
    explainProperty(
      'endDate',
      explainStringOrUndefined(objectKey(value, 'endDate')),
    ),
    explainProperty(
      'state',
      explainInventoryStateOrUndefined(objectKey(value, 'state')),
    ),
    explainProperty(
      'title',
      explainStringOrUndefined(objectKey(value, 'title')),
    ),
    explainProperty(
      'summary',
      explainStringOrUndefined(objectKey(value, 'summary')),
    ),
    explainProperty(
      'productId',
      explainStringOrUndefined(objectKey(value, 'productId')),
    ),
    explainProperty(
      'productType',
      explainProductTypeOrUndefined(objectKey(value, 'productType')),
    ),
    explainProperty(
      'priceSum',
      explainNumberOrUndefined(objectKey(value, 'priceSum')),
    ),
    explainProperty(
      'priceVatPercent',
      explainNumberOrUndefined(objectKey(value, 'priceVatPercent')),
    ),
    explainProperty(
      'priceType',
      explainProductPriceTypeOrUndefined(objectKey(value, 'priceType')),
    ),
    explainProperty(
      'internalNote',
      explainStringOrUndefined(objectKey(value, 'internalNote')),
    ),
    explainProperty(
      'isTerminated',
      explainBooleanOrUndefined(objectKey(value, 'isTerminated')),
    ),
    explainProperty(
      'onHold',
      explainBooleanOrUndefined(objectKey(value, 'onHold')),
    ),
    explainProperty(
      'data',
      explainReadonlyJsonObjectOrUndefined(objectKey(value, 'data')),
    ),
  ]);
}

export function isNewInventoryItemDTOOrUndefined(
  value: unknown,
): value is NewInventoryItemDTO | undefined {
  return isUndefined(value) || isNewInventoryItemDTO(value);
}

export function explainNewInventoryItemDTOOrUndefined(value: unknown): string {
  return isNewInventoryItemDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['NewInventoryItemDTO', 'undefined']));
}
