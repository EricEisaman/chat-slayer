import assert from 'node:assert/strict';
import {JwtEncodeServiceImpl} from '../fi/cs/backend/JwtEncodeServiceImpl';
import {MatrixServerService} from '../fi/cs/matrix/server/MatrixServerService';
import {MatrixVisibility} from '../fi/cs/matrix/types/request/createRoom/types/MatrixVisibility';
import {createMatrixTextMessageDTO} from '../fi/cs/matrix/types/message/textMessage/MatrixTextMessageDTO';
import {
  DemoEventHub,
  resetDemoEventHubForTests,
  type DemoSseSubscriber,
} from './DemoEventHub';
import {filterInboxForRoom, renderInboxHtml} from './demoHtml';

const JWT_SECRET = 'test-demo-event-hub-jwt-secret-32ch';

async function setupRoomsAndMessages(): Promise<{
  hub: DemoEventHub;
  server: MatrixServerService;
  sub: DemoSseSubscriber;
  roomA: string;
  roomB: string;
}> {
  const jwtEngine = JwtEncodeServiceImpl.create().createJwtEngine(JWT_SECRET);
  const server = new MatrixServerService(
    'http://localhost:8008',
    'localhost',
    jwtEngine,
    300,
  );
  const hub = new DemoEventHub();
  hub.setMatrixServer(server);
  const user = await server.createUser('inboxuser', 'password123');
  await server.loginWithPassword('inboxuser', 'password123');
  const matrixUserId = server.resolveMatrixUserId(user.id);
  assert.ok(matrixUserId);

  const version = server.getDefaultRoomVersion();
  const roomA = server.ensureRoom(
    user.id,
    '',
    version,
    MatrixVisibility.PUBLIC,
    'Room Alpha',
  ).room_id;
  const roomB = server.ensureRoom(
    user.id,
    '',
    version,
    MatrixVisibility.PUBLIC,
    'Room Beta',
  ).room_id;
  server.joinRoom(user.id, roomA);
  server.joinRoom(user.id, roomB);

  server.sendRoomMessage(
    user.id,
    roomA,
    'm.room.message',
    'txn-a1',
    createMatrixTextMessageDTO('alpha one'),
  );
  server.sendRoomMessage(
    user.id,
    roomA,
    'm.room.message',
    'txn-a2',
    createMatrixTextMessageDTO('alpha two'),
  );
  server.sendRoomMessage(
    user.id,
    roomB,
    'm.room.message',
    'txn-b1',
    createMatrixTextMessageDTO('beta one'),
  );

  const sub: DemoSseSubscriber = {
    id: 'test-sub',
    accessToken: 'token',
    internalUserId: user.id,
    matrixUserId,
    lastActivityAt: Date.now(),
    lastStreamPos: 0,
    inboxLines: [],
    selectedRoomId: '',
    writer: {
      patchSignals: () => {},
      patchElements: () => {},
    },
  };

  hub.subscribe(sub);
  hub.rebuildSubscriberInbox(sub);
  assert.equal(sub.inboxLines.length, 3);

  return {hub, server, sub, roomA, roomB};
}

async function testRoomSwitchDoesNotWipeInbox(): Promise<void> {
  const {hub, sub, roomA, roomB} = await setupRoomsAndMessages();
  const countBefore = sub.inboxLines.length;
  assert.ok(sub.lastStreamPos > 0);

  hub.setSelectedRoom(sub, roomB);
  assert.equal(sub.inboxLines.length, countBefore);
  assert.equal(filterInboxForRoom(sub.inboxLines, roomB).length, 1);

  hub.setSelectedRoom(sub, roomA);
  assert.equal(sub.inboxLines.length, countBefore);
  assert.equal(filterInboxForRoom(sub.inboxLines, roomA).length, 2);

  const htmlA = renderInboxHtml(sub.inboxLines, roomA);
  assert.match(htmlA, /alpha one/);
  assert.doesNotMatch(htmlA, /beta one/);
}

async function testAppendSubscriberInboxIncremental(): Promise<void> {
  const {hub, server, sub, roomA} = await setupRoomsAndMessages();
  const beforeLen = sub.inboxLines.length;
  sub.lastStreamPos = server.getLatestStreamPos();

  server.sendRoomMessage(
    sub.internalUserId,
    roomA,
    'm.room.message',
    'txn-a3',
    createMatrixTextMessageDTO('alpha three'),
  );

  hub.appendSubscriberInbox(sub);
  assert.equal(sub.inboxLines.length, beforeLen + 1);
}

void testRoomSwitchDoesNotWipeInbox()
  .then(() => testAppendSubscriberInboxIncremental())
  .then(() => {
    resetDemoEventHubForTests();
    console.log('demoEventHub.test.ts: ok');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
