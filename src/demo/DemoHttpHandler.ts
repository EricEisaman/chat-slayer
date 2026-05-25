import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import type {IncomingMessage, ServerResponse} from 'http';
import {ServerSentEventGenerator} from '@starfederation/datastar-sdk/node';
import {loadDemoSseConfig} from '../config/demoSse';
import {CHAT_SLAYER_CLIENT_ID_HEADER} from '../config/allowedClients';
import {MatrixServerService} from '../fi/cs/matrix/server/MatrixServerService';
import {MatrixVisibility} from '../fi/cs/matrix/types/request/createRoom/types/MatrixVisibility';
import {createMatrixTextMessageDTO} from '../fi/cs/matrix/types/message/textMessage/MatrixTextMessageDTO';
import {injectDemoPageMeta} from './demoPageMeta';
import {getDemoStaticRoot} from './serveDemoStatic';
import {getDemoEventHub, type DemoSseSubscriber} from './DemoEventHub';
import {chatSlayerSignalPatch} from './chatSlayerSignalPatch';
import {directoryActionSignalPatch} from './demoLiveSignals';
import {
  respondDemoActionError,
  respondDemoActionSignals,
} from './demoActionResponse';
import {
  demoLogin,
  demoRegister,
  matrixErrorToMessage,
  readSignalString,
  resolveDemoSession,
} from './demoAuth';
import {readStreamAccessToken} from './demoStreamAuth';
import {
  readCreateRoomName,
  readJoinRoomId,
  readRegisterRoomNames,
  readEncryptedRoomEvent,
  readSendMessage,
} from './demoActionInput';
import {filterInboxForRoom} from './demoHtml';
import {listDemoRoomsForUser} from './demoRooms';
import {applyCorsHeaders} from '../fi/cs/node/CorsResponseContext';
import {
  clearSseKeepalive,
  markSseKeepalive,
} from '../fi/cs/node/SseKeepaliveResponse';

let matrixServerRef: MatrixServerService | undefined;
const sseConfig = loadDemoSseConfig();
let subscriberCounter = 0;

export function setDemoMatrixServer(server: MatrixServerService): void {
  matrixServerRef = server;
  getDemoEventHub().setMatrixServer(server);
}

function getMatrixServer(): MatrixServerService {
  if (!matrixServerRef) {
    throw new Error('Demo matrix server not initialized');
  }
  return matrixServerRef;
}

function getRequestPath(req: IncomingMessage): string {
  const url = req.url ?? '/';
  const q = url.indexOf('?');
  return q >= 0 ? url.substring(0, q) : url;
}

export function isDemoApiPath(path: string): boolean {
  return path === '/demo/stream' || path.startsWith('/demo/actions/');
}

function getHeader(req: IncomingMessage, name: string): string | undefined {
  const raw = req.headers[name.toLowerCase()];
  if (raw === undefined) {
    return undefined;
  }
  return Array.isArray(raw) ? raw[0] : raw;
}

function requireClientId(req: IncomingMessage): string | undefined {
  return getHeader(req, CHAT_SLAYER_CLIENT_ID_HEADER)?.trim();
}

function readPageHtml(): string | undefined {
  const root = getDemoStaticRoot();
  if (!root) {
    return undefined;
  }
  const path = join(root, 'index.html');
  if (!existsSync(path)) {
    return undefined;
  }
  return injectDemoPageMeta(readFileSync(path, 'utf8'));
}

async function handleRegister(
  req: IncomingMessage,
  res: ServerResponse,
  signals: Record<string, unknown>,
): Promise<void> {
  const username = readSignalString(signals, 'username');
  const password = readSignalString(signals, 'password');
  try {
    const session = await demoRegister(getMatrixServer(), username, password);
    getDemoEventHub().touchByAccessToken(session.accessToken);
    respondDemoActionSignals(req, res, {
      accessToken: session.accessToken,
      user_id: session.matrixUserId,
      device_id: session.matrixDeviceId,
      streamReady: false,
      rooms: [],
      inbox: [],
      status: `Registered as ${session.matrixUserId}. Connecting…`,
      ...chatSlayerSignalPatch('session', {
        accessToken: session.accessToken,
        user_id: session.matrixUserId,
        device_id: session.matrixDeviceId,
      }),
    });
  } catch (err) {
    respondDemoActionError(req, res, matrixErrorToMessage(err));
  }
}

async function handleLogin(
  req: IncomingMessage,
  res: ServerResponse,
  signals: Record<string, unknown>,
): Promise<void> {
  const username = readSignalString(signals, 'username');
  const password = readSignalString(signals, 'password');
  try {
    const session = await demoLogin(getMatrixServer(), username, password);
    getDemoEventHub().touchByAccessToken(session.accessToken);
    respondDemoActionSignals(req, res, {
      accessToken: session.accessToken,
      user_id: session.matrixUserId,
      device_id: session.matrixDeviceId,
      streamReady: false,
      rooms: [],
      inbox: [],
      status: `Logged in as ${session.matrixUserId}. Connecting…`,
      ...chatSlayerSignalPatch('session', {
        accessToken: session.accessToken,
        user_id: session.matrixUserId,
        device_id: session.matrixDeviceId,
      }),
    });
  } catch (err) {
    respondDemoActionError(req, res, matrixErrorToMessage(err));
  }
}

async function handleRegisterRooms(
  req: IncomingMessage,
  res: ServerResponse,
  signals: Record<string, unknown>,
): Promise<void> {
  const accessToken = readSignalString(signals, 'accessToken');
  const names = readRegisterRoomNames(req, signals);
  if (names.length === 0) {
    respondDemoActionError(req, res, 'At least one room name is required');
    return;
  }
  try {
    const session = await resolveDemoSession(getMatrixServer(), accessToken);
    const server = getMatrixServer();
    const result = server.registerRooms(
      session.internalUserId,
      '',
      server.getDefaultRoomVersion(),
      MatrixVisibility.PRIVATE,
      names,
    );
    getDemoEventHub().touchByAccessToken(accessToken);
    const created = result.rooms.filter((entry) => entry.created).length;
    const reused = result.rooms.length - created;
    const rooms = listDemoRoomsForUser(server, session.internalUserId);
    respondDemoActionSignals(
      req,
      res,
      {
        ...directoryActionSignalPatch(rooms),
        status: `Registered ${result.rooms.length} room(s): ${created} new, ${reused} already existed`,
      },
      rooms,
    );
  } catch (err) {
    respondDemoActionError(req, res, matrixErrorToMessage(err));
  }
}

async function handleDiscoverPrivateRoom(
  req: IncomingMessage,
  res: ServerResponse,
  signals: Record<string, unknown>,
): Promise<void> {
  const accessToken = readSignalString(signals, 'accessToken');
  const roomName = readCreateRoomName(req, signals);
  if (!roomName) {
    respondDemoActionError(req, res, 'Room name is required');
    return;
  }
  try {
    const session = await resolveDemoSession(getMatrixServer(), accessToken);
    const server = getMatrixServer();
    const entry = server.discoverPreconfiguredPrivateRoom(
      session.internalUserId,
      '',
      roomName,
    );
    const joined = server.joinRoom(session.internalUserId, entry.room_id);
    getDemoEventHub().touchByAccessToken(accessToken);
    const rooms = listDemoRoomsForUser(server, session.internalUserId);
    const sub = getDemoEventHub().getSubscriberByAccessToken(accessToken);
    if (sub) {
      getDemoEventHub().setSelectedRoom(sub, joined);
    }
    respondDemoActionSignals(
      req,
      res,
      {
        ...directoryActionSignalPatch(rooms),
        roomId: joined,
        roomName: entry.name,
        status: entry.created
          ? `Opened ${entry.name} (${joined})`
          : `Joined ${entry.name} (${joined})`,
      },
      rooms,
    );
  } catch (err) {
    respondDemoActionError(req, res, matrixErrorToMessage(err));
  }
}

async function handleCreateRoom(
  req: IncomingMessage,
  res: ServerResponse,
  signals: Record<string, unknown>,
): Promise<void> {
  const accessToken = readSignalString(signals, 'accessToken');
  const roomName = readCreateRoomName(req, signals);
  if (!roomName) {
    respondDemoActionError(req, res, 'Room name is required');
    return;
  }
  try {
    const session = await resolveDemoSession(getMatrixServer(), accessToken);
    const server = getMatrixServer();
    const {roomId} = await server.createRoom(
      session.internalUserId,
      '',
      server.getDefaultRoomVersion(),
      MatrixVisibility.PRIVATE,
      roomName,
    );
    const joined = server.joinRoom(session.internalUserId, roomId);
    getDemoEventHub().touchByAccessToken(accessToken);
    const rooms = listDemoRoomsForUser(server, session.internalUserId);
    const sub = getDemoEventHub().getSubscriberByAccessToken(accessToken);
    if (sub) {
      getDemoEventHub().setSelectedRoom(sub, joined);
    }
    respondDemoActionSignals(
      req,
      res,
      {
        ...directoryActionSignalPatch(rooms),
        roomId: joined,
        roomName,
        status: server.isPreconfiguredPrivateName(roomName)
          ? `Opened ${roomName} (${joined})`
          : `Created and joined ${roomName} (${joined})`,
      },
      rooms,
    );
  } catch (err) {
    respondDemoActionError(req, res, matrixErrorToMessage(err));
  }
}

async function handleJoinRoom(
  req: IncomingMessage,
  res: ServerResponse,
  signals: Record<string, unknown>,
): Promise<void> {
  const accessToken = readSignalString(signals, 'accessToken');
  const roomId = readJoinRoomId(req, signals);
  if (!roomId) {
    respondDemoActionError(req, res, 'Pick a room first');
    return;
  }
  try {
    const session = await resolveDemoSession(getMatrixServer(), accessToken);
    const joined = getMatrixServer().joinRoom(session.internalUserId, roomId);
    getDemoEventHub().touchByAccessToken(accessToken);
    const server = getMatrixServer();
    const rooms = listDemoRoomsForUser(server, session.internalUserId);
    const sub = getDemoEventHub().getSubscriberByAccessToken(accessToken);
    if (sub) {
      getDemoEventHub().setSelectedRoom(sub, joined);
    }
    respondDemoActionSignals(
      req,
      res,
      {
        roomId: joined,
        status: `Joined ${joined}`,
      },
      rooms,
    );
  } catch (err) {
    respondDemoActionError(req, res, matrixErrorToMessage(err));
  }
}

async function handleSend(
  req: IncomingMessage,
  res: ServerResponse,
  signals: Record<string, unknown>,
): Promise<void> {
  const accessToken = readSignalString(signals, 'accessToken');
  const roomId = readJoinRoomId(req, signals);
  const encryptedRaw = readEncryptedRoomEvent(req);
  const message = readSendMessage(req, signals);
  if (!roomId || (!encryptedRaw && !message)) {
    respondDemoActionError(req, res, 'Pick a room and enter a message');
    return;
  }
  try {
    const session = await resolveDemoSession(getMatrixServer(), accessToken);
    const server = getMatrixServer();
    server.joinRoom(session.internalUserId, roomId);
    const txn = `txn-${Date.now()}`;
    let eventId: string;
    if (encryptedRaw) {
      const parsed = JSON.parse(encryptedRaw) as {
        type?: string;
        content?: Record<string, unknown>;
      };
      const eventType = String(parsed.type ?? 'm.room.encrypted');
      const content = (parsed.content ?? parsed) as import('../fi/cs/core/Json').ReadonlyJsonObject;
      eventId = server.sendRoomEvent(
        session.internalUserId,
        roomId,
        eventType,
        txn,
        content,
      );
    } else {
      eventId = server.sendRoomMessage(
        session.internalUserId,
        roomId,
        'm.room.message',
        txn,
        createMatrixTextMessageDTO(message),
      );
    }
    const hub = getDemoEventHub();
    hub.touchByAccessToken(accessToken);
    const sub = hub.getSubscriberByAccessToken(accessToken);
    if (sub) {
      sub.selectedRoomId = roomId;
      hub.patchSubscriberUi(sub);
    }
    const filteredInbox = sub
      ? filterInboxForRoom(sub.inboxLines, roomId)
      : [];
    respondDemoActionSignals(
      req,
      res,
      {
        roomId,
        message: '',
        status: `Sent (${eventId})`,
        inbox: filteredInbox,
      },
      undefined,
      sub?.inboxLines,
    );
  } catch (err) {
    respondDemoActionError(req, res, matrixErrorToMessage(err));
  }
}

async function handleStream(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const reader = await ServerSentEventGenerator.readSignals(req);
  if (!reader.success || !reader.signals) {
    clearSseKeepalive(res);
    res.statusCode = 400;
    res.end('Invalid datastar signals');
    return;
  }
  const signals = reader.signals as Record<string, unknown>;
  const accessToken = readStreamAccessToken(req, signals);
  if (!accessToken) {
    clearSseKeepalive(res);
    res.statusCode = 401;
    res.end('Missing access token (Authorization: Bearer or accessToken signal)');
    return;
  }

  try {
    const session = await resolveDemoSession(getMatrixServer(), accessToken);
    const hub = getDemoEventHub();
    const subscriberId = `sub-${++subscriberCounter}`;
    const inactiveMs = sseConfig.inactiveResyncMinutes * 60 * 1000;
    let idleTimer: ReturnType<typeof setInterval> | undefined;

    await ServerSentEventGenerator.stream(
      req,
      res,
      (stream) => {
        const subscriber: DemoSseSubscriber = {
          id: subscriberId,
          accessToken,
          internalUserId: session.internalUserId,
          matrixUserId: session.matrixUserId,
          lastActivityAt: Date.now(),
          lastStreamPos: 0,
          inboxLines: [],
          selectedRoomId: '',
              writer: {
                patchSignals: (json: string) => {
                  stream.patchSignals(json);
                },
                patchElements: (html: string, options) => {
                  stream.patchElements(html, options);
                },
              },
        };
        hub.subscribe(subscriber);
        hub.rebuildSubscriberInbox(subscriber);

        idleTimer = setInterval(() => {
          hub.resyncIdleSubscribers(inactiveMs);
        }, sseConfig.idleCheckIntervalMs);
      },
      {
        keepalive: sseConfig.keepalive,
        onAbort: () => {
          if (idleTimer) {
            clearInterval(idleTimer);
          }
          hub.unsubscribe(subscriberId);
          clearSseKeepalive(res);
        },
      },
    );
  } catch {
    clearSseKeepalive(res);
    if (!res.headersSent) {
      res.statusCode = 401;
      res.end('Unauthorised');
    }
  }
}

function serveStaticAsset(
  req: IncomingMessage,
  res: ServerResponse,
  path: string,
): boolean {
  if (path === '/demo.css') {
    const root = getDemoStaticRoot();
    if (!root) {
      return false;
    }
    const file = join(root, 'demo.css');
    if (!existsSync(file)) {
      return false;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    res.end(readFileSync(file));
    return true;
  }
  return false;
}

export async function tryHandleDemoRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean> {
  const path = getRequestPath(req);
  const method = req.method?.toUpperCase() ?? 'GET';

  if (path === '/' && (method === 'GET' || method === 'HEAD')) {
    const html = readPageHtml();
    if (!html) {
      return false;
    }
    const origin = getHeader(req, 'origin') ?? getHeader(req, 'referer');
    if (origin) {
      applyCorsHeaders(res, origin);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (method === 'HEAD') {
      res.end();
    } else {
      res.end(html);
    }
    return true;
  }

  if (serveStaticAsset(req, res, path)) {
    return true;
  }

  if (!isDemoApiPath(path)) {
    return false;
  }

  if (method === 'OPTIONS') {
    return false;
  }

  if (!requireClientId(req)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({error: `Missing ${CHAT_SLAYER_CLIENT_ID_HEADER}`}),
    );
    return true;
  }

  if (
    path === '/demo/stream' &&
    (method === 'GET' || method === 'POST')
  ) {
    markSseKeepalive(res);
    await handleStream(req, res);
    return true;
  }

  if (path.startsWith('/demo/actions/') && method === 'POST') {
    const reader = await ServerSentEventGenerator.readSignals(req);
    if (!reader.success || !reader.signals) {
      res.statusCode = 400;
      res.end('Invalid datastar signals');
      return true;
    }
    const signals = reader.signals as Record<string, unknown>;

    if (path === '/demo/actions/register') {
      await handleRegister(req, res, signals);
      return true;
    }
    if (path === '/demo/actions/login') {
      await handleLogin(req, res, signals);
      return true;
    }
    if (path === '/demo/actions/register-rooms') {
      await handleRegisterRooms(req, res, signals);
      return true;
    }
    if (path === '/demo/actions/create-room') {
      await handleCreateRoom(req, res, signals);
      return true;
    }
    if (path === '/demo/actions/discover-private-room') {
      await handleDiscoverPrivateRoom(req, res, signals);
      return true;
    }
    if (path === '/demo/actions/join-room') {
      await handleJoinRoom(req, res, signals);
      return true;
    }
    if (path === '/demo/actions/send') {
      await handleSend(req, res, signals);
      return true;
    }

    res.statusCode = 404;
    res.end('Unknown demo action');
    return true;
  }

  return false;
}
