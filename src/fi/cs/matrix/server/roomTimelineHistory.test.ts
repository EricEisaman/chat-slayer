import assert from 'node:assert/strict';
import {JwtEncodeServiceImpl} from '../../backend/JwtEncodeServiceImpl';
import {MatrixServerService} from './MatrixServerService';
import {MatrixVisibility} from '../types/request/createRoom/types/MatrixVisibility';
import {createMatrixTextMessageDTO} from '../types/message/textMessage/MatrixTextMessageDTO';
import {MatrixRegistrationError} from '../MatrixRegistrationError';

const JWT_SECRET = 'test-room-timeline-history-jwt-32ch';

function createTestServer(): MatrixServerService {
  const jwtEngine = JwtEncodeServiceImpl.create().createJwtEngine(JWT_SECRET);
  return new MatrixServerService(
    'http://localhost:8008',
    'localhost',
    jwtEngine,
    300,
  );
}

async function seedRoomWithMessages(
  count: number,
): Promise<{
  server: MatrixServerService;
  userId: string;
  roomId: string;
}> {
  const server = createTestServer();
  const user = await server.createUser('historyuser', 'password123');
  await server.loginWithPassword('historyuser', 'password123');
  const version = server.getDefaultRoomVersion();
  const roomId = server.ensureRoom(
    user.id,
    '',
    version,
    MatrixVisibility.PUBLIC,
    'History Room',
  ).room_id;
  server.joinRoom(user.id, roomId);
  for (let i = 1; i <= count; i += 1) {
    server.sendRoomMessage(
      user.id,
      roomId,
      'm.room.message',
      `txn-${i}`,
      createMatrixTextMessageDTO(`message ${i}`),
    );
  }
  return {server, userId: user.id, roomId};
}

async function testTailReturnsNewestMessages(): Promise<void> {
  const {server, userId, roomId} = await seedRoomWithMessages(30);
  const events = server.getTimelineEventsForRoom(userId, roomId, 20);
  assert.equal(events.length, 20);
  assert.match(String(events[0].content.body), /message 11/);
  assert.match(String(events[19].content.body), /message 30/);
}

async function testNonMemberGetsEmpty(): Promise<void> {
  const {server, roomId} = await seedRoomWithMessages(5);
  const other = await server.createUser('other', 'password456');
  const events = server.getTimelineEventsForRoom(other.id, roomId, 20);
  assert.equal(events.length, 0);
}

async function testPrivateRoomRequiresDiscovery(): Promise<void> {
  const server = createTestServer();
  server.setPreconfiguredPrivateRoomNames(
    new Set(['sigma']),
  );
  const userA = await server.createUser('alice', 'password123');
  await server.loginWithPassword('alice', 'password123');
  const userB = await server.createUser('bob', 'password456');
  await server.loginWithPassword('bob', 'password456');
  const version = server.getDefaultRoomVersion();
  const entry = server.discoverPreconfiguredPrivateRoom(userA.id, '', 'Sigma');
  server.sendRoomMessage(
    userA.id,
    entry.room_id,
    'm.room.message',
    'txn-1',
    createMatrixTextMessageDTO('secret'),
  );
  assert.throws(
    () => server.getTimelineEventsForRoom(userB.id, entry.room_id, 20),
    (err: unknown) =>
      err instanceof MatrixRegistrationError &&
      err.message.includes('Room not found'),
  );
  server.discoverPreconfiguredPrivateRoom(userB.id, '', 'Sigma');
  server.joinRoom(userB.id, entry.room_id);
  const events = server.getTimelineEventsForRoom(userB.id, entry.room_id, 20);
  assert.equal(events.length, 1);
}

void testTailReturnsNewestMessages()
  .then(() => testNonMemberGetsEmpty())
  .then(() => testPrivateRoomRequiresDiscovery())
  .then(() => {
    console.log('roomTimelineHistory.test.ts: ok');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
