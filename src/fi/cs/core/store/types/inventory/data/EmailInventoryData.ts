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
  hasNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../../../types/OtherKeys';

export interface EmailInventoryData extends InventoryData {
  readonly hostname: string;
  readonly username: string;

  /**
   * Total storage in MBs this item should use (but not limited to this)
   */
  readonly totalStorage?: number | undefined;

  /**
   * Total used storage in MBs from the system
   */
  readonly usedStorage?: number | undefined;
}

export function createEmailInventoryData(
  hostname: string,
  username: string,
  totalStorage?: number | undefined,
  usedStorage?: number | undefined,
): EmailInventoryData {
  return {
    hostname,
    username,
    totalStorage: totalStorage ?? undefined,
    usedStorage: usedStorage ?? undefined,
  };
}

export function isEmailInventoryData(
  value: unknown,
): value is EmailInventoryData {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'hostname',
      'username',
      'totalStorage',
      'usedStorage',
    ]) &&
    isString(objectKey(value, 'hostname')) &&
    isString(objectKey(value, 'username')) &&
    isNumberOrUndefined(objectKey(value, 'totalStorage')) &&
    isNumberOrUndefined(objectKey(value, 'usedStorage'))
  );
}

export function explainEmailInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value) &&
      explainNoOtherKeys(value, [
        'hostname',
        'username',
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
        'totalStorage',
        explainNumberOrUndefined(objectKey(value, 'totalStorage')),
      ) &&
      explainProperty(
        'usedStorage',
        explainNumberOrUndefined(objectKey(value, 'usedStorage')),
      ),
  ]);
}

export function isPartialEmailInventoryData(
  value: unknown,
): value is Partial<EmailInventoryData> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'hostname',
      'username',
      'totalStorage',
      'usedStorage',
    ]) &&
    isStringOrUndefined(objectKey(value, 'hostname')) &&
    isStringOrUndefined(objectKey(value, 'username')) &&
    isNumberOrUndefined(objectKey(value, 'totalStorage')) &&
    isNumberOrUndefined(objectKey(value, 'usedStorage'))
  );
}

export function explainPartialEmailInventoryData(value: unknown): string {
  return explain([
    explainRegularObject(value) &&
      explainNoOtherKeys(value, [
        'hostname',
        'username',
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
        'totalStorage',
        explainNumberOrUndefined(objectKey(value, 'totalStorage')),
      ) &&
      explainProperty(
        'usedStorage',
        explainNumberOrUndefined(objectKey(value, 'usedStorage')),
      ),
  ]);
}

export function parseEmailInventoryData(
  value: unknown,
): EmailInventoryData | undefined {
  if (isEmailInventoryData(value)) return value;
  return undefined;
}
