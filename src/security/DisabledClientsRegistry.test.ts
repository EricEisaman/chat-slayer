import assert from 'node:assert/strict';
import {
  disableClient,
  isClientDisabled,
  resetDisabledClientsRegistry,
} from './DisabledClientsRegistry';

function testDisableClient(): void {
  resetDisabledClientsRegistry();
  assert.equal(isClientDisabled('web-demo'), false);
  disableClient({
    clientId: 'web-demo',
    reason: 'test pin mismatch',
    observedFingerprint: 'a'.repeat(64),
    expectedFingerprint: 'b'.repeat(64),
  });
  assert.equal(isClientDisabled('web-demo'), true);
  assert.equal(isClientDisabled('ops-cli'), false);
  resetDisabledClientsRegistry();
}

testDisableClient();
console.log('DisabledClientsRegistry.test.ts: ok');
