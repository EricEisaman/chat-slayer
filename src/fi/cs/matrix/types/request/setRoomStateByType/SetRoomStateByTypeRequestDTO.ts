import {isReadonlyJsonObject, ReadonlyJsonObject} from '../../../../core/Json';
import {isUndefined} from '../../../../core/types/undefined';
import {isBooleanOrUndefined} from '../../../../core/types/Boolean';
import {isStringOrUndefined} from '../../../../core/types/String';
import {isNumberOrUndefined} from '../../../../core/types/Number';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface SetRoomStateByTypeRequestDTO {
  readonly avatar_url?: string;
  readonly displayname?: string;
  readonly membership?: string;
  readonly version?: number;
  readonly data?: ReadonlyJsonObject;
  readonly deleted?: boolean;
}

export function createSetRoomStateByTypeRequestDTO(
  avatar_url?: string,
  displayname?: string,
  membership?: string,
  version?: number,
  data?: ReadonlyJsonObject,
  deleted?: boolean,
): SetRoomStateByTypeRequestDTO {
  return {
    avatar_url,
    displayname,
    membership,
    version,
    data,
    deleted,
  };
}

export function isSetRoomStateByTypeRequestDTO(
  value: unknown,
): value is SetRoomStateByTypeRequestDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'avatar_url',
      'displayname',
      'membership',
      'version',
      'data',
      'deleted',
    ]) &&
    isStringOrUndefined(objectKey(value, 'avatar_url')) &&
    isStringOrUndefined(objectKey(value, 'displayname')) &&
    isStringOrUndefined(objectKey(value, 'membership')) &&
    isNumberOrUndefined(objectKey(value, 'version')) &&
    (isUndefined(objectKey(value, 'data')) ||
      isReadonlyJsonObject(objectKey(value, 'data'))) &&
    isBooleanOrUndefined(objectKey(value, 'deleted'))
  );
}

export function stringifySetRoomStateByTypeRequestDTO(
  value: SetRoomStateByTypeRequestDTO,
): string {
  return `SetRoomStateByTypeRequestDTO(${value})`;
}

export function parseSetRoomStateByTypeRequestDTO(
  value: unknown,
): SetRoomStateByTypeRequestDTO | undefined {
  if (isSetRoomStateByTypeRequestDTO(value)) return value;
  return undefined;
}
