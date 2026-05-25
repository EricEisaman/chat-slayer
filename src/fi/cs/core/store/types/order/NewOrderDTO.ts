import {isShoppingCart, ShoppingCart} from '../cart/ShoppingCart';
import {isReadonlyJsonAny, parseJson, ReadonlyJsonAny} from '../../../Json';
import {isOrderStatus, OrderStatus} from './OrderStatus';
import {isUndefined} from '../../../types/undefined';
import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isString, isStringOrUndefined} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeys} from '../../../types/OtherKeys';

export interface NewOrderDTO {
  readonly clientId: string;
  readonly cart: ShoppingCart;
  readonly wcOrderId?: string;
  readonly date?: string;
  readonly status?: OrderStatus;
  readonly description?: string;
  readonly internalNote?: string;
  readonly viewUrl?: string;
  readonly adminUrl?: string;
  readonly onHold?: boolean;
  readonly isCompleted?: boolean;
  readonly isPaid?: boolean;
  readonly isTerminated?: boolean;
  readonly meta?: ReadonlyJsonAny;
}

export function createNewOrderDTO(
  clientId: string,
  cart: ShoppingCart,
  wcOrderId?: string,
  date?: string,
  status?: OrderStatus,
  description?: string,
  internalNote?: string,
  viewUrl?: string,
  adminUrl?: string,
  onHold?: boolean,
  isCompleted?: boolean,
  isPaid?: boolean,
  isTerminated?: boolean,
  meta?: ReadonlyJsonAny | string,
): NewOrderDTO {
  return {
    clientId,
    wcOrderId,
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
  };
}

export function isNewOrderDTO(value: unknown): value is NewOrderDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'clientId',
      'wcOrderId',
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
      'cart',
    ]) &&
    isString(objectKey(value, 'clientId')) &&
    isShoppingCart(objectKey(value, 'cart')) &&
    isStringOrUndefined(objectKey(value, 'wcOrderId')) &&
    isStringOrUndefined(objectKey(value, 'date')) &&
    (isUndefined(objectKey(value, 'status')) ||
      isOrderStatus(objectKey(value, 'status'))) &&
    isStringOrUndefined(objectKey(value, 'description')) &&
    isStringOrUndefined(objectKey(value, 'internalNote')) &&
    isStringOrUndefined(objectKey(value, 'viewUrl')) &&
    isStringOrUndefined(objectKey(value, 'adminUrl')) &&
    isBooleanOrUndefined(objectKey(value, 'onHold')) &&
    isBooleanOrUndefined(objectKey(value, 'isCompleted')) &&
    isBooleanOrUndefined(objectKey(value, 'isPaid')) &&
    isBooleanOrUndefined(objectKey(value, 'isTerminated')) &&
    (isUndefined(objectKey(value, 'meta')) ||
      isReadonlyJsonAny(objectKey(value, 'meta')))
  );
}

export function stringifyNewOrderDTO(value: NewOrderDTO): string {
  return `NewOrderDTO(${value})`;
}

export function parseNewOrderDTO(value: unknown): NewOrderDTO | undefined {
  if (isNewOrderDTO(value)) return value;
  return undefined;
}
