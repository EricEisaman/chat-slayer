import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {
  configuredPinMatches,
  loadServerFingerprintConfig,
  normalizeSha256Hex,
  resetServerFingerprintConfigCache,
} from '../config/serverFingerprint';
import {computeSpkiSha256FromDer} from './tlsFingerprintProbe';
import {fingerprintMatchesExpected} from './validateTlsPin';

function testNormalizeSha256Hex(): void {
  const hex = 'a'.repeat(64);
  assert.equal(normalizeSha256Hex(hex), hex);
  assert.equal(normalizeSha256Hex(`SHA256 ${hex}`), hex);
  assert.throws(() => normalizeSha256Hex('too-short'), /64 hex/);
}

function testConfiguredPinMatches(): void {
  const pin = 'b'.repeat(64);
  const config = {
    primaryPin: pin,
    backupPin: undefined,
    pinEnforced: true,
    autoDisableOnPinFailure: true,
  };
  assert.equal(configuredPinMatches(config, pin), true);
  assert.equal(configuredPinMatches(config, 'c'.repeat(64)), false);
}

function testFingerprintMatchesExpected(): void {
  const pin = 'd'.repeat(64);
  assert.equal(fingerprintMatchesExpected(pin, pin, undefined), true);
  assert.equal(
    fingerprintMatchesExpected(pin, 'e'.repeat(64), pin),
    true,
  );
  assert.equal(fingerprintMatchesExpected(pin, 'f'.repeat(64), undefined), false);
}

function testComputeSpkiSha256FromDer(): void {
  const der = Buffer.from('spki-test-material');
  assert.equal(
    computeSpkiSha256FromDer(der),
    createHash('sha256').update(der).digest('hex'),
  );
}

function testLoadServerFingerprintConfigLocalDev(): void {
  resetServerFingerprintConfigCache();
  const prev = process.env.BACKEND_TLS_PIN_ENFORCED;
  process.env.BACKEND_TLS_PIN_ENFORCED = 'false';
  const config = loadServerFingerprintConfig('http://localhost:8008');
  assert.equal(config.pinEnforced, false);
  if (prev === undefined) {
    delete process.env.BACKEND_TLS_PIN_ENFORCED;
  } else {
    process.env.BACKEND_TLS_PIN_ENFORCED = prev;
  }
  resetServerFingerprintConfigCache();
}

testNormalizeSha256Hex();
testConfiguredPinMatches();
testFingerprintMatchesExpected();
testComputeSpkiSha256FromDer();
testLoadServerFingerprintConfigLocalDev();
console.log('tlsFingerprintProbe.test.ts: ok');
