import {JwtDecodeServiceImpl} from '../../backend/JwtDecodeServiceImpl';
import {createEventEntity} from './types/repository/event/entities/EventEntity';
import {createRoom} from './types/repository/room/Room';
import {UserRepositoryItem} from './types/repository/user/UserRepositoryItem';
import {JwtEngine} from '../../core/jwt/JwtEngine';
import {DeviceRepositoryItem} from './types/repository/device/DeviceRepositoryItem';
import {LogService} from '../../core/LogService';
import {createUser, User} from './types/repository/user/User';
import {
  createRoomRepositoryItem,
  RoomRepositoryItem,
} from './types/repository/room/RoomRepositoryItem';
import {MatrixRoomVersion} from '../types/MatrixRoomVersion';
import {MatrixVisibility} from '../types/request/createRoom/types/MatrixVisibility';
import {getMatrixCryptoStore} from '../crypto/MatrixCryptoStore';
import {LogLevel} from '../../core/types/LogLevel';
import {JsonObject} from '../../core/Json';
import {
  createEventRepositoryItem,
  EventRepositoryItem,
} from './types/repository/event/EventRepositoryItem';
import {MatrixType} from '../types/core/MatrixType';
import {ReadonlyJsonObject} from '../../core/Json';
import {MatrixRoomCreateEventDTO} from '../types/event/roomCreate/MatrixRoomCreateEventDTO';
import {RoomMembershipState} from '../types/event/roomMember/RoomMembershipState';
import {RoomMemberContent3rdPartyInviteDTO} from '../types/event/roomMember/RoomMemberContent3rdPartyInviteDTO';
import {createRoomMemberContentDTO} from '../types/event/roomMember/RoomMemberContentDTO';
import {JwtUtils} from '../../core/jwt/JwtUtils';
import {createDevice} from './types/repository/device/Device';
import {createDeviceRepositoryItem} from './types/repository/device/DeviceRepositoryItem';
import {createUserRepositoryItem} from './types/repository/user/UserRepositoryItem';
import {MatrixUtils} from '../MatrixUtils';
import {MatrixErrorCode} from '../types/response/error/types/MatrixErrorCode';
import {MatrixRegistrationError} from '../MatrixRegistrationError';
import {
  assertValidMatrixPassword,
  assertValidMatrixUsername,
  normalizeMatrixUsername,
} from '../matrixUsername';
import {MatrixTextMessageDTO} from '../types/message/textMessage/MatrixTextMessageDTO';
import {MatrixRoomId} from '../types/core/MatrixRoomId';
import {MatrixUserId} from '../types/core/MatrixUserId';
import {
  createMatrixSyncResponseDTO,
  MatrixSyncResponseDTO,
} from '../types/response/sync/MatrixSyncResponseDTO';
import {
  buildSyncRoomsDto,
  isRoomMessageEventType,
  messageContentFromDto,
  normalizeMatrixRoomIdParam,
  StoredTimelineEvent,
} from './roomTimeline';
import {
  normalizeRoomDisplayName,
  slugFromRoomName,
} from './roomSlug';

export interface RoomListEntry {
  readonly name: string;
  readonly room_id: string;
  /** BACKEND_PRIVATE_ROOMS — discovered private room (green UI in demo). */
  readonly preconfigured?: boolean;
  /** BACKEND_INITIAL_ROOMS — boot-seeded public room (blue UI in demo). */
  readonly preconfiguredPublic?: boolean;
}

export interface RegisterRoomEntry {
  readonly name: string;
  readonly room_id: MatrixRoomId;
  /** True when a new room was allocated; false when an existing name was reused. */
  readonly created: boolean;
}

export interface RegisterRoomsResult {
  readonly rooms: readonly RegisterRoomEntry[];
}

export interface MatrixServerEventHooks {
  onRoomCreated?: () => void;
  onMessage?: (event: StoredTimelineEvent) => void;
}

const LOG = LogService.createLogger('MatrixServerService');

/**
 * Default expiration time in minutes
 */
const DEFAULT_ACCESS_TOKEN_EXPIRATION_TIME = 300;

export interface CreateRoomResponse {
  readonly roomId: string;
  readonly room: RoomRepositoryItem;
}

export function createCreateRoomResponse(
  roomId: string,
  room: RoomRepositoryItem,
): CreateRoomResponse {
  return {
    roomId,
    room,
  };
}

export interface RegisterAccountResult {
  readonly matrixUserId: string;
  readonly accessToken?: string;
  readonly deviceId: string;
  readonly homeServerUrl: string;
}

export function createRegisterAccountResult(
  matrixUserId: string,
  deviceId: string,
  homeServerUrl: string,
  accessToken?: string,
): RegisterAccountResult {
  return {
    matrixUserId,
    deviceId,
    homeServerUrl,
    accessToken,
  };
}

/**
 * Provides services to implement Matrix HomeServer features.
 *
 * Methods in this service should only provide means to implement features,
 * e.g. not have control itself. Actual control of things must reside in the user
 * side of this service.
 *
 * @see ChatSlayerBackendController
 */
export class MatrixServerService {
  public static setLogLevel(level: LogLevel) {
    LOG.setLogLevel(level);
  }

  private readonly _url: string;
  private readonly _hostname: string;
  private readonly _defaultRoomVersion: MatrixRoomVersion;
  private readonly _jwtEngine: JwtEngine;
  private readonly _accessTokenExpirationTime: number;

  /** In-memory users for dev/demo (ephemeral; reset on restart). */
  private readonly _usersByUsername = new Map<string, User>();
  private readonly _devicesByTokenSubject = new Map<
    string,
    DeviceRepositoryItem
  >();
  private readonly _usersByInternalId = new Map<string, UserRepositoryItem>();
  private _nextUserNumericId = 1;
  private readonly _roomsByMatrixId = new Map<string, RoomRepositoryItem>();
  private readonly _roomNameByNormalizedName = new Map<string, MatrixRoomId>();
  private readonly _roomDisplayNameByRoomId = new Map<MatrixRoomId, string>();
  private _nextRoomNumericId = 1;
  private _eventHooks: MatrixServerEventHooks = {};
  private readonly _roomMembers = new Map<MatrixRoomId, Set<MatrixUserId>>();
  private readonly _timeline: StoredTimelineEvent[] = [];
  private readonly _txnEventIds = new Map<string, string>();
  private _nextStreamPos = 1;
  private _nextEventNumericId = 1;
  private _preconfiguredPublicNames = new Set<string>();
  private _preconfiguredPrivateNames = new Set<string>();
  private readonly _discoveredPreconfiguredByUser = new Map<
    string,
    Set<string>
  >();

  /**
   *
   * @param url
   * @param hostname
   * @param deviceService
   * @param userService
   * @param roomService
   * @param eventService
   * @param jwtEngine
   * @param accessTokenExpirationTime Expiration time in minutes for access tokens
   * @param defaultRoomVersion Defaults to room version 8
   */
  public constructor(
    url: string,
    hostname: string,
    jwtEngine: JwtEngine,
    accessTokenExpirationTime: number = DEFAULT_ACCESS_TOKEN_EXPIRATION_TIME,
    defaultRoomVersion: MatrixRoomVersion = MatrixRoomVersion.V8,
  ) {
    this._url = url;
    this._hostname = hostname;
    this._jwtEngine = jwtEngine;
    this._accessTokenExpirationTime = accessTokenExpirationTime;
    this._defaultRoomVersion = defaultRoomVersion;
  }

  public getHostName(): string {
    return this._hostname;
  }

  public getDefaultRoomVersion(): MatrixRoomVersion {
    return this._defaultRoomVersion;
  }

  public getURL(): string {
    return this._url;
  }

  public setEventHooks(hooks: MatrixServerEventHooks): void {
    this._eventHooks = hooks;
  }

  public setPreconfiguredPublicRoomNames(
    normalizedDisplayNames: ReadonlySet<string>,
  ): void {
    this._preconfiguredPublicNames = new Set(normalizedDisplayNames);
  }

  public setPreconfiguredPrivateRoomNames(
    normalizedDisplayNames: ReadonlySet<string>,
  ): void {
    this._preconfiguredPrivateNames = new Set(normalizedDisplayNames);
  }

  public isPreconfiguredPublicRoomsEnabled(): boolean {
    return this._preconfiguredPublicNames.size > 0;
  }

  public isPreconfiguredPrivateRoomsEnabled(): boolean {
    return this._preconfiguredPrivateNames.size > 0;
  }

  public isPreconfiguredPrivateName(displayName: string): boolean {
    const trimmed = displayName.trim();
    if (!trimmed) {
      return false;
    }
    return this._preconfiguredPrivateNames.has(
      normalizeRoomDisplayName(trimmed),
    );
  }

  private markPreconfiguredDiscovered(
    internalUserId: string,
    normalizedName: string,
  ): void {
    let discovered = this._discoveredPreconfiguredByUser.get(internalUserId);
    if (!discovered) {
      discovered = new Set();
      this._discoveredPreconfiguredByUser.set(internalUserId, discovered);
    }
    discovered.add(normalizedName);
  }

  private isPreconfiguredDiscoveredByUser(
    internalUserId: string,
    normalizedName: string,
  ): boolean {
    return (
      this._discoveredPreconfiguredByUser
        .get(internalUserId)
        ?.has(normalizedName) ?? false
    );
  }

  /**
   * Unscoped room list (tests/admin). Never includes hidden preconfigured private rooms.
   */
  public listRooms(): readonly RoomListEntry[] {
    const entries: RoomListEntry[] = [];
    for (const [roomId, displayName] of this._roomDisplayNameByRoomId) {
      const normalized = normalizeRoomDisplayName(displayName);
      if (this._preconfiguredPrivateNames.has(normalized)) {
        continue;
      }
      entries.push({name: displayName, room_id: roomId});
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    return entries;
  }

  public listRoomsForUser(internalUserId: string): readonly RoomListEntry[] {
    const entries: RoomListEntry[] = [];
    for (const [roomId, displayName] of this._roomDisplayNameByRoomId) {
      const normalized = normalizeRoomDisplayName(displayName);
      const isPrivatePreconfigured =
        this._preconfiguredPrivateNames.has(normalized);
      const isPublicPreconfigured =
        this._preconfiguredPublicNames.has(normalized);
      if (
        isPrivatePreconfigured &&
        !this.isPreconfiguredDiscoveredByUser(internalUserId, normalized)
      ) {
        continue;
      }
      entries.push({
        name: displayName,
        room_id: roomId,
        ...(isPrivatePreconfigured ? {preconfigured: true} : {}),
        ...(isPublicPreconfigured ? {preconfiguredPublic: true} : {}),
      });
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    return entries;
  }

  /**
   * Ensures a preconfigured private room exists and marks it discovered for the caller.
   */
  public discoverPreconfiguredPrivateRoom(
    userId: string,
    deviceId: string,
    displayName: string,
  ): RegisterRoomEntry {
    const trimmed = displayName.trim();
    if (!trimmed) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        'Room name is required',
        400,
      );
    }
    const normalized = normalizeRoomDisplayName(trimmed);
    if (!this._preconfiguredPrivateNames.has(normalized)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        'Unknown room name',
        404,
      );
    }
    const entry = this.ensureRoom(
      userId,
      deviceId,
      this._defaultRoomVersion,
      MatrixVisibility.PRIVATE,
      trimmed,
    );
    if (entry.created) {
      this._eventHooks.onRoomCreated?.();
    }
    return entry;
  }

  private normalizedDisplayNameForRoomId(
    roomId: MatrixRoomId,
  ): string | undefined {
    const displayName = this._roomDisplayNameByRoomId.get(roomId);
    if (!displayName) {
      return undefined;
    }
    return normalizeRoomDisplayName(displayName);
  }

  private isPreconfiguredPrivateRoomId(roomId: MatrixRoomId): boolean {
    const normalized = this.normalizedDisplayNameForRoomId(roomId);
    return (
      normalized !== undefined &&
      this._preconfiguredPrivateNames.has(normalized)
    );
  }

  /**
   * Preconfigured rooms require the user to have submitted the matching name first.
   * Uses a generic not-found response so room ids cannot be probed.
   */
  public assertUserCanAccessRoom(
    internalUserId: string,
    roomId: MatrixRoomId,
  ): void {
    if (!this.isPreconfiguredPrivateRoomId(roomId)) {
      return;
    }
    const normalized = this.normalizedDisplayNameForRoomId(roomId);
    if (
      !normalized ||
      !this.isPreconfiguredDiscoveredByUser(internalUserId, normalized)
    ) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        'Room not found',
        404,
      );
    }
  }

  public findRoomIdByDisplayName(displayName: string): MatrixRoomId | undefined {
    const trimmed = displayName.trim();
    if (!trimmed) {
      return undefined;
    }
    return this._roomNameByNormalizedName.get(normalizeRoomDisplayName(trimmed));
  }

  /**
   * Resolves a display name only when the viewer has discovered that preconfigured room.
   */
  public findRoomIdByDisplayNameForUser(
    internalUserId: string,
    displayName: string,
  ): MatrixRoomId | undefined {
    const trimmed = displayName.trim();
    if (!trimmed) {
      return undefined;
    }
    const normalized = normalizeRoomDisplayName(trimmed);
    const roomId = this._roomNameByNormalizedName.get(normalized);
    if (!roomId) {
      return undefined;
    }
    if (
      this._preconfiguredPrivateNames.has(normalized) &&
      !this.isPreconfiguredDiscoveredByUser(internalUserId, normalized)
    ) {
      return undefined;
    }
    return roomId;
  }

  /**
   * Ensures a uniquely named room exists and the caller is a member.
   * Reuses an existing room when the display name is already registered.
   */
  public ensureRoom(
    userId: string,
    deviceId: string,
    roomVersion: MatrixRoomVersion,
    visibility: MatrixVisibility,
    displayName: string,
  ): RegisterRoomEntry {
    const trimmed = displayName.trim();
    if (!trimmed) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        'Room name is required',
        400,
      );
    }

    const normalized = normalizeRoomDisplayName(trimmed);
    const isPrivatePreconfigured =
      this._preconfiguredPrivateNames.has(normalized);
    const isPublicPreconfigured =
      this._preconfiguredPublicNames.has(normalized);
    let effectiveVisibility = visibility;
    if (isPrivatePreconfigured) {
      effectiveVisibility = MatrixVisibility.PRIVATE;
      this.markPreconfiguredDiscovered(userId, normalized);
    } else if (isPublicPreconfigured) {
      effectiveVisibility = MatrixVisibility.PUBLIC;
    }

    const existing = this.findRoomIdByDisplayName(trimmed);
    if (existing) {
      this.ensureCreatorJoined(userId, existing);
      return {
        name: this._roomDisplayNameByRoomId.get(existing) ?? trimmed,
        room_id: existing,
        created: false,
      };
    }

    const {roomId} = this.allocateNamedRoom(
      userId,
      deviceId,
      roomVersion,
      effectiveVisibility,
      trimmed,
    );
    return {name: trimmed, room_id: roomId, created: true};
  }

  /**
   * Idempotently register many uniquely named rooms. Names already in use are
   * returned as-is; empty strings are skipped. Fires {@link onRoomCreated} once
   * if at least one new room was created.
   */
  public registerRooms(
    userId: string,
    deviceId: string,
    roomVersion: MatrixRoomVersion,
    visibility: MatrixVisibility,
    displayNames: readonly string[],
  ): RegisterRoomsResult {
    const seenNormalized = new Set<string>();
    const rooms: RegisterRoomEntry[] = [];
    let anyCreated = false;

    for (const raw of displayNames) {
      const trimmed = raw.trim();
      if (!trimmed) {
        continue;
      }
      const normalized = normalizeRoomDisplayName(trimmed);
      if (seenNormalized.has(normalized)) {
        const prior = rooms.find(
          (entry) =>
            normalizeRoomDisplayName(entry.name) === normalized,
        );
        if (prior) {
          rooms.push({
            name: trimmed,
            room_id: prior.room_id,
            created: false,
          });
        }
        continue;
      }
      seenNormalized.add(normalized);

      const entry = this.ensureRoom(
        userId,
        deviceId,
        roomVersion,
        visibility,
        trimmed,
      );
      if (entry.created) {
        anyCreated = true;
      }
      rooms.push(entry);
    }

    if (anyCreated) {
      this._eventHooks.onRoomCreated?.();
    }

    return {rooms};
  }

  private ensureCreatorJoined(
    userId: string,
    roomId: MatrixRoomId,
  ): void {
    const matrixUserId = this.resolveMatrixUserId(userId);
    if (matrixUserId) {
      this.addRoomMember(roomId, matrixUserId);
    }
  }

  private allocateNamedRoom(
    userId: string,
    deviceId: string,
    roomVersion: MatrixRoomVersion,
    visibility: MatrixVisibility,
    trimmedName: string,
  ): CreateRoomResponse {
    LOG.debug(
      `User ${userId} from device ${deviceId} is creating a room with visibility ${visibility} and version ${roomVersion}`,
    );

    const normalizedName = normalizeRoomDisplayName(trimmedName);
    let localPart: string;
    try {
      localPart = slugFromRoomName(trimmedName);
    } catch (err) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        err instanceof Error ? err.message : 'Invalid room name',
        400,
      );
    }

    let roomId = MatrixUtils.getRoomId(localPart, this._hostname);
    let suffix = 2;
    while (this._roomsByMatrixId.has(roomId)) {
      localPart = `${slugFromRoomName(trimmedName)}-${suffix}`;
      roomId = MatrixUtils.getRoomId(localPart, this._hostname);
      suffix += 1;
    }

    this._roomNameByNormalizedName.set(normalizedName, roomId);
    this._roomDisplayNameByRoomId.set(roomId, trimmedName);

    const roomItem = createRoomRepositoryItem(
      localPart,
      createRoom(localPart, roomVersion, visibility),
    );
    this._roomsByMatrixId.set(roomId, roomItem);
    this.ensureCreatorJoined(userId, roomId);
    this.enableRoomEncryption(roomId, userId);
    LOG.info(
      `User ${userId} created room ${roomId} (visibility ${visibility}, version ${roomVersion})`,
    );
    return createCreateRoomResponse(roomId, roomItem);
  }

  public isRoomMember(roomId: MatrixRoomId, matrixUserId: MatrixUserId): boolean {
    return this._roomMembers.get(roomId)?.has(matrixUserId) ?? false;
  }

  public getTimelineEventsForUser(
    matrixUserId: MatrixUserId,
    sinceStreamPos: number,
  ): readonly StoredTimelineEvent[] {
    const result: StoredTimelineEvent[] = [];
    for (const event of this._timeline) {
      if (event.streamPos <= sinceStreamPos) {
        continue;
      }
      if (this._roomMembers.get(event.roomId)?.has(matrixUserId)) {
        result.push(event);
      }
    }
    return result;
  }

  public getLatestStreamPos(): number {
    return this._nextStreamPos - 1;
  }

  /**
   * Called once after every member has been initialized
   */
  public async initialize(): Promise<void> {}

  /**
   *
   * @param username
   * @param password
   * @param email
   */
  public async createUser(
    username: string,
    password: string,
    email?: string,
  ): Promise<User> {
    const localpart = normalizeMatrixUsername(username);
    if (this._usersByUsername.has(localpart)) {
      throw new TypeError(
        `MatrixServerService.createUser: User already exists: ${localpart}`,
      );
    }
    const id = `u${this._nextUserNumericId}`;
    this._nextUserNumericId += 1;
    const user = createUser(id, localpart, password, email);
    this._usersByUsername.set(localpart, user);
    return user;
  }

  /**
   * Get a nonce for registration
   *
   * @TODO
   */
  public async createAdminRegisterNonce(): Promise<string> {
    return 'nonce';
  }

  /**
   *
   * @param username
   * @param password
   * @param deviceId This is the optional device ID provided by the client
   */
  public async loginWithPassword(
    username: string,
    password: string,
    deviceId?: string | undefined,
  ): Promise<string | undefined> {
    if (!username) {
      LOG.debug('loginWithPassword: Username is required');
      return undefined;
    }

    if (!password) {
      LOG.debug(
        `loginWithPassword: Password is required for user "${username}"`,
      );
      return undefined;
    }

    LOG.debug('_accessTokenExpirationTime : ', this._accessTokenExpirationTime);
    LOG.debug('deviceId : ', deviceId);

    const user = this._usersByUsername.get(normalizeMatrixUsername(username));
    if (!user) {
      LOG.debug(`loginWithPassword: User not found: "${username}"`);
      return undefined;
    }
    if (password !== user.password) {
      LOG.debug(`loginWithPassword: Password mismatch for: "${username}"`);
      return undefined;
    }

    const tokenSubject = deviceId?.trim() || `dev-${user.id}`;
    this._bindDeviceSession(user, tokenSubject, deviceId?.trim());
    LOG.debug(
      `Login successful for user "${username}", token subject "${tokenSubject}"`,
    );
    return this._jwtEngine.sign(
      JwtUtils.createSubPayloadExpiringInMinutes(
        tokenSubject,
        this._accessTokenExpirationTime,
      ),
    );
  }

  /**
   * Register a new account after UIA is complete.
   */
  public async registerAccount(
    username: string | undefined,
    password: string | undefined,
    deviceId?: string | undefined,
    inhibitLogin?: boolean,
  ): Promise<RegisterAccountResult> {
    const localpart = assertValidMatrixUsername(username);
    const passwordValue = assertValidMatrixPassword(password);

    let user: User;
    try {
      user = await this.createUser(localpart, passwordValue);
    } catch (err) {
      if (
        err instanceof TypeError &&
        String(err.message).includes('already exists')
      ) {
        throw new MatrixRegistrationError(
          MatrixErrorCode.M_USER_IN_USE,
          'User ID already taken.',
          409,
        );
      }
      throw err;
    }

    const tokenSubject = deviceId?.trim() || `dev-${user.id}`;
    this._bindDeviceSession(user, tokenSubject, deviceId?.trim());

    const matrixUserId = MatrixUtils.getUserId(localpart, this._hostname);
    const homeServerUrl = this._url;

    if (inhibitLogin) {
      return createRegisterAccountResult(
        matrixUserId,
        tokenSubject,
        homeServerUrl,
      );
    }

    const accessToken = this._jwtEngine.sign(
      JwtUtils.createSubPayloadExpiringInMinutes(
        tokenSubject,
        this._accessTokenExpirationTime,
      ),
    );

    return createRegisterAccountResult(
      matrixUserId,
      tokenSubject,
      homeServerUrl,
      accessToken,
    );
  }

  private _bindDeviceSession(
    user: User,
    tokenSubject: string,
    clientDeviceId?: string,
  ): DeviceRepositoryItem {
    const device = createDevice(tokenSubject, user.id, clientDeviceId);
    const deviceItem = createDeviceRepositoryItem(tokenSubject, device);
    this._devicesByTokenSubject.set(tokenSubject, deviceItem);
    this._usersByInternalId.set(
      user.id,
      createUserRepositoryItem(user.id, user, user.username, user.email),
    );
    return deviceItem;
  }

  /**
   * Verifies access token and returns the device it belongs to.
   *
   * @param accessToken
   * @returns string The device id if access token is valid
   */
  public async verifyAccessToken(
    accessToken: string,
  ): Promise<string | undefined> {
    const deviceId: string =
      JwtDecodeServiceImpl.decodePayloadSubject(accessToken);
    LOG.debug('verifyAccessToken: deviceId = ', deviceId);
    if (!this._jwtEngine.verify(accessToken)) {
      LOG.warn(
        'verifyAccessToken: Token verification failed: ',
        deviceId,
        accessToken,
      );
      return undefined;
    }
    return deviceId;
  }

  /**
   * Returns the device record by internal ID
   *
   * @param deviceId
   */
  public async findDeviceById(
    deviceId: string,
  ): Promise<DeviceRepositoryItem | undefined> {
    LOG.debug('findDeviceById: deviceId = ', deviceId);
    return this._devicesByTokenSubject.get(deviceId);
  }

  /**
   * Returns the user record by internal ID
   *
   * @param userId
   */
  public async findUserById(
    userId: string,
  ): Promise<UserRepositoryItem | undefined> {
    LOG.debug('findUserById: userId = ', userId);
    return this._usersByInternalId.get(userId);
  }

  /**
   * Create a room
   *
   * @param userId
   * @param deviceId
   * @param roomVersion
   * @param visibility
   */
  public async createRoom(
    userId: string,
    deviceId: string,
    roomVersion: MatrixRoomVersion,
    visibility: MatrixVisibility,
    displayName?: string,
  ): Promise<CreateRoomResponse> {
    const trimmedName = displayName?.trim();

    if (trimmedName) {
      const normalizedName = normalizeRoomDisplayName(trimmedName);
      const isPrivatePreconfigured =
        this._preconfiguredPrivateNames.has(normalizedName);
      const isPublicPreconfigured =
        this._preconfiguredPublicNames.has(normalizedName);
      if (isPrivatePreconfigured || isPublicPreconfigured) {
        if (isPrivatePreconfigured) {
          this.markPreconfiguredDiscovered(userId, normalizedName);
        }
        const preconfiguredVisibility = isPrivatePreconfigured
          ? MatrixVisibility.PRIVATE
          : MatrixVisibility.PUBLIC;
        const existing = this._roomNameByNormalizedName.get(normalizedName);
        if (existing) {
          this.ensureCreatorJoined(userId, existing);
          const roomItem = this._roomsByMatrixId.get(existing);
          if (!roomItem) {
            throw new MatrixRegistrationError(
              MatrixErrorCode.M_UNKNOWN,
              'Room not found',
              404,
            );
          }
          return createCreateRoomResponse(existing, roomItem);
        }
        const result = this.allocateNamedRoom(
          userId,
          deviceId,
          roomVersion,
          preconfiguredVisibility,
          trimmedName,
        );
        this.enableRoomEncryption(result.roomId, userId);
        this._eventHooks.onRoomCreated?.();
        return result;
      }
      if (this._roomNameByNormalizedName.has(normalizedName)) {
        throw new MatrixRegistrationError(
          MatrixErrorCode.M_UNKNOWN,
          'Room name already in use',
          409,
        );
      }
      const result = this.allocateNamedRoom(
        userId,
        deviceId,
        roomVersion,
        visibility,
        trimmedName,
      );
      this.enableRoomEncryption(result.roomId, userId);
      this._eventHooks.onRoomCreated?.();
      return result;
    }

    LOG.debug(
      `User ${userId} from device ${deviceId} is creating a room with visibility ${visibility} and version ${roomVersion}`,
    );
    const localPart = `r${this._nextRoomNumericId}`;
    this._nextRoomNumericId += 1;
    const roomId = MatrixUtils.getRoomId(localPart, this._hostname);
    this._roomDisplayNameByRoomId.set(roomId, localPart);

    const roomItem = createRoomRepositoryItem(
      localPart,
      createRoom(localPart, roomVersion, visibility),
    );
    this._roomsByMatrixId.set(roomId, roomItem);
    this.ensureCreatorJoined(userId, roomId);
    this.enableRoomEncryption(roomId, userId);
    LOG.info(
      `User ${userId} created room ${roomId} (visibility ${visibility}, version ${roomVersion})`,
    );
    this._eventHooks.onRoomCreated?.();
    return createCreateRoomResponse(roomId, roomItem);
  }

  private enableRoomEncryption(roomId: MatrixRoomId, internalUserId: string): void {
    getMatrixCryptoStore().markRoomEncrypted(roomId);
    const matrixUserId = this.resolveMatrixUserId(internalUserId);
    if (!matrixUserId) {
      return;
    }
    void this.createRoomStateEvent(
      matrixUserId,
      roomId,
      {algorithm: 'm.megolm.v1.aes-sha2'},
      'm.room.encryption',
      '',
    );
  }

  public resolveMatrixUserIdFromAccessToken(accessToken: string): MatrixUserId {
    const deviceSubject = JwtDecodeServiceImpl.decodePayloadSubject(accessToken);
    if (!deviceSubject || !this._jwtEngine.verify(accessToken)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
        401,
      );
    }
    const device = this._devicesByTokenSubject.get(deviceSubject);
    const internalUserId = device?.userId;
    if (!internalUserId) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
        401,
      );
    }
    const matrixUserId = this.resolveMatrixUserId(internalUserId);
    if (!matrixUserId) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
        401,
      );
    }
    return matrixUserId;
  }

  public listRoomMemberMatrixIds(roomId: MatrixRoomId): readonly MatrixUserId[] {
    const members = this._roomMembers.get(roomId);
    return members ? [...members] : [];
  }

  public resolveMatrixUserId(internalUserId: string): MatrixUserId | undefined {
    const userItem = this._usersByInternalId.get(internalUserId);
    if (!userItem) {
      return undefined;
    }
    return MatrixUtils.getUserId(userItem.username, this._hostname);
  }

  public normalizeRoomId(roomId: string): MatrixRoomId {
    return normalizeMatrixRoomIdParam(roomId, this._hostname);
  }

  public findRoomByMatrixId(roomId: string): RoomRepositoryItem | undefined {
    const normalized = this.normalizeRoomId(roomId);
    return (
      this._roomsByMatrixId.get(normalized) ??
      this._roomsByMatrixId.get(roomId)
    );
  }

  public addRoomMember(roomId: MatrixRoomId, matrixUserId: MatrixUserId): void {
    let members = this._roomMembers.get(roomId);
    if (!members) {
      members = new Set();
      this._roomMembers.set(roomId, members);
    }
    members.add(matrixUserId);
  }

  public joinRoom(internalUserId: string, roomId: string): MatrixRoomId {
    const normalized = this.normalizeRoomId(roomId);
    if (!this.findRoomByMatrixId(normalized)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        'Room not found',
        404,
      );
    }
    this.assertUserCanAccessRoom(internalUserId, normalized);
    const matrixUserId = this.resolveMatrixUserId(internalUserId);
    if (!matrixUserId) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
        401,
      );
    }
    this.addRoomMember(normalized, matrixUserId);
    return normalized;
  }

  public sendRoomMessage(
    internalUserId: string,
    roomId: string,
    eventName: string,
    txnId: string,
    body: MatrixTextMessageDTO,
  ): string {
    if (!isRoomMessageEventType(eventName)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        `Unsupported event type: ${eventName}`,
        400,
      );
    }
    const normalized = this.normalizeRoomId(roomId);
    if (!this.findRoomByMatrixId(normalized)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        'Room not found',
        404,
      );
    }
    this.assertUserCanAccessRoom(internalUserId, normalized);
    const matrixUserId = this.resolveMatrixUserId(internalUserId);
    if (!matrixUserId) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
        401,
      );
    }
    const members = this._roomMembers.get(normalized);
    if (!members?.has(matrixUserId)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_FORBIDDEN,
        'You are not in this room',
        403,
      );
    }
    const txnKey = `${normalized}\0${txnId}`;
    const existing = this._txnEventIds.get(txnKey);
    if (existing) {
      return existing;
    }
    const streamPos = this._nextStreamPos;
    this._nextStreamPos += 1;
    const eventNumericId = this._nextEventNumericId;
    this._nextEventNumericId += 1;
    const eventId = `$${eventNumericId}`;
    const stored: StoredTimelineEvent = {
      streamPos,
      eventId,
      roomId: normalized,
      sender: matrixUserId,
      type: MatrixType.M_ROOM_MESSAGE,
      content: messageContentFromDto(body),
      originServerTs: this.getCurrentTimestamp(),
    };
    this._timeline.push(stored);
    this._txnEventIds.set(txnKey, eventId);
    const encrypted =
      typeof body.body === 'string' &&
      body.body.length > 0 &&
      (body as {msgtype?: string}).msgtype !== 'm.encrypted' &&
      !(body as {algorithm?: string}).algorithm;
    LOG.info(
      `Message ${eventId} in ${normalized} from ${matrixUserId}${encrypted ? '' : ' [e2ee]'}`,
    );
    this._eventHooks.onMessage?.(stored);
    return eventId;
  }

  public sendRoomEvent(
    internalUserId: string,
    roomId: string,
    eventType: string,
    txnId: string,
    content: ReadonlyJsonObject,
  ): string {
    if (!isRoomMessageEventType(eventType)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        `Unsupported event type: ${eventType}`,
        400,
      );
    }
    const normalized = this.normalizeRoomId(roomId);
    if (!this.findRoomByMatrixId(normalized)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN,
        'Room not found',
        404,
      );
    }
    const matrixUserId = this.resolveMatrixUserId(internalUserId);
    if (!matrixUserId) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
        401,
      );
    }
    const members = this._roomMembers.get(normalized);
    if (!members?.has(matrixUserId)) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_FORBIDDEN,
        'You are not in this room',
        403,
      );
    }
    const txnKey = `${normalized}\0${txnId}`;
    const existing = this._txnEventIds.get(txnKey);
    if (existing) {
      return existing;
    }
    const streamPos = this._nextStreamPos;
    this._nextStreamPos += 1;
    const eventNumericId = this._nextEventNumericId;
    this._nextEventNumericId += 1;
    const eventId = `$${eventNumericId}`;
    const stored: StoredTimelineEvent = {
      streamPos,
      eventId,
      roomId: normalized,
      sender: matrixUserId,
      type: eventType,
      content,
      originServerTs: this.getCurrentTimestamp(),
    };
    this._timeline.push(stored);
    this._txnEventIds.set(txnKey, eventId);
    LOG.info(`Message ${eventId} in ${normalized} from ${matrixUserId} [e2ee]`);
    this._eventHooks.onMessage?.(stored);
    return eventId;
  }

  public buildSync(
    internalUserId: string,
    since: string,
  ): MatrixSyncResponseDTO {
    const matrixUserId = this.resolveMatrixUserId(internalUserId);
    if (!matrixUserId) {
      throw new MatrixRegistrationError(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
        401,
      );
    }
    const sincePos = since ? Number.parseInt(since, 10) : 0;
    const fromPos = Number.isFinite(sincePos) && sincePos >= 0 ? sincePos : 0;
    let maxPos = fromPos;
    const byRoom = new Map<MatrixRoomId, StoredTimelineEvent[]>();

    for (const event of this._timeline) {
      if (event.streamPos <= fromPos) {
        continue;
      }
      const members = this._roomMembers.get(event.roomId);
      if (!members?.has(matrixUserId)) {
        continue;
      }
      let list = byRoom.get(event.roomId);
      if (!list) {
        list = [];
        byRoom.set(event.roomId, list);
      }
      list.push(event);
      if (event.streamPos > maxPos) {
        maxPos = event.streamPos;
      }
    }

    const rooms = buildSyncRoomsDto(byRoom);
    const nextBatch = String(maxPos > fromPos ? maxPos : fromPos);
    const toDeviceEvents = getMatrixCryptoStore()
      .drainToDeviceEvents(matrixUserId)
      .map((event) => ({
        type: event.type as MatrixType,
        sender: event.sender as MatrixUserId,
        content: event.content as JsonObject,
      }));
    const to_device =
      toDeviceEvents.length > 0 ? {events: toDeviceEvents} : undefined;
    return createMatrixSyncResponseDTO(nextBatch, rooms, undefined, undefined, to_device);
  }

  /**
   * Create room state event
   */
  public async createRoomStateEvent(
    senderId: string,
    roomId: string,
    content: ReadonlyJsonObject,
    type: MatrixType | string,
    stateKey: string,
    originServerTs: number = this.getCurrentTimestamp(),
  ): Promise<EventRepositoryItem> {
    LOG.debug('stateKey = ', stateKey);
    return createEventRepositoryItem(
      'undefined',
      createEventEntity(
        'undefined',
        type,
        content,
        originServerTs,
        senderId,
        roomId,
      ),
    );
    // return await this._eventService.createEvent(
    //     createEventRepositoryItem(
    //         REPOSITORY_NEW_IDENTIFIER,
    //         createRoomStateEventEntity(
    //             REPOSITORY_NEW_IDENTIFIER,
    //             type,
    //             content,
    //             originServerTs,
    //             senderId,
    //             roomId,
    //             stateKey
    //         )
    //     )
    // );
  }

  /**
   * Creates `m.room.create` event.
   *
   */
  public async createRoomCreateEvent(
    senderId: string,
    roomId: string,
    roomVersion: MatrixRoomVersion = MatrixRoomVersion.V1,
    creatorId: string = senderId,
    extraContent: Partial<MatrixRoomCreateEventDTO> | undefined = undefined,
    originServerTs: number = this.getCurrentTimestamp(),
  ): Promise<EventRepositoryItem> {
    const content: ReadonlyJsonObject = {
      ...((extraContent ?? {}) as ReadonlyJsonObject),
      creator: creatorId,
      room_version: roomVersion,
    };
    return await this.createRoomStateEvent(
      senderId,
      roomId,
      content,
      MatrixType.M_ROOM_CREATE,
      '',
      originServerTs,
    );
  }

  /**
   * Creates `m.room.member` event
   *
   */
  public async createRoomMemberEvent(
    senderId: string,
    roomId: string,
    membership: RoomMembershipState,
    reason?: string | undefined,
    userId: string = senderId,
    avatar_url?: string | undefined,
    displayname?: string | null | undefined,
    is_direct?: boolean | undefined,
    join_authorised_via_users_server?: string | undefined,
    third_party_invite?: RoomMemberContent3rdPartyInviteDTO,
    originServerTs: number = this.getCurrentTimestamp(),
  ): Promise<EventRepositoryItem> {
    const content = createRoomMemberContentDTO(
      membership,
      reason,
      avatar_url,
      displayname,
      is_direct,
      join_authorised_via_users_server,
      third_party_invite,
    );
    return await this.createRoomStateEvent(
      senderId,
      roomId,
      content,
      MatrixType.M_ROOM_MEMBER,
      userId,
      originServerTs,
    );
  }

  public getCurrentTimestamp(): number {
    return new Date().getTime();
  }
}
