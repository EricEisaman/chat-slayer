/**
 * Browser E2EE for the demo (Olm/Megolm via @matrix-org/matrix-sdk-crypto-wasm).
 * Encrypts when possible, then triggers Datastar @post via #send-post-proxy.
 */
import {
  initAsync,
  OlmMachine,
  UserId,
  DeviceId,
  RoomId,
  RequestType,
  DecryptionSettings,
  TrustRequirement,
  DeviceLists,
  EncryptionSettings,
} from './crypto-sdk/index.mjs';

const CLIENT_HEADER = 'X-Chat-Slayer-Client-Id';
const CLIENT_ID = 'web-demo';
/** @type {import('./crypto-sdk/pkg/matrix_sdk_crypto_wasm.d.ts').OlmMachine | undefined} */
let machine;
let session = {
  accessToken: '',
  userId: '',
  deviceId: '',
};
let wasmReady;
let decryptBusy = false;
let cryptoInitError = '';
let lastSessionKey = '';
let lastPreparedRoomId = '';
let prepareRoomInFlight = null;

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    }),
  ]);
}

function fireDatastarSend(roomId, encrypted, plaintext) {
  window.__csSendDetail = {roomId, encrypted, plaintext};
  const proxy = document.getElementById('send-post-proxy');
  if (!proxy) {
    console.error('ChatSlayerE2ee: missing #send-post-proxy');
    return;
  }
  proxy.click();
}

async function matrixAuthFetch(path, init = {}) {
  const headers = {
    [CLIENT_HEADER]: CLIENT_ID,
    Authorization: `Bearer ${session.accessToken}`,
    'Content-Type': 'application/json',
    ...(init.headers ?? {}),
  };
  return fetch(path, {...init, headers});
}

async function ensureWasm() {
  if (!wasmReady) {
    wasmReady = initAsync(
      new URL('./crypto-sdk/pkg/matrix_sdk_crypto_wasm_bg.wasm', import.meta.url),
    );
  }
  await wasmReady;
}

async function flushOutgoing() {
  if (!machine) {
    return;
  }
  const requests = await machine.outgoingRequests();
  for (const req of requests) {
    let responseJson = '{}';
    if (req.type === RequestType.KeysUpload) {
      const res = await matrixAuthFetch('/_matrix/client/v3/keys/upload', {
        method: 'POST',
        body: req.body,
      });
      responseJson = await res.text();
      if (!res.ok) {
        throw new Error(`keys/upload failed: ${responseJson}`);
      }
    } else if (req.type === RequestType.KeysQuery) {
      const res = await matrixAuthFetch('/_matrix/client/v3/keys/query', {
        method: 'POST',
        body: req.body,
      });
      responseJson = await res.text();
    } else if (req.type === RequestType.KeysClaim) {
      const res = await matrixAuthFetch('/_matrix/client/v3/keys/claim', {
        method: 'POST',
        body: req.body,
      });
      responseJson = await res.text();
    } else if (req.type === RequestType.ToDevice) {
      const res = await matrixAuthFetch(
        `/_matrix/client/v3/sendToDevice/${encodeURIComponent(req.event_type)}/${encodeURIComponent(req.txn_id)}`,
        {method: 'PUT', body: req.body},
      );
      responseJson = await res.text();
      if (!res.ok) {
        throw new Error(`sendToDevice failed: ${responseJson}`);
      }
    }
    await machine.markRequestAsSent(req.id, req.type, responseJson);
  }
}

function syncStorageKey() {
  return `cs-sync-${session.userId}-${session.deviceId}`;
}

async function runSync() {
  if (!machine || !session.accessToken) {
    return;
  }
  const since = sessionStorage.getItem(syncStorageKey()) ?? '0';
  const res = await matrixAuthFetch(
    `/_matrix/client/r0/sync?since=${encodeURIComponent(since)}`,
  );
  if (!res.ok) {
    return;
  }
  const data = await res.json();
  const toDevice = data.to_device?.events ?? [];
  const counts = new Map(
    Object.entries(data.device_one_time_keys_count ?? {}).map(([k, v]) => [
      k,
      Number(v),
    ]),
  );
  const settings = new DecryptionSettings(TrustRequirement.Untrusted);
  await machine.receiveSyncChanges(
    JSON.stringify(toDevice),
    new DeviceLists(),
    counts,
    undefined,
    settings,
  );
  if (data.next_batch) {
    sessionStorage.setItem(syncStorageKey(), String(data.next_batch));
  }
  await flushOutgoing();
}

async function fetchRoomMembers(roomId) {
  const res = await matrixAuthFetch(
    `/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/joined_members`,
  );
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return Object.keys(data.joined ?? {});
}

async function shareKeysForRoom(roomId, memberIds) {
  const others = memberIds
    .filter((id) => id !== session.userId)
    .map((id) => new UserId(id));
  const settings = new EncryptionSettings();
  const targets = others.length > 0 ? others : [];
  const claimReq = await machine.getMissingSessions(targets);
  if (claimReq) {
    const res = await matrixAuthFetch('/_matrix/client/v3/keys/claim', {
      method: 'POST',
      body: claimReq.body,
    });
    await machine.markRequestAsSent(
      claimReq.id,
      claimReq.type,
      await res.text(),
    );
  }
  const toDeviceReqs = await machine.shareRoomKey(
    new RoomId(roomId),
    targets,
    settings,
  );
  for (const td of toDeviceReqs) {
    const res = await matrixAuthFetch(
      `/_matrix/client/v3/sendToDevice/${encodeURIComponent(td.event_type)}/${encodeURIComponent(td.txn_id)}`,
      {method: 'PUT', body: td.body},
    );
    await machine.markRequestAsSent(td.id, td.type, await res.text());
  }
  await runSync();
}

async function prepareRoom(roomId) {
  if (!machine || !roomId) {
    return;
  }
  const members = await fetchRoomMembers(roomId);
  await shareKeysForRoom(roomId, members);
}

async function initCrypto(accessToken, userId, deviceId) {
  if (
    machine &&
    session.accessToken === accessToken &&
    session.userId === userId &&
    session.deviceId === deviceId
  ) {
    return;
  }
  cryptoInitError = '';
  await ensureWasm();
  session.accessToken = accessToken;
  session.userId = userId;
  session.deviceId = deviceId;
  machine = await OlmMachine.initialize(
    new UserId(userId),
    new DeviceId(deviceId),
    `cs-demo-${userId}`,
  );
  await flushOutgoing();
  await runSync();
}

async function decryptPayload(payloadStr, roomId) {
  if (!machine || !payloadStr) {
    return '';
  }
  try {
    const decrypted = await machine.decryptRoomEvent(
      payloadStr,
      new RoomId(roomId),
      new DecryptionSettings(TrustRequirement.Untrusted),
    );
    const event = JSON.parse(decrypted.event);
    const content = event.content ?? event;
    return String(content.body ?? '');
  } catch {
    return '';
  }
}

async function decryptInboxDom() {
  if (!machine || decryptBusy) {
    return;
  }
  decryptBusy = true;
  try {
    const articles = document.querySelectorAll(
      '#inbox .msg[data-event-payload]',
    );
    for (const article of articles) {
      const payload = article.getAttribute('data-event-payload');
      if (!payload || article.dataset.decrypted === '1') {
        continue;
      }
      const roomId = article.getAttribute('data-room-id') ?? '';
      if (!roomId) {
        continue;
      }
      const plain = await decryptPayload(payload, roomId);
      if (plain) {
        const bodyEl = article.querySelector('.msg-body');
        if (bodyEl) {
          bodyEl.textContent = plain;
        }
        article.dataset.decrypted = '1';
      }
    }
  } finally {
    decryptBusy = false;
  }
}

const ChatSlayerE2ee = {
  async onSignals(signals) {
    try {
      const token =
        typeof signals.accessToken === 'string' ? signals.accessToken : '';
      const userId =
        typeof signals.user_id === 'string' ? signals.user_id : '';
      const deviceId =
        typeof signals.device_id === 'string' ? signals.device_id : '';
      const roomId = typeof signals.roomId === 'string' ? signals.roomId : '';
      const sessionKey = `${token}|${userId}|${deviceId}`;
      const inboxLen = Array.isArray(signals.inbox) ? signals.inbox.length : 0;

      if (token && userId && deviceId && sessionKey !== lastSessionKey) {
        await initCrypto(token, userId, deviceId);
        lastSessionKey = sessionKey;
        lastPreparedRoomId = '';
      }
      if (roomId && machine && roomId !== lastPreparedRoomId) {
        if (!prepareRoomInFlight) {
          prepareRoomInFlight = prepareRoom(roomId).finally(() => {
            prepareRoomInFlight = null;
          });
        }
        await prepareRoomInFlight;
        lastPreparedRoomId = roomId;
      }
      if (inboxLen > 0) {
        await runSync();
        await decryptInboxDom();
      }
    } catch (err) {
      cryptoInitError = err instanceof Error ? err.message : String(err);
      console.error('ChatSlayerE2ee.onSignals', err);
    }
  },

  async queueSend() {
    const picker = document.getElementById('room-picker');
    const input = document.getElementById('send-message');
    const roomId = picker?.value?.trim() ?? '';
    const text = input?.value?.trim() ?? '';
    if (!roomId || !text) {
      return;
    }

    let encrypted = '';
    let plaintext = text;

    if (machine && session.accessToken) {
      try {
        await withTimeout(prepareRoom(roomId), 12000, 'prepareRoom');
        const payload = JSON.stringify({msgtype: 'm.text', body: text});
        const encryptedEvent = await withTimeout(
          machine.encryptRoomEvent(
            new RoomId(roomId),
            'm.room.message',
            payload,
          ),
          8000,
          'encryptRoomEvent',
        );
        const parsed = JSON.parse(encryptedEvent);
        encrypted = JSON.stringify({
          type: parsed.type ?? 'm.room.encrypted',
          content: parsed.content ?? parsed,
        });
        plaintext = '';
        await runSync();
      } catch (err) {
        console.error('E2EE encrypt failed, sending plaintext', err);
        encrypted = '';
        plaintext = text;
      }
    }

    fireDatastarSend(roomId, encrypted, plaintext);

    if (input && !plaintext) {
      input.value = '';
    }
  },
};

window.ChatSlayerE2ee = ChatSlayerE2ee;

/** Plaintext fallback if the module failed to load. */
window.__csSendDetail = {roomId: '', encrypted: '', plaintext: ''};
window.queueSendPlain = () => {
  const picker = document.getElementById('room-picker');
  const input = document.getElementById('send-message');
  const roomId = picker?.value?.trim() ?? '';
  const plaintext = input?.value?.trim() ?? '';
  if (!roomId || !plaintext) {
    return;
  }
  fireDatastarSend(roomId, '', plaintext);
};
