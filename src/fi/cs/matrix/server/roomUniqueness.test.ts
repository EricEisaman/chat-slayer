import assert from 'node:assert/strict';
import {JwtEncodeServiceImpl} from '../../backend/JwtEncodeServiceImpl';
import {MatrixServerService} from './MatrixServerService';
import {MatrixVisibility} from '../types/request/createRoom/types/MatrixVisibility';
import {MatrixRegistrationError} from '../MatrixRegistrationError';

const JWT_SECRET = 'test-room-uniqueness-jwt-secret-32chars';

function createTestMatrixServer(): MatrixServerService {
  const jwtEngine = JwtEncodeServiceImpl.create().createJwtEngine(JWT_SECRET);
  return new MatrixServerService(
    'http://localhost:8008',
    'localhost',
    jwtEngine,
    300,
  );
}

async function testUniqueRoomNames(): Promise<void> {
  const svc = createTestMatrixServer();
  const user = await svc.createUser('roomowner', 'password123');
  const version = svc.getDefaultRoomVersion();

  const first = await svc.createRoom(
    user.id,
    '',
    version,
    MatrixVisibility.PRIVATE,
    'Team Chat',
  );
  assert.match(first.roomId, /^!team-chat:localhost$/);

  let duplicateFailed = false;
  try {
    await svc.createRoom(
      user.id,
      '',
      version,
      MatrixVisibility.PRIVATE,
      'team chat',
    );
  } catch (err) {
    duplicateFailed = true;
    assert.ok(err instanceof MatrixRegistrationError);
    assert.equal(err.httpStatus, 409);
  }
  assert.ok(duplicateFailed, 'duplicate name should throw');

  const second = await svc.createRoom(
    user.id,
    '',
    version,
    MatrixVisibility.PRIVATE,
    'Other Room',
  );
  assert.match(second.roomId, /^!other-room:localhost$/);
  assert.notEqual(first.roomId, second.roomId);

  const listed = svc.listRooms();
  assert.equal(listed.length, 2);
  assert.deepEqual(
    listed.map((r) => r.name).sort(),
    ['Other Room', 'Team Chat'],
  );
}

void testUniqueRoomNames()
  .then(() => {
    console.log('roomUniqueness.test.ts: ok');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
