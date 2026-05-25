import {isString, isStringOrUndefined} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../../core/types/OtherKeys';

export interface Device {
  /**
   * The internal database ID, which cannot be changed.
   */
  readonly id: string;

  /**
   * The user ID who this device belongs to
   */
  readonly userId: string;

  /**
   * The ID which may be provided by the client
   */
  readonly deviceId?: string;
}

export function createDevice(
  id: string,
  userId: string,
  deviceId?: string | undefined,
): Device {
  return {
    id,
    userId,
    deviceId,
  };
}

export function isDevice(value: unknown): value is Device {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['id', 'userId', 'deviceId']) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'userId')) &&
    isStringOrUndefined(objectKey(value, 'deviceId'))
  );
}

export function stringifyDevice(value: Device): string {
  return `Device(${value})`;
}

export function parseDevice(value: unknown): Device | undefined {
  if (isDevice(value)) return value;
  return undefined;
}
