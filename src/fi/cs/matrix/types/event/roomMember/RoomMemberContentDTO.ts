import {isNull} from '../../../../core/types/Null';
import {ReadonlyJsonObject} from '../../../../core/Json';
import {
  isRoomMembershipState,
  RoomMembershipState,
} from './RoomMembershipState';
import {
  isRoomMemberContent3rdPartyInviteDTOOrUndefined,
  RoomMemberContent3rdPartyInviteDTO,
} from './RoomMemberContent3rdPartyInviteDTO';
import {isBooleanOrUndefined} from '../../../../core/types/Boolean';
import {isStringOrUndefined} from '../../../../core/types/String';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeys} from '../../../../core/types/OtherKeys';

export interface RoomMemberContentDTO extends ReadonlyJsonObject {
  readonly membership: RoomMembershipState;
  readonly avatar_url?: string;
  readonly displayname?: string | null;
  readonly is_direct?: boolean;
  readonly join_authorised_via_users_server?: string;
  readonly reason?: string;
  readonly third_party_invite?: RoomMemberContent3rdPartyInviteDTO;
}

export function createRoomMemberContentDTO(
  membership: RoomMembershipState,
  reason?: string | undefined,
  avatar_url?: string | undefined,
  displayname?: string | null | undefined,
  is_direct?: boolean | undefined,
  join_authorised_via_users_server?: string | undefined,
  third_party_invite?: RoomMemberContent3rdPartyInviteDTO,
): RoomMemberContentDTO {
  return {
    avatar_url,
    displayname,
    is_direct,
    join_authorised_via_users_server,
    membership,
    reason,
    third_party_invite,
  };
}

export function isRoomMemberContentDTO(
  value: unknown,
): value is RoomMemberContentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'membership',
      'avatar_url',
      'displayname',
      'is_direct',
      'join_authorised_via_users_server',
      'reason',
      'third_party_invite',
    ]) &&
    isRoomMembershipState(objectKey(value, 'membership')) &&
    isStringOrUndefined(objectKey(value, 'avatar_url')) &&
    (isStringOrUndefined(objectKey(value, 'displayname')) ||
      isNull(objectKey(value, 'displayname'))) &&
    isBooleanOrUndefined(objectKey(value, 'is_direct')) &&
    isStringOrUndefined(objectKey(value, 'join_authorised_via_users_server')) &&
    isStringOrUndefined(objectKey(value, 'reason')) &&
    isRoomMemberContent3rdPartyInviteDTOOrUndefined(
      objectKey(value, 'third_party_invite'),
    )
  );
}

export function stringifyRoomMemberContentDTO(
  value: RoomMemberContentDTO,
): string {
  return `RoomMemberContentDTO(${value})`;
}

export function parseRoomMemberContentDTO(
  value: unknown,
): RoomMemberContentDTO | undefined {
  if (isRoomMemberContentDTO(value)) return value;
  return undefined;
}
