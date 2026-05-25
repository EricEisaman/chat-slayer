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

export interface DomainTransferInventoryData extends InventoryData {
  /**
   * Domain name, e.g. `example.fi`
   */
  readonly name: string;

  readonly authId: string;
}

export function createDomainTransferInventoryData(
  name: string,
  authId: string,
): DomainTransferInventoryData {
  return {
    name,
    authId,
  };
}

export function isDomainTransferInventoryData(
  value: unknown,
): value is DomainTransferInventoryData {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['name', 'authId']) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'authId'))
  );
}

export function isPartialDomainTransferInventoryData(
  value: unknown,
): value is Partial<DomainTransferInventoryData> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['name', 'authId']) &&
    isStringOrUndefined(objectKey(value, 'name')) &&
    isStringOrUndefined(objectKey(value, 'authId'))
  );
}

export function explainDomainTransferInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['name']),
    explainProperty('name', explainString(objectKey(value, 'name'))),
    explainProperty('authId', explainString(objectKey(value, 'authId'))),
  ]);
}

export function explainPartialDomainTransferInventoryData(
  value: unknown,
): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['name']),
    explainProperty('name', explainStringOrUndefined(objectKey(value, 'name'))),
    explainProperty(
      'authId',
      explainStringOrUndefined(objectKey(value, 'authId')),
    ),
  ]);
}

export function stringifyDomainTransferInventoryData(
  value: DomainTransferInventoryData,
): string {
  return `DomainTransferInventoryData(${value})`;
}

export function parseDomainTransferInventoryData(
  value: unknown,
): DomainTransferInventoryData | undefined {
  if (isDomainTransferInventoryData(value)) return value;
  return undefined;
}
