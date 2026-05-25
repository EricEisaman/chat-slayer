import {
  explainNumberOrUndefined,
  isNumberOrUndefined,
} from '../../../../types/Number';
import {InventoryData} from './InventoryData';
import {explain, explainProperty} from '../../../../types/explain';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../../types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {
  explainNoOtherKeys,
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../../../types/OtherKeys';

export interface WebHotelInventoryData extends InventoryData {
  /**
   * Host system name, e.g. `"lxc3"`
   */
  readonly system: string;

  /**
   * The virtual server name, e.g. `"example-1"`
   */
  readonly name: string;

  /**
   * Total storage in MBs this item should use (but not limited to this)
   */
  readonly totalStorage?: number | undefined;

  /**
   * Total used storage in MBs from the system
   */
  readonly usedStorage?: number | undefined;
}

export function createWebHotelInventoryData(
  system: string,
  name: string,
  totalStorage?: number | undefined,
  usedStorage?: number | undefined,
): WebHotelInventoryData {
  return {
    system,
    name,
    totalStorage: totalStorage ?? undefined,
    usedStorage: usedStorage ?? undefined,
  };
}

export function isWebHotelInventoryData(
  value: unknown,
): value is WebHotelInventoryData {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'system',
      'name',
      'totalStorage',
      'usedStorage',
    ]) &&
    isString(objectKey(value, 'system')) &&
    isString(objectKey(value, 'name')) &&
    isNumberOrUndefined(objectKey(value, 'totalStorage')) &&
    isNumberOrUndefined(objectKey(value, 'usedStorage'))
  );
}

export function explainWebHotelInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value) &&
      explainNoOtherKeysInDevelopment(value, [
        'system',
        'name',
        'totalStorage',
        'usedStorage',
      ]) &&
      explainProperty('system', explainString(objectKey(value, 'system'))) &&
      explainProperty('name', explainString(objectKey(value, 'name'))) &&
      explainProperty(
        'totalStorage',
        explainNumberOrUndefined(objectKey(value, 'totalStorage')),
      ) &&
      explainProperty(
        'usedStorage',
        explainNumberOrUndefined(objectKey(value, 'usedStorage')),
      ),
  ]);
}

export function isPartialWebHotelInventoryData(
  value: unknown,
): value is Partial<WebHotelInventoryData> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['system', 'name', 'totalStorage', 'usedStorage']) &&
    isStringOrUndefined(objectKey(value, 'system')) &&
    isStringOrUndefined(objectKey(value, 'name')) &&
    isNumberOrUndefined(objectKey(value, 'totalStorage')) &&
    isNumberOrUndefined(objectKey(value, 'usedStorage'))
  );
}

export function explainPartialWebHotelInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value) &&
      explainNoOtherKeys(value, [
        'system',
        'name',
        'totalStorage',
        'usedStorage',
      ]) &&
      explainProperty(
        'system',
        explainStringOrUndefined(objectKey(value, 'system')),
      ) &&
      explainProperty(
        'name',
        explainStringOrUndefined(objectKey(value, 'name')),
      ) &&
      explainProperty(
        'totalStorage',
        explainNumberOrUndefined(objectKey(value, 'totalStorage')),
      ) &&
      explainProperty(
        'usedStorage',
        explainNumberOrUndefined(objectKey(value, 'usedStorage')),
      ),
  ]);
}

export function parseWebHotelInventoryData(
  value: unknown,
): WebHotelInventoryData | undefined {
  if (isWebHotelInventoryData(value)) return value;
  return undefined;
}
