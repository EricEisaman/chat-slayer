import {
  MatrixPreviousRoomDTO,
  isMatrixPreviousRoomDTO,
} from './types/MatrixPreviousRoomDTO';
import {MatrixType} from '../../core/MatrixType';
import {isUndefined} from '../../../../core/types/undefined';
import {explainNot, explainOk, explainOr} from '../../../../core/types/explain';
import {isBooleanOrUndefined} from '../../../../core/types/Boolean';
import {isString, isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixRoomCreateEventDTO {
  readonly type?: MatrixType;
  readonly creator: string;
  readonly [MatrixType.M_FEDERATE]?: boolean;
  readonly room_version?: string;
  readonly predecessor?: MatrixPreviousRoomDTO;
}

export function isMatrixCreationContentDTO(
  value: unknown,
): value is MatrixRoomCreateEventDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'creator',
      MatrixType.M_FEDERATE,
      'room_version',
      'predecessor',
    ]) &&
    isString(objectKey(value, 'creator')) &&
    isBooleanOrUndefined(value[MatrixType.M_FEDERATE]) &&
    isStringOrUndefined(objectKey(value, 'room_version')) &&
    (isUndefined(objectKey(value, 'predecessor')) ||
      isMatrixPreviousRoomDTO(objectKey(value, 'predecessor')))
  );
}

export function isPartialMatrixCreationContentDTO(
  value: unknown,
): value is Partial<MatrixRoomCreateEventDTO> {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'creator',
      MatrixType.M_FEDERATE,
      'room_version',
      'predecessor',
    ]) &&
    isStringOrUndefined(objectKey(value, 'creator')) &&
    isBooleanOrUndefined(value[MatrixType.M_FEDERATE]) &&
    isStringOrUndefined(objectKey(value, 'room_version')) &&
    (isUndefined(objectKey(value, 'predecessor')) ||
      isMatrixPreviousRoomDTO(objectKey(value, 'predecessor')))
  );
}

export function isPartialMatrixCreationContentDTOOrUndefined(
  value: unknown,
): value is Partial<MatrixRoomCreateEventDTO> | undefined {
  return value === undefined || isPartialMatrixCreationContentDTO(value);
}

export function explainPartialMatrixCreationContentDTOOrUndefined(
  value: unknown,
): string {
  return isPartialMatrixCreationContentDTOOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['Partial<MatrixCreationContentDTO>', 'undefined']));
}

export function stringifyMatrixCreationContentDTO(
  value: MatrixRoomCreateEventDTO,
): string {
  return `MatrixCreationContentDTO(${value})`;
}

export function parseMatrixCreationContentDTO(
  value: unknown,
): MatrixRoomCreateEventDTO | undefined {
  if (isMatrixCreationContentDTO(value)) return value;
  return undefined;
}
