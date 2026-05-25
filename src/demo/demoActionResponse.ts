import type {IncomingMessage, ServerResponse} from 'http';
import {ServerSentEventGenerator} from '@starfederation/datastar-sdk/node';
import {chatSlayerSignalPatch} from './chatSlayerSignalPatch';
import type {MessageLine, RoomListEntry} from './demoHtml';
import {patchDemoInboxUi, patchDemoRoomUi} from './demoRoomUiPatch';

/**
 * Short-lived SSE for demo mutations. Patches signals only — never opens a new
 * `/demo/stream`; live updates stay on the existing keepalive connection.
 */
export function respondDemoActionSignals(
  req: IncomingMessage,
  res: ServerResponse,
  signalPatch: Record<string, unknown>,
  rooms?: readonly RoomListEntry[],
  inbox?: readonly MessageLine[],
): void {
  ServerSentEventGenerator.stream(req, res, (stream) => {
    stream.patchSignals(JSON.stringify(signalPatch));
    const patch = (
      html: string,
      options?: Parameters<typeof stream.patchElements>[1],
    ) => stream.patchElements(html, options);
    if (rooms) {
      const selected =
        typeof signalPatch.roomId === 'string' ? signalPatch.roomId : '';
      patchDemoRoomUi(patch, rooms, selected);
    }
    if (inbox) {
      const activeRoomId =
        typeof signalPatch.roomId === 'string' ? signalPatch.roomId : '';
      patchDemoInboxUi(patch, inbox, activeRoomId);
    }
  });
}

export function respondDemoActionError(
  req: IncomingMessage,
  res: ServerResponse,
  message: string,
): void {
  respondDemoActionSignals(req, res, {
    status: message,
    ...chatSlayerSignalPatch('error', {message}),
  });
}
