import {
  explainReadonlyJsonObject,
  isReadonlyJsonObject,
  ReadonlyJsonObject,
} from '../../../../Json';

export interface InventoryData extends ReadonlyJsonObject {}

export function isInventoryData(value: unknown): value is InventoryData {
  return isReadonlyJsonObject(value);
}

export function explainInventoryData(value: unknown): string {
  return explainReadonlyJsonObject(value);
}
