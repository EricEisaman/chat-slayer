import {MatrixUserId, isMatrixUserId} from '../../core/MatrixUserId';
import {
  MatrixRoomJoinedMembersRoomMemberDTO,
  isMatrixRoomJoinedMembersRoomMemberDTO,
} from './types/MatrixRoomJoinedMembersRoomMemberDTO';
import {
  isRegularObject,
  isRegularObjectOf,
  objectKey,
} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';

export interface MatrixRoomJoinedMembersDTO {
  readonly joined: {[P in MatrixUserId]: MatrixRoomJoinedMembersRoomMemberDTO};
}

export function createMatrixRoomJoinedMembersDTO(joined: {
  [P in MatrixUserId]: MatrixRoomJoinedMembersRoomMemberDTO;
}): MatrixRoomJoinedMembersDTO {
  return {
    joined,
  };
}

export function isMatrixRoomJoinedMembersDTO(
  value: unknown,
): value is MatrixRoomJoinedMembersDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['joined']) &&
    isRegularObjectOf<MatrixUserId, MatrixRoomJoinedMembersRoomMemberDTO>(
      objectKey(value, 'joined'),
      isMatrixUserId,
      isMatrixRoomJoinedMembersRoomMemberDTO,
    )
  );
}

export function stringifyMatrixRoomJoinedMembersDTO(
  value: MatrixRoomJoinedMembersDTO,
): string {
  return `MatrixRoomJoinedMembersDTO(${value})`;
}

export function parseMatrixRoomJoinedMembersDTO(
  value: unknown,
): MatrixRoomJoinedMembersDTO | undefined {
  if (isMatrixRoomJoinedMembersDTO(value)) return value;
  return undefined;
}
