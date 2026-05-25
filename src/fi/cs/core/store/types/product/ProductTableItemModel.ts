import {ProductPriceType} from './ProductPriceType';
import {Product} from './Product';
import {ProductPrice} from './ProductPrice';

export interface ProductTableItemModel {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly buttonTo: string | undefined;
  readonly gb: number;
  readonly price: number;
  readonly priceVatPercent: number;
  readonly priceType: ProductPriceType;
  readonly priceTypeOptions: ProductPriceType[];
  readonly isButton: boolean;
  readonly priceModel: ProductPrice | undefined;
  readonly productModel: Product | undefined;
}
