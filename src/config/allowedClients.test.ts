import assert from 'node:assert/strict';
import {
  normalizeOrigin,
  parseAllowedClientsJson,
  clientAllowsOrigin,
  findAllowedClientById,
  formatAllowedClientsLogLines,
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

function testFormatAllowedClientsLogLines(): void {
  const lines = formatAllowedClientsLogLines(
    {
      enforced: true,
      clients: [
        {
          id: 'web-demo',
          label: 'Web demo',
          origins: ['https://chat-slayer.onrender.com'],
          allowWithoutOrigin: false,
        },
      ],
    },
    'https://chat-slayer.onrender.com/',
  );
  assert.ok(lines.some((l) => l.includes('enforcement: on')));
  assert.ok(
    lines.some((l) =>
      l.includes('origins=[https://chat-slayer.onrender.com]'),
    ),
  );
  assert.ok(lines.some((l) => l.includes('BACKEND_PUBLIC_URL origin')));
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
testFormatAllowedClientsLogLines();
testClientLookup();
console.log('allowedClients.test.ts: ok');
