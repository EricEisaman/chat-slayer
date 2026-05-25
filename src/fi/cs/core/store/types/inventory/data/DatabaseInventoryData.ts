import {InventoryData} from './InventoryData';
import {isString} from '../../../../types/String';
import {isRegularObject, objectKey} from '../../../../types/RegularObject';
import {hasNoOtherKeys} from '../../../../types/OtherKeys';

export interface DatabaseInventoryData extends InventoryData {
  readonly hostname: string;
  readonly username: string;

  /**
   * Database name
   */
  readonly name: string;
}

export function createDatabaseInventoryData(
  hostname: string,
  username: string,
  name: string,
): DatabaseInventoryData {
  return {
    hostname,
    username,
    name,
  };
}

export function isDatabaseInventoryData(
  value: unknown,
): value is DatabaseInventoryData {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['hostname', 'username', 'name']) &&
    isString(objectKey(value, 'hostname')) &&
    isString(objectKey(value, 'username')) &&
    isString(objectKey(value, 'name'))
  );
}

export function stringifyDatabaseInventoryData(
  value: DatabaseInventoryData,
): string {
  return `DatabaseInventoryData(${value})`;
}

export function parseDatabaseInventoryData(
  value: unknown,
): DatabaseInventoryData | undefined {
  if (isDatabaseInventoryData(value)) return value;
  return undefined;
}
