export interface RoomListEntry {
  readonly name: string;
  readonly room_id: string;
  readonly preconfigured?: boolean;
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
      const preconfiguredClass = room.preconfigured
        ? ' room-item--preconfigured-private'
        : '';
      return `<li class="room-item${preconfiguredClass}"><button type="button" class="room-pick" data-on:click="@post('/demo/actions/join-room', ${joinRoomHeaders(room.room_id)})"><strong>${escapeHtml(room.name)}</strong><span class="room-id">${escapeHtml(room.room_id)}</span></button></li>`;
    })
    .join('');
  return `<ul id="room-list" class="room-list">${items}</ul>`;
}

/** Option children only — morph into `#room-picker` with mode `inner`. */
export function renderRoomPickerOptionsHtml(
  rooms: readonly RoomListEntry[],
  selectedRoomId = '',
): string {
  const options = rooms
    .map((room) => {
      const selected =
        room.room_id === selectedRoomId ? ' selected' : '';
      const preconfiguredClass = room.preconfigured
        ? ' class="preconfigured-private"'
        : '';
      return `<option value="${escapeHtml(room.room_id)}"${selected}${preconfiguredClass}>${escapeHtml(room.name)}</option>`;
    })
    .join('');
  return `<option value="">Pick a room…</option>${options}`;
}

export const ROOM_PICKER_SELECTOR = '#room-picker';

export function renderInboxHtml(lines: readonly MessageLine[]): string {
  if (lines.length === 0) {
    return '<div id="inbox" class="inbox"><p class="empty">No messages yet — join a room and send one.</p></div>';
  }
  const items = lines
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
