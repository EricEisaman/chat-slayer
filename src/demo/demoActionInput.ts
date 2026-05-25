import type {IncomingMessage} from 'http';
import {readSignalRoomNames, readSignalString} from './demoAuth';

function getHeader(req: IncomingMessage, name: string): string | undefined {
  const raw = req.headers[name.toLowerCase()];
  if (raw === undefined) {
    return undefined;
  }
  return Array.isArray(raw) ? raw[0] : raw;
}

/** Room name from demo UI (header avoids Datastar signal sync races on click). */
export function readCreateRoomName(
  req: IncomingMessage,
  signals: Record<string, unknown>,
): string {
  const fromHeader = getHeader(req, 'x-demo-room-name')?.trim();
  if (fromHeader) {
    return fromHeader;
  }
  return readSignalString(signals, 'roomName').trim();
}

export function readRegisterRoomNames(
  req: IncomingMessage,
  signals: Record<string, unknown>,
): readonly string[] {
  const fromHeader = getHeader(req, 'x-demo-room-names')?.trim();
  if (fromHeader) {
    return fromHeader
      .split(',')
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  }
  return readSignalRoomNames(signals, 'roomNames');
}

export function readJoinRoomId(
  req: IncomingMessage,
  signals: Record<string, unknown>,
): string {
  const fromHeader = getHeader(req, 'x-demo-room-id')?.trim();
  if (fromHeader) {
    return fromHeader;
  }
  return readSignalString(signals, 'roomId').trim();
}

export function readSendMessage(
  req: IncomingMessage,
  signals: Record<string, unknown>,
): string {
  const fromHeader = getHeader(req, 'x-demo-message')?.trim();
  if (fromHeader) {
    return fromHeader;
  }
  return readSignalString(signals, 'message').trim();
}

/** Megolm-encrypted room event JSON from the browser crypto module. */
export function readEncryptedRoomEvent(
  req: IncomingMessage,
): string | undefined {
  return getHeader(req, 'x-demo-encrypted-event')?.trim();
}
