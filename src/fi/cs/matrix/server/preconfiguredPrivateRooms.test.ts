import assert from 'node:assert/strict';
import {JwtEncodeServiceImpl} from '../../backend/JwtEncodeServiceImpl';
import {MatrixServerService} from './MatrixServerService';
import {MatrixVisibility} from '../types/request/createRoom/types/MatrixVisibility';
import {normalizeRoomDisplayName} from './roomSlug';

const JWT_SECRET = 'test-preconfigured-rooms-jwt-secret-32ch';

function createTestMatrixServer(
  preconfigured: readonly string[],
): MatrixServerService {
  const jwtEngine = JwtEncodeServiceImpl.create().createJwtEngine(JWT_SECRET);
  const svc = new MatrixServerService(
    'http://localhost:8008',
    'localhost',
    jwtEngine,
    300,
  );
  const normalized = new Set(
    preconfigured.map((name) => normalizeRoomDisplayName(name)),
  );
  svc.setPreconfiguredPrivateRoomNames(normalized);
  return svc;
}

async function testPreconfiguredHiddenUntilDiscovered(): Promise<void> {
  const svc = createTestMatrixServer(['Sigma', 'Lobby']);
  const userA = await svc.createUser('alice', 'password123');
  const userB = await svc.createUser('bob', 'password456');
  const version = svc.getDefaultRoomVersion();

  assert.equal(svc.listRooms().length, 0);
  assert.equal(svc.listRoomsForUser(userA.id).length, 0);
  assert.equal(svc.listRoomsForUser(userB.id).length, 0);

  const discoveredA = svc.discoverPreconfiguredPrivateRoom(
    userA.id,
    '',
    'Sigma',
  );
  assert.equal(discoveredA.created, true);
  assert.equal(discoveredA.name, 'Sigma');

  const listA = svc.listRoomsForUser(userA.id);
  assert.equal(listA.length, 1);
  assert.equal(listA[0].name, 'Sigma');
  assert.equal(listA[0].preconfigured, true);

  assert.equal(svc.listRoomsForUser(userB.id).length, 0);

  const publicRoom = svc.ensureRoom(
    userA.id,
    '',
    version,
    MatrixVisibility.PUBLIC,
    'Town Square',
  );
  assert.equal(publicRoom.created, true);

  assert.equal(svc.listRoomsForUser(userA.id).length, 2);
  assert.equal(svc.listRoomsForUser(userB.id).length, 1);
  assert.equal(svc.listRoomsForUser(userB.id)[0].name, 'Town Square');

  svc.discoverPreconfiguredPrivateRoom(userB.id, '', 'Sigma');
  const listB = svc.listRoomsForUser(userB.id);
  assert.equal(listB.length, 2);
  const sigmaB = listB.find((r) => r.name === 'Sigma');
  assert.ok(sigmaB);
  assert.equal(sigmaB.preconfigured, true);
  assert.equal(sigmaB.room_id, discoveredA.room_id);
}

async function testJoinByRoomIdRequiresDiscovery(): Promise<void> {
  const svc = createTestMatrixServer(['Sigma']);
  const userA = await svc.createUser('dana', 'password123');
  await svc.loginWithPassword('dana', 'password123');
  const userB = await svc.createUser('eve', 'password456');
  await svc.loginWithPassword('eve', 'password456');

  const discovered = svc.discoverPreconfiguredPrivateRoom(userA.id, '', 'Sigma');
  assert.throws(
    () => svc.joinRoom(userB.id, discovered.room_id),
    (err: unknown) =>
      err instanceof Error && err.message.includes('Room not found'),
  );

  svc.discoverPreconfiguredPrivateRoom(userB.id, '', 'Sigma');
  const joined = svc.joinRoom(userB.id, discovered.room_id);
  assert.equal(joined, discovered.room_id);
}

async function testFindRoomIdByDisplayNameHiddenUntilDiscovery(): Promise<void> {
  const svc = createTestMatrixServer(['Sigma']);
  const user = await svc.createUser('frank', 'password123');

  svc.discoverPreconfiguredPrivateRoom(user.id, '', 'Sigma');
  assert.equal(
    svc.findRoomIdByDisplayNameForUser(user.id, 'Sigma'),
    svc.findRoomIdByDisplayName('Sigma'),
  );
  assert.equal(
    svc.findRoomIdByDisplayNameForUser(user.id, 'sigma'),
    svc.findRoomIdByDisplayName('Sigma'),
  );

  const other = await svc.createUser('grace', 'password456');
  assert.equal(svc.findRoomIdByDisplayNameForUser(other.id, 'Sigma'), undefined);
}

async function testDiscoverUnknownNameFails(): Promise<void> {
  const svc = createTestMatrixServer(['Sigma']);
  const user = await svc.createUser('carol', 'password789');
  assert.throws(
    () => svc.discoverPreconfiguredPrivateRoom(user.id, '', 'Unknown'),
    (err: unknown) =>
      err instanceof Error && err.message.includes('Unknown room name'),
  );
}

void testPreconfiguredHiddenUntilDiscovered()
  .then(() => testJoinByRoomIdRequiresDiscovery())
  .then(() => testFindRoomIdByDisplayNameHiddenUntilDiscovery())
  .then(() => testDiscoverUnknownNameFails())
  .then(() => {
    console.log('preconfiguredPrivateRooms.test.ts: ok');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
