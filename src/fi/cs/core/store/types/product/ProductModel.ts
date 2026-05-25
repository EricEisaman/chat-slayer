import {isProductOrUndefined, Product} from './Product';
import {isProductPriceOrUndefined, ProductPrice} from './ProductPrice';
import {
  ButtonStyle,
  isButtonStyleOrUndefined,
} from '../../../frontend/button/ButtonStyle';
import {isString, isStringOrUndefined} from '../../../types/String';
import {isNumber, isNumberOrUndefined} from '../../../types/Number';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeys} from '../../../types/OtherKeys';

export interface SelectProductModelCallback {
  (item: ProductModel): void;
}

export interface ProductModel {
  readonly id: string;
  readonly icon: any;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly route?: string;
  readonly buttonLabel?: string;
  readonly product?: Product;
  readonly productPrice?: ProductPrice;
  readonly buttonStyle?: ButtonStyle;
}

export function createProductModel(
  id: string,
  icon: any,
  title: string,
  description: string,
  price: number,
  route?: string,
  buttonLabel?: string,
  product?: Product,
  productPrice?: ProductPrice,
  buttonStyle?: ButtonStyle,
): ProductModel {
  return {
    id,
    icon,
    title,
    description,
    price,
    route,
    buttonLabel,
    product,
    productPrice,
    buttonStyle,
  };
}

export function isProductModel(value: unknown): value is ProductModel {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'id',
      'icon',
      'title',
      'description',
      'price',
      'route',
      'buttonLabel',
      'product',
      'productPrice',
      'buttonStyle',
    ]) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'title')) &&
    isString(objectKey(value, 'description')) &&
    isNumber(objectKey(value, 'price')) &&
    isNumber(objectKey(value, 'buttonLabel')) &&
    isStringOrUndefined(objectKey(value, 'route')) &&
    isProductOrUndefined(objectKey(value, 'product')) &&
    isProductPriceOrUndefined(objectKey(value, 'productPrice')) &&
    isButtonStyleOrUndefined(objectKey(value, 'buttonStyle'))
  );
}

export function isPartialProductModel(
  value: unknown,
): value is Partial<ProductModel> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'id',
      'icon',
      'title',
      'description',
      'price',
      'route',
      'buttonLabel',
      'product',
      'productPrice',
      'buttonStyle',
    ]) &&
    isStringOrUndefined(objectKey(value, 'id')) &&
    isStringOrUndefined(objectKey(value, 'title')) &&
    isStringOrUndefined(objectKey(value, 'description')) &&
    isNumberOrUndefined(objectKey(value, 'price')) &&
    isStringOrUndefined(objectKey(value, 'route')) &&
    isStringOrUndefined(objectKey(value, 'buttonLabel')) &&
    isProductOrUndefined(objectKey(value, 'product')) &&
    isProductPriceOrUndefined(objectKey(value, 'productPrice')) &&
    isButtonStyleOrUndefined(objectKey(value, 'buttonStyle'))
  );
}

export function stringifyProductModel(value: ProductModel): string {
  return `ProductModel(${value})`;
}

export function parseProductModel(value: unknown): ProductModel | undefined {
  if (isProductModel(value)) return value;
  return undefined;
}
