import {explainBoolean, isBoolean} from '../../../types/Boolean';
import {
  explainShoppingCart,
  isShoppingCart,
  ShoppingCart,
} from '../cart/ShoppingCart';
import {
  explainReadonlyJsonAny,
  isReadonlyJsonAny,
  parseJson,
  ReadonlyJsonAny,
} from '../../../Json';
import {
  isInvoiceDTOOrUndefined,
  InvoiceDTO,
  explainInvoiceDTOOrUndefined,
} from '../invoice/InvoiceDTO';
import {
  isInventoryItemDTO,
  InventoryItemDTO,
  explainInventoryItemDTO,
} from '../inventory/InventoryItemDTO';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../types/OtherKeys';
import {explainArrayOf, isArrayOfOrUndefined} from '../../../types/Array';
import {explain, explainProperty} from '../../../types/explain';

export interface OrderDTO {
  readonly orderId: string;
  readonly clientId: string;
  readonly wcOrderId?: string | undefined;
  readonly updated: string;
  readonly created: string;
  readonly date: string;
  readonly status: string;
  readonly description: string;
  readonly internalNote: string;
  readonly viewUrl: string;
  readonly adminUrl: string;
  readonly onHold: boolean;
  readonly isCompleted: boolean;
  readonly isPaid: boolean;
  readonly isTerminated: boolean;
  readonly meta: ReadonlyJsonAny;
  readonly cart: ShoppingCart;
  readonly invoice?: InvoiceDTO;
  readonly inventoryItems?: readonly InventoryItemDTO[];
}

export function createOrderDTO(
  orderId: string,
  clientId: string,
  cart: ShoppingCart,
  wcOrderId: string,
  updated: string,
  created: string,
  date: string,
  status: string,
  description: string,
  internalNote: string,
  viewUrl: string,
  adminUrl: string,
  onHold: boolean,
  isCompleted: boolean,
  isPaid: boolean,
  isTerminated: boolean,
  meta: ReadonlyJsonAny | string,
  invoice?: InvoiceDTO,
  inventoryItems?: readonly InventoryItemDTO[],
): OrderDTO {
  return {
    orderId,
    clientId,
    wcOrderId,
    updated,
    created,
    date,
    status,
    description,
    internalNote,
    viewUrl,
    adminUrl,
    onHold,
    isCompleted,
    isPaid,
    isTerminated,
    meta: (isString(meta) ? parseJson(meta) : meta) as ReadonlyJsonAny,
    cart,
    invoice,
    inventoryItems,
  };
}

export function isOrderDTO(value: unknown): value is OrderDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'orderId',
      'clientId',
      'wcOrderId',
      'updated',
      'created',
      'date',
      'status',
      'description',
      'internalNote',
      'viewUrl',
      'adminUrl',
      'onHold',
      'isCompleted',
      'isPaid',
      'isTerminated',
      'meta',
      'invoice',
      'inventoryItems',
      'cart',
    ]) &&
    isString(objectKey(value, 'orderId')) &&
    isString(objectKey(value, 'clientId')) &&
    isStringOrUndefined(objectKey(value, 'wcOrderId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'date')) &&
    isString(objectKey(value, 'status')) &&
    isString(objectKey(value, 'description')) &&
    isString(objectKey(value, 'internalNote')) &&
    isString(objectKey(value, 'viewUrl')) &&
    isString(objectKey(value, 'adminUrl')) &&
    isBoolean(objectKey(value, 'onHold')) &&
    isBoolean(objectKey(value, 'isCompleted')) &&
    isBoolean(objectKey(value, 'isPaid')) &&
    isBoolean(objectKey(value, 'isTerminated')) &&
    isReadonlyJsonAny(objectKey(value, 'meta')) &&
    isShoppingCart(objectKey(value, 'cart')) &&
    isInvoiceDTOOrUndefined(objectKey(value, 'invoice')) &&
    isArrayOfOrUndefined(objectKey(value, 'inventoryItems'), isInventoryItemDTO)
  );
}

export function explainOrderDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'orderId',
      'clientId',
      'wcOrderId',
      'updated',
      'created',
      'date',
      'status',
      'description',
      'internalNote',
      'viewUrl',
      'adminUrl',
      'onHold',
      'isCompleted',
      'isPaid',
      'isTerminated',
      'meta',
      'invoice',
      'inventoryItems',
      'cart',
    ]),
    explainProperty('orderId', explainString(objectKey(value, 'orderId'))),
    explainProperty('clientId', explainString(objectKey(value, 'clientId'))),
    explainProperty(
      'wcOrderId',
      explainStringOrUndefined(objectKey(value, 'wcOrderId')),
    ),
    explainProperty('updated', explainString(objectKey(value, 'updated'))),
    explainProperty('created', explainString(objectKey(value, 'created'))),
    explainProperty('date', explainString(objectKey(value, 'date'))),
    explainProperty('status', explainString(objectKey(value, 'status'))),
    explainProperty(
      'description',
      explainString(objectKey(value, 'description')),
    ),
    explainProperty(
      'internalNote',
      explainString(objectKey(value, 'internalNote')),
    ),
    explainProperty('viewUrl', explainString(objectKey(value, 'viewUrl'))),
    explainProperty('adminUrl', explainString(objectKey(value, 'adminUrl'))),
    explainProperty('onHold', explainBoolean(objectKey(value, 'onHold'))),
    explainProperty(
      'isCompleted',
      explainBoolean(objectKey(value, 'isCompleted')),
    ),
    explainProperty('isPaid', explainBoolean(objectKey(value, 'isPaid'))),
    explainProperty(
      'isTerminated',
      explainBoolean(objectKey(value, 'isTerminated')),
    ),
    explainProperty('meta', explainReadonlyJsonAny(objectKey(value, 'meta'))),
    explainProperty(
      'invoice',
      explainInvoiceDTOOrUndefined(objectKey(value, 'invoice')),
    ),
    explainProperty(
      'inventoryItems',
      explainArrayOf<InventoryItemDTO>(
        'InventoryItemDTO',
        explainInventoryItemDTO,
        objectKey(value, 'inventoryItems'),
        isInventoryItemDTO,
      ),
    ),
    explainProperty('cart', explainShoppingCart(objectKey(value, 'cart'))),
  ]);
}

export function stringifyOrderDTO(value: OrderDTO): string {
  return `OrderDTO(${value})`;
}

export function parseOrderDTO(value: unknown): OrderDTO | undefined {
  if (isOrderDTO(value)) return value;
  return undefined;
}
