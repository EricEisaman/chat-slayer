import {ReadonlyJsonObject} from '../../core/Json';
import {MatrixRoomId} from '../types/core/MatrixRoomId';
import {MatrixUserId} from '../types/core/MatrixUserId';
import {MatrixType} from '../types/core/MatrixType';
import {
  MatrixSyncResponseRoomEventDTO,
} from '../types/response/sync/types/MatrixSyncResponseRoomEventDTO';
import {
  MatrixSyncResponseTimelineDTO,
} from '../types/response/sync/types/MatrixSyncResponseTimelineDTO';
import {
  MatrixSyncResponseJoinedRoomDTO,
} from '../types/response/sync/types/MatrixSyncResponseJoinedRoomDTO';
import {
  MatrixSyncResponseRoomsDTO,
} from '../types/response/sync/types/MatrixSyncResponseRoomsDTO';
import {MatrixTextMessageDTO} from '../types/message/textMessage/MatrixTextMessageDTO';

export interface StoredTimelineEvent {
  readonly streamPos: number;
  readonly eventId: string;
  readonly roomId: MatrixRoomId;
  readonly sender: MatrixUserId;
  readonly type: string;
  readonly content: ReadonlyJsonObject;
  readonly originServerTs: number;
}

/** Fixes legacy double-wrapped ids from createRoom (`!!r1:host:host`). */
export function normalizeMatrixRoomIdParam(
  roomId: string,
  hostname: string,
): string {
  const legacy = new RegExp(`^!!([^:]+):${hostname}:${hostname}$`);
  const match = legacy.exec(roomId);
  if (match) {
    return `!${match[1]}:${hostname}`;
  }
  return roomId;
}

export function toSyncRoomEvent(
  event: StoredTimelineEvent,
): MatrixSyncResponseRoomEventDTO {
  return {
    type: event.type,
    event_id: event.eventId,
    sender: event.sender,
    origin_server_ts: event.originServerTs,
    content: event.content as MatrixSyncResponseRoomEventDTO['content'],
  };
}

export function buildTimelineDto(
  events: readonly StoredTimelineEvent[],
): MatrixSyncResponseTimelineDTO {
  return {
    events: events.map(toSyncRoomEvent),
    limited: false,
  };
}

export function buildJoinedRoomDto(
  events: readonly StoredTimelineEvent[],
): MatrixSyncResponseJoinedRoomDTO {
  if (events.length === 0) {
    return {};
  }
  return {
    timeline: buildTimelineDto(events),
  };
}

export function buildSyncRoomsDto(
  roomEvents: ReadonlyMap<MatrixRoomId, readonly StoredTimelineEvent[]>,
): MatrixSyncResponseRoomsDTO | undefined {
  if (roomEvents.size === 0) {
    return undefined;
  }
  const join: {[K in MatrixRoomId]: MatrixSyncResponseJoinedRoomDTO} = {};
  for (const [roomId, events] of roomEvents) {
    join[roomId] = buildJoinedRoomDto(events);
  }
  return {join};
}

export function messageContentFromDto(
  body: MatrixTextMessageDTO,
): ReadonlyJsonObject {
  return {
    msgtype: body.msgtype,
    body: body.body,
  };
}

export function buildRoomMessagesResponse(
  events: readonly StoredTimelineEvent[],
): {
  readonly chunk: ReturnType<typeof toSyncRoomEvent>[];
  readonly start: string;
  readonly end: string;
} {
  const chunk = events.map(toSyncRoomEvent);
  const start = chunk.length > 0 ? chunk[0].event_id : '';
  const end = chunk.length > 0 ? chunk[chunk.length - 1].event_id : '';
  return {chunk, start, end};
}

export function isRoomMessageEventType(eventName: string): boolean {
  return (
    eventName === MatrixType.M_ROOM_MESSAGE ||
    eventName === 'm.room.encrypted'
  );
}
