import type {MessageLine, RoomListEntry} from './demoHtml';
import {
  chatSlayerSignalPatch,
  stringifyChatSlayerSignalPatch,
} from './chatSlayerSignalPatch';

/** Signal patch for the long-lived /demo/stream (no HTML morph). */
export function buildRoomDirectorySignalPatch(
  rooms: readonly RoomListEntry[],
): string {
  return JSON.stringify({
    ...chatSlayerSignalPatch('room-directory', {rooms}),
    rooms,
    streamReady: true,
  });
}

export function buildRoomMessageSignalPatch(line: MessageLine): string {
  return stringifyChatSlayerSignalPatch('room-message', line);
}

export function buildInboxSignalPatch(lines: readonly MessageLine[]): string {
  return JSON.stringify({inbox: lines});
}

export function buildLiveSnapshotSignalPatch(
  rooms: readonly RoomListEntry[],
  inbox: readonly MessageLine[],
): string {
  return JSON.stringify({
    ...chatSlayerSignalPatch('room-directory', {rooms}),
    rooms,
    inbox,
    streamReady: true,
  });
}

/** Patches room list + streamReady on short action responses (fallback if SSE GET pending). */
export function directoryActionSignalPatch(
  rooms: readonly RoomListEntry[],
): Record<string, unknown> {
  return {
    ...JSON.parse(buildRoomDirectorySignalPatch(rooms)),
    streamReady: true,
  };
}
