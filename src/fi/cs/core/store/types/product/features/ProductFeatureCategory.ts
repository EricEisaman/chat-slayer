import {
  explainEnum,
  isEnum,
  parseEnum,
  stringifyEnum,
} from '../../../../types/Enum';

export enum ProductFeatureCategory {
  SUPPORT = 'SUPPORT',
  UPGRADE = 'UPGRADE',
  DISK = 'DISK',
  DISK_2 = 'DISK_2',
  DISK_3 = 'DISK_3',
  MEMORY = 'MEMORY',
  CPU = 'CPU',
  NETWORK = 'NETWORK',
  VPS = 'VPS',
}

export function isProductFeatureCategory(
  value: unknown,
): value is ProductFeatureCategory {
  return isEnum(ProductFeatureCategory, value);
}

export function explainProductFeatureCategory(value: unknown): string {
  return explainEnum(
    'ProductFeatureCategory',
    ProductFeatureCategory,
    isProductFeatureCategory,
    value,
  );
}

export function stringifyProductFeatureCategory(
  value: ProductFeatureCategory,
): string {
  return stringifyEnum(ProductFeatureCategory, value);
}

export function parseProductFeatureCategory(
  value: unknown,
): ProductFeatureCategory | undefined {
  return parseEnum(ProductFeatureCategory, value) as
    | ProductFeatureCategory
    | undefined;
}
