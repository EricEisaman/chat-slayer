import assert from 'node:assert/strict';
import type {IncomingMessage} from 'http';
import {resetAllowedClientsConfigCache} from '../config/allowedClients';
import {evaluateClientAccess} from './ClientAccessGate';
import type {AllowedClientsConfig} from '../config/allowedClients';

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

const sampleConfig: AllowedClientsConfig = {
  enforced: true,
  clients: [
    {
      id: 'web-demo',
      origins: ['http://localhost:8008'],
      allowWithoutOrigin: false,
    },
    {
      id: 'ops-cli',
      origins: [],
      allowWithoutOrigin: true,
    },
  ],
};

function testHealthExempt(): void {
  const d = evaluateClientAccess(
    mockReq({method: 'GET', url: '/health'}),
    sampleConfig,
  );
  assert.equal(d.allowed, true);
}

function testDemoStaticExempt(): void {
  const d = evaluateClientAccess(
    mockReq({method: 'GET', url: '/'}),
    sampleConfig,
  );
  assert.equal(d.allowed, true);
}

function testDemoConfigJsonPublic(): void {
  const d = evaluateClientAccess(
    mockReq({method: 'GET', url: '/demo-config.json'}),
    sampleConfig,
  );
  assert.equal(d.allowed, true);
}

function testEnforcementOff(): void {
  const d = evaluateClientAccess(mockReq({url: '/_matrix/client/r0/login'}), {
    enforced: false,
    clients: [],
  });
  assert.equal(d.allowed, true);
}

function testBrowserClient(): void {
  const d = evaluateClientAccess(
    mockReq({
      method: 'POST',
      url: '/_matrix/client/r0/login',
      headers: {
        origin: 'http://localhost:8008',
        'x-chat-slayer-client-id': 'web-demo',
      },
    }),
    sampleConfig,
  );
  assert.equal(d.allowed, true);
  assert.equal(d.corsOrigin, 'http://localhost:8008');
}

function testDenyWrongOrigin(): void {
  const d = evaluateClientAccess(
    mockReq({
      url: '/_matrix/client/r0/sync',
      headers: {
        origin: 'https://evil.example',
        'x-chat-slayer-client-id': 'web-demo',
      },
    }),
    sampleConfig,
  );
  assert.equal(d.allowed, false);
}

function testCliWithoutOrigin(): void {
  const d = evaluateClientAccess(
    mockReq({
      url: '/_matrix/client/r0/login',
      headers: {'x-chat-slayer-client-id': 'ops-cli'},
    }),
    sampleConfig,
  );
  assert.equal(d.allowed, true);
}

function testMissingClientId(): void {
  const d = evaluateClientAccess(
    mockReq({url: '/_matrix/client/r0/login'}),
    sampleConfig,
  );
  assert.equal(d.allowed, false);
}

resetAllowedClientsConfigCache();
testHealthExempt();
testDemoStaticExempt();
testDemoConfigJsonPublic();
testEnforcementOff();
testBrowserClient();
testDenyWrongOrigin();
testCliWithoutOrigin();
testMissingClientId();
console.log('ClientAccessGate.test.ts: ok');
