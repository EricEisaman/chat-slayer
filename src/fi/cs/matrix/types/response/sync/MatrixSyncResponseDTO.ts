import {concat} from '../../../../core/functions/concat';
import {
  MatrixSyncResponseRoomsDTO,
  explainMatrixSyncResponseRoomsDTO,
  getEventsFromMatrixSyncResponseRoomsDTO,
  isMatrixSyncResponseRoomsDTO,
} from './types/MatrixSyncResponseRoomsDTO';
import {
  MatrixSyncResponseAccountDataDTO,
  getEventsFromMatrixSyncResponseAccountDataDTO,
  isMatrixSyncResponseAccountDataDTO,
} from './types/MatrixSyncResponseAccountDataDTO';
import {
  MatrixSyncResponsePresenceDTO,
  getEventsFromMatrixSyncResponsePresenceDTO,
  isMatrixSyncResponsePresenceDTO,
} from './types/MatrixSyncResponsePresenceDTO';
import {
  MatrixSyncResponseToDeviceDTO,
  getEventsFromMatrixSyncResponseToDeviceDTO,
  isMatrixSyncResponseToDeviceDTO,
} from './types/MatrixSyncResponseToDeviceDTO';
import {
  MatrixSyncResponseDeviceListsDTO,
  explainMatrixSyncResponseDeviceListsDTO,
  isMatrixSyncResponseDeviceListsDTO,
} from './types/MatrixSyncResponseDeviceListsDTO';
import {
  MatrixSyncResponseDeviceOneTimeKeysCountDTO,
  isMatrixSyncResponseDeviceOneTimeKeysCountDTO,
} from './types/MatrixSyncResponseDeviceOneTimeKeysCountDTO';
import {MatrixSyncResponseAnyEventDTO} from './types/MatrixSyncResponseAnyEventDTO';
import {isUndefined} from '../../../../core/types/undefined';
import {isString} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';
import {keys} from '../../../../core/functions/keys';

export interface MatrixSyncResponseDTO {
  readonly next_batch: string;
  readonly rooms?: MatrixSyncResponseRoomsDTO;
  readonly presence?: MatrixSyncResponsePresenceDTO;
  readonly account_data?: MatrixSyncResponseAccountDataDTO;
  readonly to_device?: MatrixSyncResponseToDeviceDTO;
  readonly device_lists?: MatrixSyncResponseDeviceListsDTO;
  readonly device_one_time_keys_count?: MatrixSyncResponseDeviceOneTimeKeysCountDTO;
}

export function createMatrixSyncResponseDTO(
  next_batch: string,
  rooms?: MatrixSyncResponseRoomsDTO,
  presence?: MatrixSyncResponsePresenceDTO,
  account_data?: MatrixSyncResponseAccountDataDTO,
  to_device?: MatrixSyncResponseToDeviceDTO,
  device_lists?: MatrixSyncResponseDeviceListsDTO,
  device_one_time_keys_count?: MatrixSyncResponseDeviceOneTimeKeysCountDTO,
): MatrixSyncResponseDTO {
  return {
    next_batch,
    rooms,
    presence,
    account_data,
    to_device,
    device_lists,
    device_one_time_keys_count,
  };
}

export function getEventsFromMatrixSyncResponseDTO(
  value: MatrixSyncResponseDTO,
): readonly MatrixSyncResponseAnyEventDTO[] {
  return concat(
    value.rooms ? getEventsFromMatrixSyncResponseRoomsDTO(value.rooms) : [],
    value.presence
      ? getEventsFromMatrixSyncResponsePresenceDTO(value.presence)
      : [],
    value.account_data
      ? getEventsFromMatrixSyncResponseAccountDataDTO(value.account_data)
      : [],
    value.to_device
      ? getEventsFromMatrixSyncResponseToDeviceDTO(value.to_device)
      : [],
  );
}

export function isMatrixSyncResponseDTO(
  value: unknown,
): value is MatrixSyncResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'next_batch',
      'rooms',
      'presence',
      'account_data',
      'to_device',
      'device_lists',
      'device_unused_fallback_key_types',
      'device_one_time_keys_count',
      'org.matrix.msc2732.device_unused_fallback_key_types',
    ]) &&
    isString(objectKey(value, 'next_batch')) &&
    (isUndefined(objectKey(value, 'rooms')) ||
      isMatrixSyncResponseRoomsDTO(objectKey(value, 'rooms'))) &&
    (isUndefined(objectKey(value, 'presence')) ||
      isMatrixSyncResponsePresenceDTO(objectKey(value, 'presence'))) &&
    (isUndefined(objectKey(value, 'account_data')) ||
      isMatrixSyncResponseAccountDataDTO(objectKey(value, 'account_data'))) &&
    (isUndefined(objectKey(value, 'to_device')) ||
      isMatrixSyncResponseToDeviceDTO(objectKey(value, 'to_device'))) &&
    (isUndefined(objectKey(value, 'device_lists')) ||
      isMatrixSyncResponseDeviceListsDTO(objectKey(value, 'device_lists'))) &&
    (isUndefined(objectKey(value, 'device_one_time_keys_count')) ||
      isMatrixSyncResponseDeviceOneTimeKeysCountDTO(
        objectKey(value, 'device_one_time_keys_count'),
      ))
  );
}

export function assertMatrixSyncResponseDTO(value: unknown): void {
  if (!isRegularObject(value)) {
    throw new TypeError('value not RegularObject');
  }

  if (
    !hasNoOtherKeysInDevelopment(value, [
      'next_batch',
      'rooms',
      'presence',
      'account_data',
      'to_device',
      'device_lists',
      'device_one_time_keys_count',
      'device_unused_fallback_key_types',
      'org.matrix.msc2732.device_unused_fallback_key_types',
    ])
  ) {
    throw new TypeError(`value has additional keys: ${keys(value)}`);
  }

  if (!isString(objectKey(value, 'next_batch'))) {
    throw new TypeError('Property "next_batch" was not string');
  }

  if (
    !(
      isUndefined(objectKey(value, 'rooms')) ||
      isMatrixSyncResponseRoomsDTO(objectKey(value, 'rooms'))
    )
  ) {
    throw new TypeError(
      `Property "rooms" was invalid: ${explainMatrixSyncResponseRoomsDTO(objectKey(value, 'rooms'))}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'presence')) ||
      isMatrixSyncResponsePresenceDTO(objectKey(value, 'presence'))
    )
  ) {
    throw new TypeError('Property "presence" was invalid');
  }

  if (
    !(
      isUndefined(objectKey(value, 'account_data')) ||
      isMatrixSyncResponseAccountDataDTO(objectKey(value, 'account_data'))
    )
  ) {
    throw new TypeError('Property "account_data" was invalid');
  }

  if (
    !(
      isUndefined(objectKey(value, 'to_device')) ||
      isMatrixSyncResponseToDeviceDTO(objectKey(value, 'to_device'))
    )
  ) {
    throw new TypeError('Property "to_device" was invalid');
  }

  if (
    !(
      isUndefined(objectKey(value, 'device_lists')) ||
      isMatrixSyncResponseDeviceListsDTO(objectKey(value, 'device_lists'))
    )
  ) {
    throw new TypeError(
      `Property "device_lists" was invalid: ${explainMatrixSyncResponseDeviceListsDTO(
        objectKey(value, 'device_lists'),
      )}`,
    );
  }

  if (
    !(
      isUndefined(objectKey(value, 'device_one_time_keys_count')) ||
      isMatrixSyncResponseDeviceOneTimeKeysCountDTO(
        objectKey(value, 'device_one_time_keys_count'),
      )
    )
  ) {
    throw new TypeError('Property "device_one_time_keys_count" was invalid');
  }
}

export function explainMatrixSyncResponseDTO(value: unknown): string {
  try {
    assertMatrixSyncResponseDTO(value);
    return 'No errors detected';
  } catch (err: unknown) {
    return err instanceof Error ? err.message : String(err);
  }
}

export function stringifyMatrixSyncResponseDTO(
  value: MatrixSyncResponseDTO,
): string {
  return `MatrixSyncResponseDTO(${value})`;
}

export function parseMatrixSyncResponseDTO(
  value: unknown,
): MatrixSyncResponseDTO | undefined {
  if (isMatrixSyncResponseDTO(value)) return value;
  return undefined;
}
