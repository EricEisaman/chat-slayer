import type {ReadonlyJsonObject} from '../../core/Json';

export interface StoredDeviceKeys {
  deviceKeys: ReadonlyJsonObject;
  oneTimeKeys: Record<string, ReadonlyJsonObject>;
  fallbackKeys?: Record<string, ReadonlyJsonObject>;
}

export interface ToDeviceEvent {
  readonly type: string;
  readonly sender: string;
  readonly content: ReadonlyJsonObject;
}

/** In-memory store for Olm/Megolm (Signal-protocol) key material and to-device relay. */
export class MatrixCryptoStore {
  private readonly _keysByUser = new Map<
    string,
    Map<string, StoredDeviceKeys>
  >();
  private readonly _toDeviceByUser = new Map<string, ToDeviceEvent[]>();
  private readonly _encryptedRooms = new Set<string>();

  public markRoomEncrypted(roomId: string): void {
    this._encryptedRooms.add(roomId);
  }

  public isRoomEncrypted(roomId: string): boolean {
    return this._encryptedRooms.has(roomId);
  }

  public uploadKeys(
    userId: string,
    deviceId: string,
    body: ReadonlyJsonObject,
  ): void {
    const deviceKeys = (body.device_keys as ReadonlyJsonObject) ?? {};
    const oneTimeKeys =
      (body.one_time_keys as Record<string, ReadonlyJsonObject>) ?? {};
    const fallbackKeys =
      (body.fallback_keys as Record<string, ReadonlyJsonObject>) ?? undefined;
    let byDevice = this._keysByUser.get(userId);
    if (!byDevice) {
      byDevice = new Map();
      this._keysByUser.set(userId, byDevice);
    }
    const existing = byDevice.get(deviceId);
    byDevice.set(deviceId, {
      deviceKeys: {...(existing?.deviceKeys ?? {}), ...deviceKeys},
      oneTimeKeys: {...(existing?.oneTimeKeys ?? {}), ...oneTimeKeys},
      fallbackKeys: fallbackKeys ?? existing?.fallbackKeys,
    });
  }

  public queryKeys(
    deviceKeys: ReadonlyJsonObject,
    timeoutMs = 10000,
  ): {device_keys: Record<string, Record<string, ReadonlyJsonObject>>} {
    const result: Record<string, Record<string, ReadonlyJsonObject>> = {};
    for (const [userId, devices] of Object.entries(deviceKeys)) {
      const stored = this._keysByUser.get(userId);
      if (!stored) {
        continue;
      }
      const out: Record<string, ReadonlyJsonObject> = {};
      const deviceIds = devices as Record<string, unknown>;
      for (const deviceId of Object.keys(deviceIds)) {
        const keys = stored.get(deviceId);
        if (keys?.deviceKeys) {
          out[deviceId] = keys.deviceKeys;
        }
      }
      if (Object.keys(out).length > 0) {
        result[userId] = out;
      }
    }
    void timeoutMs;
    return {device_keys: result};
  }

  public claimKeys(
    oneTimeKeys: Record<string, Record<string, string>>,
  ): Record<string, Record<string, ReadonlyJsonObject>> {
    const result: Record<string, Record<string, ReadonlyJsonObject>> = {};
    for (const [userId, devices] of Object.entries(oneTimeKeys)) {
      const stored = this._keysByUser.get(userId);
      if (!stored) {
        continue;
      }
      for (const [deviceId, keyId] of Object.entries(devices)) {
        const device = stored.get(deviceId);
        if (!device) {
          continue;
        }
        const otk = device.oneTimeKeys[keyId];
        if (!otk) {
          continue;
        }
        delete device.oneTimeKeys[keyId];
        if (!result[userId]) {
          result[userId] = {};
        }
        result[userId][deviceId] = otk;
      }
    }
    return result;
  }

  public enqueueToDevice(
    userId: string,
    event: ToDeviceEvent,
  ): void {
    const list = this._toDeviceByUser.get(userId) ?? [];
    list.push(event);
    this._toDeviceByUser.set(userId, list);
  }

  public drainToDeviceEvents(userId: string): ToDeviceEvent[] {
    const list = this._toDeviceByUser.get(userId) ?? [];
    this._toDeviceByUser.set(userId, []);
    return list;
  }
}

let globalStore: MatrixCryptoStore | undefined;

export function getMatrixCryptoStore(): MatrixCryptoStore {
  if (!globalStore) {
    globalStore = new MatrixCryptoStore();
  }
  return globalStore;
}

export function resetMatrixCryptoStoreForTests(): void {
  globalStore = undefined;
}
