import {
  MatrixEventPowerLevelsDTO,
  isMatrixEventPowerLevelsDTOOrUndefined,
  explainMatrixEventPowerLevelsDTOOrUndefined,
} from './MatrixEventPowerLevelsDTO';
import {
  MatrixUserPowerLevelsDTO,
  isMatrixUserPowerLevelsDTOOrUndefined,
  explainMatrixUserPowerLevelsDTOOrUndefined,
} from './MatrixUserPowerLevelsDTO';
import {
  MatrixNotificationPowerLevelsDTO,
  isMatrixNotificationPowerLevelsDTOOrUndefined,
  explainMatrixNotificationPowerLevelsDTOOrUndefined,
} from './MatrixNotificationPowerLevelsDTO';
import {isUndefined} from '../../../../../core/types/undefined';
import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from '../../../../../core/types/explain';
import {
  explainIntegerOrUndefined,
  isIntegerOrUndefined,
} from '../../../../../core/types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {
  explainNoOtherKeys,
  hasNoOtherKeysInDevelopment,
} from '../../../../../core/types/OtherKeys';

export interface MatrixRoomPowerLevelsEventDTO {
  readonly ban?: number;
  readonly events?: MatrixEventPowerLevelsDTO;
  readonly events_default?: number;
  readonly invite?: number;
  readonly kick?: number;
  readonly redact?: number;
  readonly state_default?: number;
  readonly users?: MatrixUserPowerLevelsDTO;
  readonly users_default?: number;
  readonly notifications?: MatrixNotificationPowerLevelsDTO;
}

export function isMatrixPowerLevelEventContentDTO(
  value: unknown,
): value is MatrixRoomPowerLevelsEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'ban',
      'events',
      'events_default',
      'invite',
      'kick',
      'redact',
      'state_default',
      'users',
      'users_default',
      'notifications',
    ]) &&
    isIntegerOrUndefined(objectKey(value, 'ban')) &&
    isMatrixEventPowerLevelsDTOOrUndefined(objectKey(value, 'events')) &&
    isIntegerOrUndefined(objectKey(value, 'events_default')) &&
    isIntegerOrUndefined(objectKey(value, 'invite')) &&
    isIntegerOrUndefined(objectKey(value, 'kick')) &&
    isIntegerOrUndefined(objectKey(value, 'redact')) &&
    isIntegerOrUndefined(objectKey(value, 'state_default')) &&
    isMatrixUserPowerLevelsDTOOrUndefined(objectKey(value, 'users')) &&
    isIntegerOrUndefined(objectKey(value, 'users_default')) &&
    isMatrixNotificationPowerLevelsDTOOrUndefined(
      objectKey(value, 'notifications'),
    )
  );
}

export function explainMatrixPowerLevelEventContentDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'ban',
      'events',
      'events_default',
      'invite',
      'kick',
      'redact',
      'state_default',
      'users',
      'users_default',
      'notifications',
    ]),
    explainProperty('ban', explainIntegerOrUndefined(objectKey(value, 'ban'))),
    explainProperty(
      'events',
      explainMatrixEventPowerLevelsDTOOrUndefined(objectKey(value, 'events')),
    ),
    explainProperty(
      'events_default',
      explainIntegerOrUndefined(objectKey(value, 'events_default')),
    ),
    explainProperty(
      'invite',
      explainIntegerOrUndefined(objectKey(value, 'invite')),
    ),
    explainProperty(
      'kick',
      explainIntegerOrUndefined(objectKey(value, 'kick')),
    ),
    explainProperty(
      'redact',
      explainIntegerOrUndefined(objectKey(value, 'redact')),
    ),
    explainProperty(
      'state_default',
      explainIntegerOrUndefined(objectKey(value, 'state_default')),
    ),
    explainProperty(
      'users',
      explainMatrixUserPowerLevelsDTOOrUndefined(objectKey(value, 'users')),
    ),
    explainProperty(
      'users_default',
      explainIntegerOrUndefined(objectKey(value, 'users_default')),
    ),
    explainProperty(
      'notifications',
      explainMatrixNotificationPowerLevelsDTOOrUndefined(
        objectKey(value, 'notifications'),
      ),
    ),
  ]);
}

export function isMatrixPowerLevelEventContentDTOOrUndefined(
  value: unknown,
): value is MatrixRoomPowerLevelsEventDTO | undefined {
  return isUndefined(value) || isMatrixPowerLevelEventContentDTO(value);
}

export function explainMatrixPowerLevelEventContentDTOOrUndefined(
  value: unknown,
): string {
  return isMatrixPowerLevelEventContentDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['MatrixPowerLevelEventContentDTO', 'undefined']));
}

export function stringifyMatrixPowerLevelEventContentDTO(
  value: MatrixRoomPowerLevelsEventDTO,
): string {
  return `MatrixPowerLevelEventContentDTO(${value})`;
}

export function parseMatrixPowerLevelEventContentDTO(
  value: unknown,
): MatrixRoomPowerLevelsEventDTO | undefined {
  if (isMatrixPowerLevelEventContentDTO(value)) return value;
  return undefined;
}
