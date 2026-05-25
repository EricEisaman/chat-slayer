import {SimpleRepositoryItem} from '../../../../../core/simpleRepository/types/SimpleRepositoryItem';
import {createDevice, Device, isDevice} from './Device';
import {parseJson} from '../../../../../core/Json';
import {
  createStoredDeviceRepositoryItem,
  StoredDeviceRepositoryItem,
} from './StoredDeviceRepositoryItem';
import {isString, isStringOrUndefined} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../core/types/OtherKeys';

export interface DeviceRepositoryItem extends SimpleRepositoryItem<Device> {
  readonly id: string;
  readonly userId: string;
  readonly deviceId?: string;
  readonly target: Device;
}

export function createDeviceRepositoryItem(
  id: string,
  target: Device,
): DeviceRepositoryItem {
  return {
    id,
    userId: target?.userId,
    deviceId: target?.deviceId,
    target,
  };
}

export function isDeviceRepositoryItem(
  value: unknown,
): value is DeviceRepositoryItem {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'userId', 'deviceId', 'target']) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'userId')) &&
    isStringOrUndefined(objectKey(value, 'deviceId')) &&
    isDevice(objectKey(value, 'target'))
  );
}

export function stringifyDeviceRepositoryItem(
  value: DeviceRepositoryItem,
): string {
  return `CsMatrixDeviceRepositoryItem(${value})`;
}

export function parseDeviceRepositoryItem(
  id: string,
  unparsedTarget: any,
): DeviceRepositoryItem | undefined {
  const target = parseJson(unparsedTarget);
  if (!isDevice(target)) return undefined;
  return createDeviceRepositoryItem(
    id,
    createDevice(target?.id, target?.userId, target?.deviceId),
  );
}

export function toStoredDeviceRepositoryItem(
  item: DeviceRepositoryItem,
): StoredDeviceRepositoryItem {
  if (!item?.target?.deviceId) throw new TypeError('No device ID');
  return createStoredDeviceRepositoryItem(
    item.id,
    item?.target?.userId,
    item?.target?.deviceId,
    JSON.stringify(item.target),
  );
}
