import assert from 'node:assert/strict';
import {JwtEncodeServiceImpl} from '../../backend/JwtEncodeServiceImpl';
import {MatrixServerService} from './MatrixServerService';
import {MatrixVisibility} from '../types/request/createRoom/types/MatrixVisibility';

const JWT_SECRET = 'test-room-batch-jwt-secret-32chars-min';

function createTestMatrixServer(): MatrixServerService {
  const jwtEngine = JwtEncodeServiceImpl.create().createJwtEngine(JWT_SECRET);
  return new MatrixServerService(
    'http://localhost:8008',
    'localhost',
    jwtEngine,
    300,
  );
}

async function testRegisterRoomsIdempotent(): Promise<void> {
  const svc = createTestMatrixServer();
  const user = await svc.createUser('batchowner', 'password123');
  const version = svc.getDefaultRoomVersion();

  const first = svc.registerRooms(user.id, '', version, MatrixVisibility.PRIVATE, [
    'Lobby',
    'Team Chat',
  ]);
  assert.equal(first.rooms.length, 2);
  assert.equal(first.rooms[0].created, true);
  assert.equal(first.rooms[1].created, true);
  const lobbyId = first.rooms[0].room_id;

  const second = svc.registerRooms(user.id, '', version, MatrixVisibility.PRIVATE, [
    'lobby',
    'Team Chat',
    'New Room',
  ]);
  assert.equal(second.rooms.length, 3);
  assert.equal(second.rooms[0].created, false);
  assert.equal(second.rooms[0].room_id, lobbyId);
  assert.equal(second.rooms[1].created, false);
  assert.equal(second.rooms[2].created, true);

  assert.equal(svc.listRooms().length, 3);
}

void testRegisterRoomsIdempotent()
  .then(() => {
    console.log('roomBatchRegistration.test.ts: ok');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
