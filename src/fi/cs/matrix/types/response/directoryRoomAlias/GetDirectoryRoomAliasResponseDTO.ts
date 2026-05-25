import {isString} from '../../../../core/types/String';
import {isStringArray} from '../../../../core/types/StringArray';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface GetDirectoryRoomAliasResponseDTO {
  readonly room_id: string;
  readonly servers: readonly string[];
}

export function createGetDirectoryRoomAliasResponseDTO(
  room_id: string,
  servers: readonly string[],
): GetDirectoryRoomAliasResponseDTO {
  return {
    room_id,
    servers,
  };
}

export function isGetDirectoryRoomAliasResponseDTO(
  value: unknown,
): value is GetDirectoryRoomAliasResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['room_id', 'servers']) &&
    isString(objectKey(value, 'room_id')) &&
    isStringArray(objectKey(value, 'servers'))
  );
}

export function stringifyGetDirectoryRoomAliasResponseDTO(
  value: GetDirectoryRoomAliasResponseDTO,
): string {
  return `GetDirectoryRoomAliasResponseDTO(${value})`;
}

export function parseGetDirectoryRoomAliasResponseDTO(
  value: unknown,
): GetDirectoryRoomAliasResponseDTO | undefined {
  if (isGetDirectoryRoomAliasResponseDTO(value)) return value;
  return undefined;
}
