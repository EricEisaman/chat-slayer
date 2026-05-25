import {isReadonlyJsonObject, ReadonlyJsonObject} from '../../../../core/Json';
import {isUndefined} from '../../../../core/types/undefined';
import {isStringOrUndefined} from '../../../../core/types/String';
import {isNumberOrUndefined} from '../../../../core/types/Number';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface GetRoomStateByTypeResponseDTO {
  readonly name?: string;
  readonly version?: number;
  readonly data?: ReadonlyJsonObject;
}

export function createGetRoomStateByTypeResponseDTO(
  name?: string,
  version?: number,
  data?: ReadonlyJsonObject,
): GetRoomStateByTypeResponseDTO {
  return {
    name,
    version,
    data,
  };
}

export function isGetRoomStateByTypeResponseDTO(
  value: unknown,
): value is GetRoomStateByTypeResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['name', 'version', 'data']) &&
    isStringOrUndefined(objectKey(value, 'name')) &&
    isNumberOrUndefined(objectKey(value, 'version')) &&
    (isUndefined(objectKey(value, 'data')) ||
      isReadonlyJsonObject(objectKey(value, 'data')))
  );
}

export function stringifyGetRoomStateByTypeResponseDTO(
  value: GetRoomStateByTypeResponseDTO,
): string {
  return `GetRoomStateByTypeResponseDTO(${value})`;
}

export function parseGetRoomStateByTypeResponseDTO(
  value: unknown,
): GetRoomStateByTypeResponseDTO | undefined {
  if (isGetRoomStateByTypeResponseDTO(value)) return value;
  return undefined;
}
