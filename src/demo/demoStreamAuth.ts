import type {IncomingMessage} from 'http';
import {AuthorizationUtils} from '../fi/cs/core/AuthorizationUtils';
import {readSignalString} from './demoAuth';

function getHeader(req: IncomingMessage, name: string): string | undefined {
  const raw = req.headers[name.toLowerCase()];
  if (raw === undefined) {
    return undefined;
  }
  return Array.isArray(raw) ? raw[0] : raw;
}

/** Prefer Bearer header so GET /demo/stream does not put tokens in the query string. */
export function readStreamAccessToken(
  req: IncomingMessage,
  signals: Record<string, unknown>,
): string | undefined {
  const authHeader = getHeader(req, 'authorization');
  if (authHeader) {
    const fromHeader = AuthorizationUtils.parseBearerToken(authHeader);
    if (fromHeader) {
      return fromHeader;
    }
  }
  const fromSignals = readSignalString(signals, 'accessToken');
  return fromSignals || undefined;
}
