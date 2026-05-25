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

export interface DomainInventoryData extends InventoryData {
  /**
   * Domain name, e.g. `example.fi`
   */
  readonly name: string;
}

export function createDomainInventoryData(name: string): DomainInventoryData {
  return {
    name,
  };
}

export function isDomainInventoryData(
  value: unknown,
): value is DomainInventoryData {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['name']) &&
    isString(objectKey(value, 'name'))
  );
}

export function isPartialDomainInventoryData(
  value: unknown,
): value is Partial<DomainInventoryData> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['name']) &&
    isStringOrUndefined(objectKey(value, 'name'))
  );
}

export function explainDomainInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['name']),
    explainProperty('name', explainString(objectKey(value, 'name'))),
  ]);
}

export function explainPartialDomainInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['name']),
    explainProperty('name', explainStringOrUndefined(objectKey(value, 'name'))),
  ]);
}

export function stringifyDomainInventoryData(
  value: DomainInventoryData,
): string {
  return `DomainInventoryData(${value})`;
}

export function parseDomainInventoryData(
  value: unknown,
): DomainInventoryData | undefined {
  if (isDomainInventoryData(value)) return value;
  return undefined;
}
