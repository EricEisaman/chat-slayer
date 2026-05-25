import assert from 'node:assert/strict';
import type {IncomingMessage} from 'http';
import {
  readCreateRoomName,
  readJoinRoomId,
  readRegisterRoomNames,
} from './demoActionInput';

function req(headers: Record<string, string>): IncomingMessage {
  return {headers} as IncomingMessage;
}

function testCreateRoomNameHeaderWins(): void {
  const name = readCreateRoomName(req({'x-demo-room-name': 'Sigma'}), {
    roomName: 'Lobby',
  });
  assert.equal(name, 'Sigma');
}

function testRegisterRoomNamesHeader(): void {
  const names = readRegisterRoomNames(
    req({'x-demo-room-names': 'Alpha, Beta'}),
    {roomNames: ''},
  );
  assert.deepEqual(names, ['Alpha', 'Beta']);
}

function testJoinRoomIdHeader(): void {
  const id = readJoinRoomId(req({'x-demo-room-id': '!sigma:localhost'}), {
    roomId: '',
  });
  assert.equal(id, '!sigma:localhost');
}

testCreateRoomNameHeaderWins();
testRegisterRoomNamesHeader();
testJoinRoomIdHeader();
console.log('demoActionInput.test.ts: ok');
