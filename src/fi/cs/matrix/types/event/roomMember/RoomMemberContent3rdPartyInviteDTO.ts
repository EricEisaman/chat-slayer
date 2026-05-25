import {
  isRoomMemberStateSignedDTO,
  RoomMemberStateSignedDTO,
} from './RoomMemberStateSignedDTO';
import {ReadonlyJsonObject} from '../../../../core/Json';
import {isUndefined} from '../../../../core/types/undefined';
import {isString} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../core/types/OtherKeys';

export interface RoomMemberContent3rdPartyInviteDTO extends ReadonlyJsonObject {
  readonly display_name: string;
  readonly signed: RoomMemberStateSignedDTO;
}

export function createRoomMemberContent3rdPartyInviteDTO(
  display_name: string,
  signed: RoomMemberStateSignedDTO,
): RoomMemberContent3rdPartyInviteDTO {
  return {
    display_name,
    signed,
  };
}

export function isRoomMemberContent3rdPartyInviteDTO(
  value: unknown,
): value is RoomMemberContent3rdPartyInviteDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['display_name', 'signed']) &&
    isString(objectKey(value, 'display_name')) &&
    isRoomMemberStateSignedDTO(objectKey(value, 'signed'))
  );
}

export function isRoomMemberContent3rdPartyInviteDTOOrUndefined(
  value: unknown,
): value is RoomMemberContent3rdPartyInviteDTO | undefined {
  return isUndefined(value) || isRoomMemberContent3rdPartyInviteDTO(value);
}

export function stringifyRoomMemberContent3rdPartyInviteDTO(
  value: RoomMemberContent3rdPartyInviteDTO,
): string {
  return `RoomMemberStateInviteDTO(${value})`;
}

export function parseRoomMemberContent3rdPartyInviteDTO(
  value: unknown,
): RoomMemberContent3rdPartyInviteDTO | undefined {
  if (isRoomMemberContent3rdPartyInviteDTO(value)) return value;
  return undefined;
}
