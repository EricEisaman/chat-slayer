import assert from 'node:assert/strict';
import type {IncomingMessage} from 'http';
import {readStreamAccessToken} from './demoStreamAuth';

function reqWithAuth(authorization: string): IncomingMessage {
  return {headers: {authorization}} as IncomingMessage;
}

function testPrefersBearerHeader(): void {
  const token = readStreamAccessToken(
    reqWithAuth('Bearer header-token'),
    {accessToken: 'signal-token'},
  );
  assert.equal(token, 'header-token');
}

function testFallsBackToSignals(): void {
  const token = readStreamAccessToken({headers: {}} as IncomingMessage, {
    accessToken: 'signal-token',
  });
  assert.equal(token, 'signal-token');
}

function testEmptyReturnsUndefined(): void {
  const token = readStreamAccessToken({headers: {}} as IncomingMessage, {
    accessToken: '',
  });
  assert.equal(token, undefined);
}

testPrefersBearerHeader();
testFallsBackToSignals();
testEmptyReturnsUndefined();
console.log('demoStreamAuth.test.ts: ok');
