import {isBoolean} from '../../../types/Boolean';
import {isString} from '../../../types/String';
import {isNumber} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeys} from '../../../types/OtherKeys';

export interface ProductDTO {
  readonly productId: string;
  readonly productGroupId: string;
  readonly priceTypeId: string;
  readonly updated: string;
  readonly creation: string;
  readonly number: number;
  readonly name: string;
  readonly description: string;
  readonly expensePrice: number;
  readonly price: number;
  readonly vatPercent: number;
  readonly onHold: boolean;
  readonly isPublic: boolean;
  readonly stockEnabled: boolean;
  readonly stockAmount: number;
}

export function createProductDTO(
  productId: string,
  productGroupId: string,
  priceTypeId: string,
  updated: string,
  creation: string,
  number: number,
  name: string,
  description: string,
  expensePrice: number,
  price: number,
  vatPercent: number,
  onHold: boolean,
  isPublic: boolean,
  stockEnabled: boolean,
  stockAmount: number,
): ProductDTO {
  return {
    productId,
    productGroupId,
    priceTypeId,
    updated,
    creation,
    number,
    name,
    description,
    expensePrice,
    price,
    vatPercent,
    onHold,
    isPublic,
    stockEnabled,
    stockAmount,
  };
}

export function isProductDTO(value: unknown): value is ProductDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'productId',
      'productGroupId',
      'priceTypeId',
      'updated',
      'creation',
      'number',
      'name',
      'description',
      'expensePrice',
      'price',
      'vatPercent',
      'onHold',
      'isPublic',
      'stockEnabled',
      'stockAmount',
    ]) &&
    isString(objectKey(value, 'productId')) &&
    isString(objectKey(value, 'productGroupId')) &&
    isString(objectKey(value, 'priceTypeId')) &&
    isString(objectKey(value, 'updated')) &&
    isString(objectKey(value, 'creation')) &&
    isNumber(objectKey(value, 'number')) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'description')) &&
    isNumber(objectKey(value, 'expensePrice')) &&
    isNumber(objectKey(value, 'price')) &&
    isNumber(objectKey(value, 'vatPercent')) &&
    isBoolean(objectKey(value, 'onHold')) &&
    isBoolean(objectKey(value, 'isPublic')) &&
    isBoolean(objectKey(value, 'stockEnabled')) &&
    isNumber(objectKey(value, 'stockAmount'))
  );
}

export function stringifyProductDTO(value: ProductDTO): string {
  return `ProductDTO(${value})`;
}

export function parseProductDTO(value: unknown): ProductDTO | undefined {
  if (isProductDTO(value)) return value;
  return undefined;
}
