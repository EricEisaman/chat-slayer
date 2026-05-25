import {
  MatrixVisibility,
  isMatrixVisibilityOrUndefined,
  explainMatrixVisibilityOrUndefined,
} from './types/MatrixVisibility';
import {
  explainMatrixInvite3PidDTO,
  isMatrixInvite3PidDTO,
} from './types/MatrixInvite3PidDTO';
import {
  MatrixRoomCreateEventDTO,
  isPartialMatrixCreationContentDTOOrUndefined,
  explainPartialMatrixCreationContentDTOOrUndefined,
} from '../../event/roomCreate/MatrixRoomCreateEventDTO';
import {
  MatrixStateEvent,
  isMatrixStateEvent,
  explainMatrixStateEvent,
} from '../../core/MatrixStateEvent';
import {
  MatrixCreateRoomPreset,
  isMatrixCreateRoomPresetOrUndefined,
  explainMatrixCreateRoomPresetOrUndefined,
} from './types/MatrixCreateRoomPreset';
import {
  MatrixRoomPowerLevelsEventDTO,
  isMatrixPowerLevelEventContentDTOOrUndefined,
  explainMatrixPowerLevelEventContentDTOOrUndefined,
} from './types/MatrixRoomPowerLevelsEventDTO';
import {MatrixInvite3PidDTO} from './types/MatrixInvite3PidDTO';
import {
  MatrixUserId,
  isMatrixUserId,
  explainMatrixUserId,
} from '../../core/MatrixUserId';
import {
  explainMatrixRoomVersionOrUndefined,
  isMatrixRoomVersionOrUndefined,
  MatrixRoomVersion,
} from '../../MatrixRoomVersion';
import {explain, explainProperty} from '../../../../core/types/explain';
import {
  explainBooleanOrUndefined,
  isBooleanOrUndefined,
} from '../../../../core/types/Boolean';
import {
  explainStringOrUndefined,
  isStringOrUndefined,
} from '../../../../core/types/String';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../core/types/RegularObject';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../../../core/types/OtherKeys';
import {
  explainReadonlyArrayOfOrUndefined,
  isReadonlyArrayOfOrUndefined,
} from '../../../../core/types/Array';

export interface MatrixCreateRoomDTO {
  readonly visibility?: MatrixVisibility;
  readonly room_alias_name?: string;

  /**
   * User friendly room name. This must be unique.
   */
  readonly name?: string;

  readonly topic?: string;
  readonly invite?: readonly MatrixUserId[];
  readonly invite_3pid?: readonly MatrixInvite3PidDTO[];
  readonly room_version?: MatrixRoomVersion;
  readonly creation_content?: Partial<MatrixRoomCreateEventDTO>;
  readonly initial_state?: readonly MatrixStateEvent[];
  readonly preset?: MatrixCreateRoomPreset;
  readonly is_direct?: boolean;
  readonly power_level_content_override?: MatrixRoomPowerLevelsEventDTO;
}

export function isMatrixCreateRoomDTO(
  value: unknown,
): value is MatrixCreateRoomDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'visibility',
      'room_alias_name',
      'name',
      'topic',
      'invite',
      'invite_3pid',
      'room_version',
      'creation_content',
      'initial_state',
      'preset',
      'is_direct',
      'power_level_content_override',
    ]) &&
    isMatrixVisibilityOrUndefined(objectKey(value, 'visibility')) &&
    isStringOrUndefined(objectKey(value, 'room_alias_name')) &&
    isStringOrUndefined(objectKey(value, 'name')) &&
    isStringOrUndefined(objectKey(value, 'topic')) &&
    isReadonlyArrayOfOrUndefined<MatrixUserId>(
      objectKey(value, 'invite'),
      isMatrixUserId,
    ) &&
    isReadonlyArrayOfOrUndefined<MatrixInvite3PidDTO>(
      objectKey(value, 'invite_3pid'),
      isMatrixInvite3PidDTO,
    ) &&
    isMatrixRoomVersionOrUndefined(objectKey(value, 'room_version')) &&
    isPartialMatrixCreationContentDTOOrUndefined(
      objectKey(value, 'creation_content'),
    ) &&
    isReadonlyArrayOfOrUndefined<MatrixStateEvent>(
      objectKey(value, 'initial_state'),
      isMatrixStateEvent,
    ) &&
    isMatrixCreateRoomPresetOrUndefined(objectKey(value, 'preset')) &&
    isBooleanOrUndefined(objectKey(value, 'is_direct')) &&
    isMatrixPowerLevelEventContentDTOOrUndefined(
      objectKey(value, 'power_level_content_override'),
    )
  );
}

export function explainMatrixCreateRoomDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'visibility',
      'room_alias_name',
      'name',
      'topic',
      'invite',
      'invite_3pid',
      'room_version',
      'creation_content',
      'initial_state',
      'preset',
      'is_direct',
      'power_level_content_override',
    ]),
    explainProperty(
      'visibility',
      explainMatrixVisibilityOrUndefined(objectKey(value, 'visibility')),
    ),
    explainProperty(
      'room_alias_name',
      explainStringOrUndefined(objectKey(value, 'room_alias_name')),
    ),
    explainProperty('name', explainStringOrUndefined(objectKey(value, 'name'))),
    explainProperty(
      'topic',
      explainStringOrUndefined(objectKey(value, 'topic')),
    ),
    explainProperty(
      'invite',
      explainReadonlyArrayOfOrUndefined<MatrixUserId>(
        'MatrixUserId',
        explainMatrixUserId,
        objectKey(value, 'invite'),
        isMatrixUserId,
      ),
    ),
    explainProperty(
      'invite_3pid',
      explainReadonlyArrayOfOrUndefined<MatrixInvite3PidDTO>(
        'MatrixInvite3PidDTO',
        explainMatrixInvite3PidDTO,
        objectKey(value, 'invite_3pid'),
        isMatrixInvite3PidDTO,
      ),
    ),
    explainProperty(
      'room_version',
      explainMatrixRoomVersionOrUndefined(objectKey(value, 'room_version')),
    ),
    explainProperty(
      'creation_content',
      explainPartialMatrixCreationContentDTOOrUndefined(
        objectKey(value, 'creation_content'),
      ),
    ),
    explainProperty(
      'initial_state',
      explainReadonlyArrayOfOrUndefined<MatrixStateEvent>(
        'MatrixStateEvent',
        explainMatrixStateEvent,
        objectKey(value, 'initial_state'),
        isMatrixStateEvent,
      ),
    ),
    explainProperty(
      'preset',
      explainMatrixCreateRoomPresetOrUndefined(objectKey(value, 'preset')),
    ),
    explainProperty(
      'explain_direct',
      explainBooleanOrUndefined(objectKey(value, 'explain_direct')),
    ),
    explainProperty(
      'power_level_content_override',
      explainMatrixPowerLevelEventContentDTOOrUndefined(
        objectKey(value, 'power_level_content_override'),
      ),
    ),
  ]);
}

export function stringifyMatrixCreateRoomDTO(
  value: MatrixCreateRoomDTO,
): string {
  return `MatrixCreateRoomDTO(${value})`;
}

export function parseMatrixCreateRoomDTO(
  value: unknown,
): MatrixCreateRoomDTO | undefined {
  if (isMatrixCreateRoomDTO(value)) return value;
  return undefined;
}
