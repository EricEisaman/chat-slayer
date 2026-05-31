export interface RoomListEntry {
  readonly name: string;
  readonly room_id: string;
  /** Discovered private room (BACKEND_PRIVATE_ROOMS). */
  readonly preconfigured?: boolean;
  /** Boot-seeded public room (BACKEND_INITIAL_ROOMS). */
  readonly preconfiguredPublic?: boolean;
}

export type DemoRoomKind = 'private' | 'public' | 'other';

export function demoRoomKind(room: RoomListEntry): DemoRoomKind {
  if (room.preconfigured) {
    return 'private';
  }
  if (room.preconfiguredPublic) {
    return 'public';
  }
  return 'other';
}

export interface MessageLine {
  readonly room_id: string;
  readonly sender: string;
  readonly body: string;
  readonly event_id: string;
  /** JSON timeline event for client Megolm decrypt. */
  readonly event_payload?: string;
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function joinRoomHeaders(roomId: string): string {
  return `{ headers: { 'X-Chat-Slayer-Client-Id': 'web-demo', 'X-Demo-Room-Id': '${escapeHtml(roomId)}' } }`;
}

export function renderRoomListHtml(rooms: readonly RoomListEntry[]): string {
  if (rooms.length === 0) {
    return '<ul id="room-list" class="room-list"><li class="empty">No rooms yet — create or register some above.</li></ul>';
  }
  const items = rooms
    .map((room) => {
      const kind = demoRoomKind(room);
      const kindClass =
        kind === 'private'
          ? ' room-item--preconfigured-private'
          : kind === 'public'
            ? ' room-item--preconfigured-public'
            : '';
      return `<li class="room-item${kindClass}"><button type="button" class="room-pick" data-on:click="@post('/demo/actions/join-room', ${joinRoomHeaders(room.room_id)})"><strong>${escapeHtml(room.name)}</strong><span class="room-id">${escapeHtml(room.room_id)}</span></button></li>`;
    })
    .join('');
  return `<ul id="room-list" class="room-list">${items}</ul>`;
}

function renderRoomPickerOption(
  room: RoomListEntry,
  selectedRoomId: string,
): string {
  const selected = room.room_id === selectedRoomId ? ' selected' : '';
  const kind = demoRoomKind(room);
  const kindClass =
    kind === 'private'
      ? ' preconfigured-private'
      : kind === 'public'
        ? ' preconfigured-public'
        : '';
  return `<option value="${escapeHtml(room.room_id)}" data-room-kind="${kind}" class="room-option${kindClass}"${selected}>${escapeHtml(room.name)}</option>`;
}

function renderRoomPickerGroup(
  label: string,
  groupRooms: readonly RoomListEntry[],
  selectedRoomId: string,
): string {
  if (groupRooms.length === 0) {
    return '';
  }
  const options = groupRooms
    .map((room) => renderRoomPickerOption(room, selectedRoomId))
    .join('');
  return `<optgroup label="${escapeHtml(label)}">${options}</optgroup>`;
}

/** Option children only — morph into `#room-picker` with mode `inner`. */
export function renderRoomPickerOptionsHtml(
  rooms: readonly RoomListEntry[],
  selectedRoomId = '',
): string {
  const privateRooms = rooms.filter((r) => demoRoomKind(r) === 'private');
  const publicRooms = rooms.filter((r) => demoRoomKind(r) === 'public');
  const otherRooms = rooms.filter((r) => demoRoomKind(r) === 'other');
  const groups = [
    renderRoomPickerGroup('Private rooms', privateRooms, selectedRoomId),
    renderRoomPickerGroup('Public rooms', publicRooms, selectedRoomId),
    renderRoomPickerGroup('Your rooms', otherRooms, selectedRoomId),
  ].join('');
  return `<option value="" data-room-kind="none">Pick a room…</option>${groups}`;
}

export const ROOM_PICKER_SELECTOR = '#room-picker';

/** Messages visible for the active room picker selection (optional tail cap). */
export function filterInboxForRoom(
  lines: readonly MessageLine[],
  activeRoomId: string,
  historyLimit?: number,
): readonly MessageLine[] {
  const roomId = activeRoomId.trim();
  if (!roomId) {
    return [];
  }
  const filtered = lines.filter((line) => line.room_id === roomId);
  if (
    historyLimit !== undefined &&
    historyLimit > 0 &&
    filtered.length > historyLimit
  ) {
    return filtered.slice(-historyLimit);
  }
  return filtered;
}

export function renderInboxHtml(
  lines: readonly MessageLine[],
  activeRoomId = '',
  historyLimit?: number,
): string {
  const visible = filterInboxForRoom(lines, activeRoomId, historyLimit);
  if (visible.length === 0) {
    return '<div id="inbox" class="inbox"><p class="empty">No messages yet — join a room and send one.</p></div>';
  }
  const items = visible
    .map((line) => {
      const payloadAttr = line.event_payload
        ? ` data-event-payload="${escapeHtml(line.event_payload)}"`
        : '';
      const body = line.body || (line.event_payload ? '…' : '');
      return `<article class="msg" data-room-id="${escapeHtml(line.room_id)}"${payloadAttr}><span class="sender">${escapeHtml(line.sender)}</span><span class="msg-body">${escapeHtml(body)}</span></article>`;
    })
    .join('');
  return `<div id="inbox" class="inbox">${items}</div>`;
}

export function appendMessageHtml(line: MessageLine): string {
  return `<p class="msg" id="msg-${escapeHtml(line.event_id)}"><span class="sender">${escapeHtml(line.sender)}</span>: ${escapeHtml(line.body)}</p>`;
}
