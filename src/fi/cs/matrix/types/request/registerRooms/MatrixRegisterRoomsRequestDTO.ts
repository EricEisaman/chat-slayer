import {explain, explainProperty} from '../../../../core/types/explain';
import {
  explainReadonlyArrayOfOrUndefined,
  isReadonlyArrayOfOrUndefined,
} from '../../../../core/types/Array';
import {
  explainStringOrUndefined,
  isStringOrUndefined,
} from '../../../../core/types/String';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../../../core/types/OtherKeys';
import {explainRegularObject, isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {
  MatrixVisibility,
  isMatrixVisibilityOrUndefined,
  explainMatrixVisibilityOrUndefined,
} from '../createRoom/types/MatrixVisibility';
import {
  MatrixRoomVersion,
  explainMatrixRoomVersionOrUndefined,
  isMatrixRoomVersionOrUndefined,
} from '../../MatrixRoomVersion';

export interface MatrixRegisterRoomsRequestDTO {
  /** Display names to ensure exist (case-insensitive unique per server). */
  readonly names: readonly string[];
  readonly visibility?: MatrixVisibility;
  readonly room_version?: MatrixRoomVersion;
}

export function isMatrixRegisterRoomsRequestDTO(
  value: unknown,
): value is MatrixRegisterRoomsRequestDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['names', 'visibility', 'room_version']) &&
    (() => {
      const names = objectKey(value, 'names');
      return (
        Array.isArray(names) &&
        names.length > 0 &&
        names.every((item): item is string => typeof item === 'string')
      );
    })() &&
    isMatrixVisibilityOrUndefined(objectKey(value, 'visibility')) &&
    isMatrixRoomVersionOrUndefined(objectKey(value, 'room_version'))
  );
}

export function explainMatrixRegisterRoomsRequestDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['names', 'visibility', 'room_version']),
    explainProperty(
      'names',
      explainReadonlyArrayOfOrUndefined<string>(
        'string',
        explainStringOrUndefined,
        objectKey(value, 'names'),
        (item): item is string => typeof item === 'string',
      ),
    ),
    explainProperty(
      'visibility',
      explainMatrixVisibilityOrUndefined(objectKey(value, 'visibility')),
    ),
    explainProperty(
      'room_version',
      explainMatrixRoomVersionOrUndefined(objectKey(value, 'room_version')),
    ),
  ]);
}
