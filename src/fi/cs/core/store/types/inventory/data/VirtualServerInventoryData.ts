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
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../../types/OtherKeys';

export interface VirtualServerInventoryData extends InventoryData {
  /**
   * Host system name, e.g. `"vm3"`
   */
  readonly system: string;

  /**
   * The virtual server name, e.g. `"s123"`
   */
  readonly name: string;
}

export function createVirtualServerInventoryData(
  system: string,
  name: string,
): VirtualServerInventoryData {
  return {
    system,
    name,
  };
}

export function isVirtualServerInventoryData(
  value: unknown,
): value is VirtualServerInventoryData {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['system', 'name']) &&
    isString(objectKey(value, 'system')) &&
    isString(objectKey(value, 'name'))
  );
}

export function explainVirtualServerInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value) &&
      explainNoOtherKeys(value, ['system', 'name']) &&
      explainProperty('system', explainString(objectKey(value, 'system'))) &&
      explainProperty('name', explainString(objectKey(value, 'name'))),
  ]);
}

export function isPartialVirtualServerInventoryData(
  value: unknown,
): value is Partial<VirtualServerInventoryData> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['system', 'name']) &&
    isStringOrUndefined(objectKey(value, 'system')) &&
    isStringOrUndefined(objectKey(value, 'name'))
  );
}

export function explainPartialVirtualServerInventoryData(
  value: unknown,
): string {
  return explain([
    explainRegularObject(value) &&
      explainNoOtherKeys(value, ['system', 'name']) &&
      explainProperty(
        'system',
        explainStringOrUndefined(objectKey(value, 'system')),
      ) &&
      explainProperty(
        'name',
        explainStringOrUndefined(objectKey(value, 'name')),
      ),
  ]);
}

export function stringifyVirtualServerInventoryData(
  value: VirtualServerInventoryData,
): string {
  return `VirtualServerInventoryData(${value})`;
}

export function parseVirtualServerInventoryData(
  value: unknown,
): VirtualServerInventoryData | undefined {
  if (isVirtualServerInventoryData(value)) return value;
  return undefined;
}
