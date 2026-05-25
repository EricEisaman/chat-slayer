import {isBoolean} from '../../../types/Boolean';
import {isString} from '../../../types/String';
import {isNumber} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../types/OtherKeys';

export interface NewProductDTO {
  readonly productGroupId: string;
  readonly priceTypeId: string;
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

export function createNewProductDTO(
  productGroupId: string,
  priceTypeId: string,
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
): NewProductDTO {
  return {
    productGroupId,
    priceTypeId,
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

export function isNewProductDTO(value: unknown): value is NewProductDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'productGroupId',
      'priceTypeId',
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
    isString(objectKey(value, 'productGroupId')) &&
    isString(objectKey(value, 'priceTypeId')) &&
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

export function stringifyNewProductDTO(value: NewProductDTO): string {
  return `NewProductDTO(${value})`;
}

export function parseNewProductDTO(value: unknown): NewProductDTO | undefined {
  if (isNewProductDTO(value)) return value;
  return undefined;
}
