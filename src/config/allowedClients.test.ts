import assert from 'node:assert/strict';
import {
  normalizeOrigin,
  parseAllowedClientsJson,
  clientAllowsOrigin,
  findAllowedClientById,
} from './allowedClients';

function testNormalizeOrigin(): void {
  assert.equal(
    normalizeOrigin('https://app.example.com/'),
    'https://app.example.com',
  );
  assert.equal(
    normalizeOrigin('http://localhost:5173'),
    'http://localhost:5173',
  );
  assert.equal(normalizeOrigin(undefined), undefined);
}

function testParseAllowedClientsJson(): void {
  const clients = parseAllowedClientsJson(
    JSON.stringify([
      {
        id: 'web-demo',
        origins: ['http://localhost:5173/'],
        allowWithoutOrigin: false,
      },
      {
        id: 'ops-cli',
        allowWithoutOrigin: true,
      },
    ]),
  );
  assert.equal(clients.length, 2);
  assert.equal(clients[0].origins[0], 'http://localhost:5173');
  assert.throws(() => parseAllowedClientsJson('not-json'), /valid JSON/);
  assert.throws(() => parseAllowedClientsJson('{"id":"dup"}'), /array/);
}

function testClientLookup(): void {
  const clients = parseAllowedClientsJson(
    '[{"id":"a","origins":["https://x.com"]}]',
  );
  const client = findAllowedClientById(clients, 'a');
  assert.ok(client);
  assert.equal(clientAllowsOrigin(client!, 'https://x.com'), true);
  assert.equal(clientAllowsOrigin(client!, undefined), false);
}

testNormalizeOrigin();
testParseAllowedClientsJson();
testClientLookup();
console.log('allowedClients.test.ts: ok');
