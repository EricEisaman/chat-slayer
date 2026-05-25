import type {IncomingMessage, ServerResponse} from 'http';
import {tryServeDemoStatic, tryServeHealth} from './serveDemoStatic';
import {handleClientAccessGate} from '../security/ClientAccessGate';
import {tryHandleDemoRequest} from './DemoHttpHandler';

export type HttpPreHandlerResult = 'continue' | 'handled';

/**
 * Health, demo API + page, demo static assets, then client access gate (Matrix API).
 */
export async function handleHttpPreRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<HttpPreHandlerResult> {
  if (tryServeHealth(req, res)) {
    return 'handled';
  }
  if (await tryHandleDemoRequest(req, res)) {
    return 'handled';
  }
  if (tryServeDemoStatic(req, res)) {
    return 'handled';
  }
  return handleClientAccessGate(req, res);
}
