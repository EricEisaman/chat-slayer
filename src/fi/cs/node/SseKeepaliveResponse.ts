import type {ServerResponse} from 'http';

const sseKeepaliveKey = Symbol('chatSlayerSseKeepalive');

type SseKeepaliveResponse = ServerResponse & {
  [sseKeepaliveKey]?: boolean;
};

/** Prevents ServerServiceImpl from auto-ending long-lived SSE responses. */
export function markSseKeepalive(res: ServerResponse): void {
  (res as SseKeepaliveResponse)[sseKeepaliveKey] = true;
}

export function isSseKeepalive(res: ServerResponse): boolean {
  return (res as SseKeepaliveResponse)[sseKeepaliveKey] === true;
}

export function clearSseKeepalive(res: ServerResponse): void {
  delete (res as SseKeepaliveResponse)[sseKeepaliveKey];
}
