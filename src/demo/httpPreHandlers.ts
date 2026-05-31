import type {IncomingMessage, ServerResponse} from 'http';
import {tryServeDemoStatic, tryServeHealth, tryServeWellKnown} from './serveDemoStatic';
import {handleClientAccessGate} from '../security/ClientAccessGate';
import {applySecurityResponseHeaders} from '../security/securityResponseHeaders';
import {tryHandleDemoRequest} from './DemoHttpHandler';

export type HttpPreHandlerResult = 'continue' | 'handled';

/**
 * Health, demo API + page, demo static assets, then client access gate (Matrix API).
 */
export async function handleHttpPreRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<HttpPreHandlerResult> {
  applySecurityResponseHeaders(res);
  if (tryServeHealth(req, res)) {
    return 'handled';
  }
  if (await tryHandleDemoRequest(req, res)) {
    return 'handled';
  }
  if (tryServeWellKnown(req, res)) {
    return 'handled';
  }
  if (tryServeDemoStatic(req, res)) {
    return 'handled';
  }
  return handleClientAccessGate(req, res);
}
