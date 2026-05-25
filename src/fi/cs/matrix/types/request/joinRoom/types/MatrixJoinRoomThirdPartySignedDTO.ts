import {MatrixUserId, isMatrixUserId} from '../../../core/MatrixUserId';
import {isJsonObject, JsonObject} from '../../../../../core/Json';
import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixJoinRoomThirdPartySignedDTO {
  readonly sender: MatrixUserId;
  readonly mxid: MatrixUserId;
  readonly token: string;

  // TODO: define MatrixSignaturesDTO
  readonly signatures: JsonObject;
}

export function isMatrixJoinRoomThirdPartySignedDTO(
  value: unknown,
): value is MatrixJoinRoomThirdPartySignedDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'sender',
      'mxid',
      'token',
      'signatures',
    ]) &&
    isMatrixUserId(objectKey(value, 'sender')) &&
    isMatrixUserId(objectKey(value, 'mxid')) &&
    isString(objectKey(value, 'token')) &&
    isJsonObject(objectKey(value, 'signatures'))
  );
}

export function stringifyMatrixJoinRoomThirdPartySignedDTO(
  value: MatrixJoinRoomThirdPartySignedDTO,
): string {
  return `MatrixJoinRoomThirdPartySignedDTO(${value})`;
}

export function parseMatrixJoinRoomThirdPartySignedDTO(
  value: unknown,
): MatrixJoinRoomThirdPartySignedDTO | undefined {
  if (isMatrixJoinRoomThirdPartySignedDTO(value)) return value;
  return undefined;
}
