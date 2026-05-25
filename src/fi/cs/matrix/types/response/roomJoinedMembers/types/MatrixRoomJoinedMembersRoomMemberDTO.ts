import {isNull} from '../../../../../core/types/Null';
import {isString} from '../../../../../core/types/String';
import {
  isRegularObject,
  objectKey,
} from '../../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../../core/types/OtherKeys';

export interface MatrixRoomJoinedMembersRoomMemberDTO {
  readonly display_name: string;
  readonly avatar_url: string | null;
}

export function createMatrixRoomJoinedMembersRoomMemberDTO(
  display_name: string,
  avatar_url: string | null,
): MatrixRoomJoinedMembersRoomMemberDTO {
  return {
    display_name,
    avatar_url,
  };
}

export function isMatrixRoomJoinedMembersRoomMemberDTO(
  value: unknown,
): value is MatrixRoomJoinedMembersRoomMemberDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['display_name', 'avatar_url']) &&
    isString(objectKey(value, 'display_name')) &&
    (isString(objectKey(value, 'avatar_url')) ||
      isNull(objectKey(value, 'avatar_url')))
  );
}

export function stringifyMatrixRoomJoinedMembersRoomMemberDTO(
  value: MatrixRoomJoinedMembersRoomMemberDTO,
): string {
  return `MatrixRoomJoinedMembersRoomMemberDTO(${value})`;
}

export function parseMatrixRoomJoinedMembersRoomMemberDTO(
  value: unknown,
): MatrixRoomJoinedMembersRoomMemberDTO | undefined {
  if (isMatrixRoomJoinedMembersRoomMemberDTO(value)) return value;
  return undefined;
}
