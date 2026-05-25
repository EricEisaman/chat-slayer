import {
  MatrixJoinRoomThirdPartySignedDTO,
  isMatrixJoinRoomThirdPartySignedDTO,
} from './types/MatrixJoinRoomThirdPartySignedDTO';
import {isUndefined} from '../../../../core/types/undefined';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixJoinRoomRequestDTO {
  readonly third_party_signed?: MatrixJoinRoomThirdPartySignedDTO;
}

export function isMatrixJoinRoomRequestDTO(
  value: unknown,
): value is MatrixJoinRoomRequestDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['third_party_signed']) &&
    (isUndefined(objectKey(value, 'third_party_signed')) ||
      isMatrixJoinRoomThirdPartySignedDTO(
        objectKey(value, 'third_party_signed'),
      ))
  );
}

export function stringifyMatrixJoinRoomRequestDTO(
  value: MatrixJoinRoomRequestDTO,
): string {
  return `MatrixJoinRoomRequestDTO(${value})`;
}

export function parseMatrixJoinRoomRequestDTO(
  value: unknown,
): MatrixJoinRoomRequestDTO | undefined {
  if (isMatrixJoinRoomRequestDTO(value)) return value;
  return undefined;
}
