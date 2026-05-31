import assert from 'node:assert/strict';
import type {IncomingMessage, ServerResponse} from 'http';
import {handleHttpPreRequest} from './httpPreHandlers';

function mockReq(opts: {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
}): IncomingMessage {
  return {
    method: opts.method ?? 'GET',
    url: opts.url ?? '/',
    headers: opts.headers ?? {},
  } as IncomingMessage;
}

function mockRes(): ServerResponse & {
  statusCode: number;
  headers: Record<string, string | string[] | undefined>;
  body: string;
} {
  const headers: Record<string, string | string[] | undefined> = {};
  return {
    statusCode: 200,
    headers,
    body: '',
    setHeader(name: string, value: string | string[]) {
      headers[name.toLowerCase()] = value;
    },
    getHeader(name: string) {
      const v = headers[name.toLowerCase()];
      return Array.isArray(v) ? v[0] : v;
    },
    end(chunk?: string) {
      if (chunk !== undefined) {
        this.body = chunk;
      }
    },
  } as ServerResponse & {
    statusCode: number;
    headers: Record<string, string | string[] | undefined>;
    body: string;
  };
}

const bgsOrigin = 'https://bgs-mp.onrender.com';

async function testGetHealthCorsWithOrigin(): Promise<void> {
  const req = mockReq({
    method: 'GET',
    url: '/health',
    headers: {origin: bgsOrigin},
  });
  const res = mockRes();
  const result = await handleHttpPreRequest(req, res);
  assert.equal(result, 'handled');
  assert.equal(res.statusCode, 200);
  assert.equal(res.getHeader('access-control-allow-origin'), bgsOrigin);
  assert.ok(res.body.includes('"status"'));
}

async function testOptionsHealthCorsPreflight(): Promise<void> {
  const req = mockReq({
    method: 'OPTIONS',
    url: '/health',
    headers: {
      origin: bgsOrigin,
      'access-control-request-method': 'GET',
    },
  });
  const res = mockRes();
  const result = await handleHttpPreRequest(req, res);
  assert.equal(result, 'handled');
  assert.equal(res.statusCode, 204);
  assert.equal(res.getHeader('access-control-allow-origin'), bgsOrigin);
  assert.equal(res.getHeader('access-control-allow-methods'), 'GET, POST, PUT, OPTIONS');
}

await testGetHealthCorsWithOrigin();
await testOptionsHealthCorsPreflight();
console.log('httpPreHandlers.test.ts: ok');
