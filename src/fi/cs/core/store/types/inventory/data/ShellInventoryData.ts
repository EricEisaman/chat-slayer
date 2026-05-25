import {InventoryData} from './InventoryData';
import {explain, explainProperty} from '../../../../types/explain';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../../types/String';
import {
  explainNumber,
  explainNumberOrUndefined,
  isNumber,
  isNumberOrUndefined,
} from '../../../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../../../types/OtherKeys';

export interface ShellInventoryData extends InventoryData {
  readonly hostname: string;

  readonly username: string;

  /**
   * Note! Other users of the server may see this
   */
  readonly realName: string;

  /**
   * SSH Port, defaults to 22.
   */
  readonly port: number;

  /**
   * Total storage in MBs this item should use (but not limited to this)
   */
  readonly totalStorage?: number | undefined;

  /**
   * Total used storage in MBs from the system
   */
  readonly usedStorage?: number | undefined;
}

export function createShellInventoryData(
  hostname: string,
  username: string,
  realName: string,
  port?: number,
  totalStorage?: number | undefined,
  usedStorage?: number | undefined,
): ShellInventoryData {
  return {
    hostname,
    username,
    realName,
    port: port ?? 22,
    totalStorage: totalStorage ?? undefined,
    usedStorage: usedStorage ?? undefined,
  };
}

export function isShellInventoryData(
  value: unknown,
): value is ShellInventoryData {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'hostname',
      'username',
      'realName',
      'port',
      'totalStorage',
      'usedStorage',
    ]) &&
    isString(objectKey(value, 'hostname')) &&
    isString(objectKey(value, 'username')) &&
    isString(objectKey(value, 'realName')) &&
    isNumber(objectKey(value, 'port')) &&
    isNumberOrUndefined(objectKey(value, 'totalStorage')) &&
    isNumberOrUndefined(objectKey(value, 'usedStorage'))
  );
}

export function explainShellInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value) &&
      explainNoOtherKeysInDevelopment(value, [
        'hostname',
        'username',
        'realName',
        'port',
        'totalStorage',
        'usedStorage',
      ]) &&
      explainProperty(
        'hostname',
        explainString(objectKey(value, 'hostname')),
      ) &&
      explainProperty(
        'username',
        explainString(objectKey(value, 'username')),
      ) &&
      explainProperty(
        'realName',
        explainString(objectKey(value, 'realName')),
      ) &&
      explainProperty('port', explainNumber(objectKey(value, 'port'))) &&
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

export function isPartialShellInventoryData(
  value: unknown,
): value is Partial<ShellInventoryData> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'hostname',
      'username',
      'realName',
      'port',
      'totalStorage',
      'usedStorage',
    ]) &&
    isStringOrUndefined(objectKey(value, 'hostname')) &&
    isStringOrUndefined(objectKey(value, 'username')) &&
    isStringOrUndefined(objectKey(value, 'realName')) &&
    isNumberOrUndefined(objectKey(value, 'port')) &&
    isNumberOrUndefined(objectKey(value, 'totalStorage')) &&
    isNumberOrUndefined(objectKey(value, 'usedStorage'))
  );
}

export function explainPartialShellInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value) &&
      explainNoOtherKeysInDevelopment(value, [
        'hostname',
        'username',
        'realName',
        'port',
        'totalStorage',
        'usedStorage',
      ]) &&
      explainProperty(
        'hostname',
        explainStringOrUndefined(objectKey(value, 'hostname')),
      ) &&
      explainProperty(
        'username',
        explainStringOrUndefined(objectKey(value, 'username')),
      ) &&
      explainProperty(
        'realName',
        explainStringOrUndefined(objectKey(value, 'realName')),
      ) &&
      explainProperty(
        'port',
        explainNumberOrUndefined(objectKey(value, 'port')),
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

export function parseShellInventoryData(
  value: unknown,
): ShellInventoryData | undefined {
  if (isShellInventoryData(value)) return value;
  return undefined;
}
