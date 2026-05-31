import assert from 'node:assert/strict';
import {buildWellKnownChatSlayerDocument} from './wellKnownChatSlayer';
import {
  resetCachedLiveTlsFingerprint,
  setCachedLiveTlsFingerprint,
} from './tlsFingerprintProbe';

function testWellKnownDocument(): void {
  resetCachedLiveTlsFingerprint();
  const pin = 'c'.repeat(64);
  setCachedLiveTlsFingerprint(pin);
  const doc = buildWellKnownChatSlayerDocument({
    primaryPin: pin,
    backupPin: undefined,
    pinEnforced: true,
    autoDisableOnPinFailure: true,
  });
  assert.equal(doc.tlsFingerprintSha256, pin);
  assert.equal(doc.pinEnforced, true);
  resetCachedLiveTlsFingerprint();
}

testWellKnownDocument();
console.log('wellKnownChatSlayer.test.ts: ok');
