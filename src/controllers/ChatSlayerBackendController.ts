import type {ReadonlyJsonObject} from '../fi/cs/core/Json';
import {JwtDecodeServiceImpl} from '../fi/cs/backend/JwtDecodeServiceImpl';
import {LogService} from '../fi/cs/core/LogService';
import {GetMapping} from '../fi/cs/core/request/GetMapping';
import {PathVariable} from '../fi/cs/core/request/PathVariable';
import {PostMapping} from '../fi/cs/core/request/PostMapping';
import {PutMapping} from '../fi/cs/core/request/PutMapping';
import {RequestBody} from '../fi/cs/core/request/RequestBody';
import {RequestHeader} from '../fi/cs/core/request/RequestHeader';
import {RequestMapping} from '../fi/cs/core/request/RequestMapping';
import {RequestParam} from '../fi/cs/core/request/RequestParam';
import {ResponseEntity} from '../fi/cs/core/request/types/ResponseEntity';
import {MATRIX_AUTHORIZATION_HEADER_NAME} from '../fi/cs/matrix/constants/matrix-routes';
import {RequestParamValueType} from '../fi/cs/core/request/types/RequestParamValueType';
import {parseMatrixRegisterKind} from '../fi/cs/matrix/types/request/register/types/MatrixRegisterKind';
import {createSynapsePreRegisterResponseDTO} from '../fi/cs/matrix/types/synapse/SynapsePreRegisterResponseDTO';
import {isSynapseRegisterRequestDTO} from '../fi/cs/matrix/types/synapse/SynapseRegisterRequestDTO';
import {
  createSynapseRegisterResponseDTO,
  SynapseRegisterResponseDTO,
} from '../fi/cs/matrix/types/synapse/SynapseRegisterResponseDTO';
import {createMatrixWhoAmIResponseDTO} from '../fi/cs/matrix/types/response/whoami/MatrixWhoAmIResponseDTO';
import {isMatrixLoginRequestDTO} from '../fi/cs/matrix/types/request/login/MatrixLoginRequestDTO';
import {
  createMatrixLoginResponseDTO,
  MatrixLoginResponseDTO,
} from '../fi/cs/matrix/types/response/login/MatrixLoginResponseDTO';
import {createMatrixDiscoveryInformationDTO} from '../fi/cs/matrix/types/response/login/types/MatrixDiscoveryInformationDTO';
import {createMatrixHomeServerDTO} from '../fi/cs/matrix/types/response/login/types/MatrixHomeServerDTO';
import {createMatrixIdentityServerInformationDTO} from '../fi/cs/matrix/types/response/login/types/MatrixIdentityServerInformationDTO';
import {
  createGetDirectoryRoomAliasResponseDTO,
  GetDirectoryRoomAliasResponseDTO,
} from '../fi/cs/matrix/types/response/directoryRoomAlias/GetDirectoryRoomAliasResponseDTO';
import {
  createMatrixRoomJoinedMembersDTO,
  MatrixRoomJoinedMembersDTO,
} from '../fi/cs/matrix/types/response/roomJoinedMembers/MatrixRoomJoinedMembersDTO';
import {createMatrixRoomJoinedMembersRoomMemberDTO} from '../fi/cs/matrix/types/response/roomJoinedMembers/types/MatrixRoomJoinedMembersRoomMemberDTO';
import {
  parseMatrixMatrixRegisterRequestDTO,
  type MatrixRegisterRequestDTO,
} from '../fi/cs/matrix/types/request/register/MatrixRegisterRequestDTO';
import {createMatrixRegisterResponseDTO} from '../fi/cs/matrix/types/response/register/MatrixRegisterResponseDTO';
import {createGetRoomStateByTypeResponseDTO} from '../fi/cs/matrix/types/response/getRoomStateByType/GetRoomStateByTypeResponseDTO';
import {isSetRoomStateByTypeRequestDTO} from '../fi/cs/matrix/types/request/setRoomStateByType/SetRoomStateByTypeRequestDTO';
import {
  createPutRoomStateWithEventTypeResponseDTO,
  PutRoomStateWithEventTypeResponseDTO,
} from '../fi/cs/matrix/types/response/setRoomStateByType/PutRoomStateWithEventTypeResponseDTO';
import {isMatrixLeaveRoomRequestDTO} from '../fi/cs/matrix/types/request/leaveRoom/MatrixLeaveRoomRequestDTO';
import {createMatrixLeaveRoomResponseDTO} from '../fi/cs/matrix/types/response/leaveRoom/MatrixLeaveRoomResponseDTO';
import {isMatrixInviteToRoomRequestDTO} from '../fi/cs/matrix/types/request/inviteToRoom/MatrixInviteToRoomRequestDTO';
import {createMatrixInviteToRoomResponseDTO} from '../fi/cs/matrix/types/response/inviteToRoom/MatrixInviteToRoomResponseDTO';
import {isMatrixTextMessageDTO} from '../fi/cs/matrix/types/message/textMessage/MatrixTextMessageDTO';
import {createSendEventToRoomWithTnxIdResponseDTO} from '../fi/cs/matrix/types/response/sendEventToRoomWithTnxId/SendEventToRoomWithTnxIdResponseDTO';
import {
  explainMatrixCreateRoomDTO,
  isMatrixCreateRoomDTO,
  MatrixCreateRoomDTO,
} from '../fi/cs/matrix/types/request/createRoom/MatrixCreateRoomDTO';
import {
  createMatrixCreateRoomResponseDTO,
  MatrixCreateRoomResponseDTO,
} from '../fi/cs/matrix/types/response/createRoom/MatrixCreateRoomResponseDTO';
import {
  explainMatrixRegisterRoomsRequestDTO,
  isMatrixRegisterRoomsRequestDTO,
  MatrixRegisterRoomsRequestDTO,
} from '../fi/cs/matrix/types/request/registerRooms/MatrixRegisterRoomsRequestDTO';
import {
  createMatrixRegisterRoomResultDTO,
  createMatrixRegisterRoomsResponseDTO,
  MatrixRegisterRoomsResponseDTO,
} from '../fi/cs/matrix/types/response/registerRooms/MatrixRegisterRoomsResponseDTO';
import {isMatrixJoinRoomRequestDTO} from '../fi/cs/matrix/types/request/joinRoom/MatrixJoinRoomRequestDTO';
import {createMatrixJoinRoomResponseDTO} from '../fi/cs/matrix/types/response/joinRoom/MatrixJoinRoomResponseDTO';
import {
  createMatrixSyncResponseDTO,
  MatrixSyncResponseDTO,
} from '../fi/cs/matrix/types/response/sync/MatrixSyncResponseDTO';
import {buildRoomMessagesResponse} from '../fi/cs/matrix/server/roomTimeline';
import {BACKEND_ROOM_HISTORY_LIMIT} from '../constants/runtime';
import {clampRoomHistoryLimit} from '../config/roomHistory';
import {MatrixServerService} from '../fi/cs/matrix/server/MatrixServerService';
import {
  MATRIX_LOGIN_DUMMY,
  RegistrationUiaService,
} from '../fi/cs/matrix/server/RegistrationUiaService';
import {MatrixRegistrationError} from '../fi/cs/matrix/MatrixRegistrationError';
import {MatrixRegisterKind} from '../fi/cs/matrix/types/request/register/types/MatrixRegisterKind';
import {getMatrixCryptoStore} from '../fi/cs/matrix/crypto/MatrixCryptoStore';
import {MatrixLoginType} from '../fi/cs/matrix/types/request/login/MatrixLoginType';
import {
  createMatrixErrorDTO,
  isMatrixErrorDTO,
  MatrixErrorDTO,
} from '../fi/cs/matrix/types/response/error/MatrixErrorDTO';
import {MatrixErrorCode} from '../fi/cs/matrix/types/response/error/types/MatrixErrorCode';
import {MatrixType} from '../fi/cs/matrix/types/core/MatrixType';
import {AuthorizationUtils} from '../fi/cs/core/AuthorizationUtils';
import {LogLevel} from '../fi/cs/core/types/LogLevel';
import {MatrixUtils} from '../fi/cs/matrix/MatrixUtils';
import {UserRepositoryItem} from '../fi/cs/matrix/server/types/repository/user/UserRepositoryItem';
import {DeviceRepositoryItem} from '../fi/cs/matrix/server/types/repository/device/DeviceRepositoryItem';
import {MatrixRoomId} from '../fi/cs/matrix/types/core/MatrixRoomId';
import {parseMatrixRoomVersion} from '../fi/cs/matrix/types/MatrixRoomVersion';
import {
  MatrixVisibility,
  parseMatrixVisibility,
} from '../fi/cs/matrix/types/request/createRoom/types/MatrixVisibility';
import {MatrixRoomCreateEventDTO} from '../fi/cs/matrix/types/event/roomCreate/MatrixRoomCreateEventDTO';
import {MatrixStateEvent} from '../fi/cs/matrix/types/core/MatrixStateEvent';
import {MatrixCreateRoomPreset} from '../fi/cs/matrix/types/request/createRoom/types/MatrixCreateRoomPreset';
import {RoomMembershipState} from '../fi/cs/matrix/types/event/roomMember/RoomMembershipState';

const LOG = LogService.createLogger('ChatSlayerBackendController');

export interface WhoAmIResult {
  readonly accessToken: string;
  readonly userId: string;
  readonly deviceId: string;
  readonly device: DeviceRepositoryItem;
}

/**
 * Client facing REST backend controller
 */
@RequestMapping('/')
export class ChatSlayerBackendController {
  private static _matrixServer: MatrixServerService | undefined;
  private static _registrationUia = new RegistrationUiaService();

  public static setLogLevel(level: LogLevel) {
    LOG.setLogLevel(level);
  }

  public static setMatrixServer(value: MatrixServerService) {
    this._matrixServer = value;
  }

  public static setRegistrationUiaService(value: RegistrationUiaService) {
    this._registrationUia = value;
  }

  private static getMatrixServer(): MatrixServerService {
    const svc = this._matrixServer;
    if (!svc) {
      throw new Error('MatrixServerService not initialized');
    }
    return svc;
  }

  /**
   * @param accessHeader
   */
  @GetMapping('/_synapse/admin/v1/register')
  public static async getSynapseAdminRegister(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    _accessHeader: string,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      const nonce = await this.getMatrixServer().createAdminRegisterNonce();
      const response = createSynapsePreRegisterResponseDTO(nonce);
      return ResponseEntity.ok(response as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('getSynapseAdminRegister', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param body
   */
  @PostMapping('/_synapse/admin/v1/register')
  public static async postSynapseAdminRegister(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      if (!isSynapseRegisterRequestDTO(body)) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Body not AuthenticateEmailDTO',
            ),
          )
          .status(400);
      }
      // @FIXME: Implement the end point
      const response: SynapseRegisterResponseDTO =
        createSynapseRegisterResponseDTO(
          'access_token',
          'user_id',
          'home_server',
          'device_id',
        );
      return ResponseEntity.ok(response as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('postSynapseAdminRegister', err);
    }
  }

  /**
   *
   * @param accessHeader
   */
  @GetMapping('/_matrix/client/r0/account/whoami')
  public static async accountWhoAmI(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('accountWhoAmI: accessHeader = ', accessHeader);

      const {userId, deviceId, device} =
        await this._whoAmIFromAccessHeader(accessHeader);

      const user: UserRepositoryItem | undefined =
        await this.getMatrixServer().findUserById(userId);
      LOG.debug('whoAmI: user = ', user);
      if (!user) {
        LOG.warn('whoAmI: User not found: ', user, userId, deviceId);
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN_TOKEN,
              'Unrecognised access token.',
            ),
          )
          .status(401);
      }

      const username = user?.username;
      LOG.debug('whoAmI: username = ', username);

      const deviceIdentifier = device?.deviceId ?? device?.id;

      const dto = createMatrixWhoAmIResponseDTO(
        MatrixUtils.getUserId(username, this.getMatrixServer().getHostName()),
        deviceIdentifier ? deviceIdentifier : undefined,
        false,
      );

      LOG.debug('accountWhoAmI: response = ', dto);
      return ResponseEntity.ok(dto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('accountWhoAmI', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param body
   */
  @PostMapping('/_matrix/client/r0/login')
  public static async login(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      if (!isMatrixLoginRequestDTO(body)) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_FORBIDDEN,
              'Body not MatrixLoginRequestDTO',
            ),
          )
          .status(400);
      }

      if (body?.type !== MatrixLoginType.M_LOGIN_PASSWORD) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              `Only type ${MatrixLoginType.M_LOGIN_PASSWORD} supported`,
            ),
          )
          .status(400);
      }

      if (body?.identifier && body?.identifier?.type !== MatrixType.M_ID_USER) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              `Only identifier type ${MatrixType.M_ID_USER} supported`,
            ),
          )
          .status(400);
      }

      const user = body?.user ?? body?.identifier?.user;
      const password = body?.password;

      if (!user || !password) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'User or password property not defined',
            ),
          )
          .status(400);
      }

      const deviceId = body?.device_id;

      const accessToken = await this.getMatrixServer().loginWithPassword(
        user,
        password,
        deviceId,
      );
      if (!accessToken) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_FORBIDDEN,
              'Invalid username or password',
            ),
          )
          .status(403);
      }

      const backendHostname = this.getMatrixServer().getHostName();
      const backendUrl = this.getMatrixServer().getURL();

      const responseDto: MatrixLoginResponseDTO = createMatrixLoginResponseDTO(
        MatrixUtils.getUserId(user, backendHostname),
        accessToken,
        backendUrl,
        deviceId ?? '',
        createMatrixDiscoveryInformationDTO(
          createMatrixHomeServerDTO(backendUrl),
          createMatrixIdentityServerInformationDTO(backendUrl),
        ),
      );

      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('login', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomAlias
   */
  @GetMapping('/_matrix/client/r0/directory/room/:roomAlias')
  public static async getDirectoryRoomByName(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomAlias', {required: true})
    roomAlias = '',
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('getDirectoryRoomByName: roomAlias = ', roomAlias);
      const response: GetDirectoryRoomAliasResponseDTO =
        createGetDirectoryRoomAliasResponseDTO('room_id', ['server1']);
      return ResponseEntity.ok(response as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('getDirectoryRoomByName', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomId
   */
  @GetMapping('/_matrix/client/r0/rooms/:roomId/joined_members')
  public static async getRoomJoinedMembers(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('getRoomJoinedMembers: roomId = ', roomId);

      const responseDto: MatrixRoomJoinedMembersDTO =
        createMatrixRoomJoinedMembersDTO({
          user: createMatrixRoomJoinedMembersRoomMemberDTO(
            'display_name',
            'avatar_url',
          ),
        });

      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('getRoomJoinedMembers', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param kindString
   * @param body
   */
  @PostMapping('/_matrix/client/r0/register')
  public static async registerUser(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestParam('kind', RequestParamValueType.STRING)
    kindString = '',
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      const kind =
        parseMatrixRegisterKind(kindString) ?? MatrixRegisterKind.USER;
      LOG.debug('registerUser: kind = ', kind);

      if (kind !== MatrixRegisterKind.USER) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Only user registration is supported',
            ),
          )
          .status(400);
      }

      const registerBody: MatrixRegisterRequestDTO | undefined =
        parseMatrixMatrixRegisterRequestDTO(body);
      if (!registerBody) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Body not MatrixMatrixRegisterRequestDTO',
            ),
          )
          .status(400);
      }

      const auth = registerBody.auth;
      if (!auth?.type) {
        const challenge = this._registrationUia.createAuthChallenge();
        return ResponseEntity.ok(
          challenge as unknown as ReadonlyJsonObject,
        ).status(401);
      }

      if (auth.type === MatrixLoginType.M_LOGIN_PASSWORD) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Password is not a valid UIA stage for registration; send username and password in the request body',
            ),
          )
          .status(400);
      }

      if (auth.type !== MATRIX_LOGIN_DUMMY) {
        const challenge = this._registrationUia.createAuthChallenge();
        return ResponseEntity.ok(
          challenge as unknown as ReadonlyJsonObject,
        ).status(401);
      }

      try {
        this._registrationUia.completeDummyAuth(auth.session);
      } catch {
        const challenge = this._registrationUia.createAuthChallenge();
        return ResponseEntity.ok(
          challenge as unknown as ReadonlyJsonObject,
        ).status(401);
      }

      if (!registerBody.username?.trim() || !registerBody.password) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Username and password are required',
            ),
          )
          .status(400);
      }

      const result = await this.getMatrixServer().registerAccount(
        registerBody.username,
        registerBody.password,
        registerBody.device_id,
        registerBody.inhibit_login === true,
      );
      this._registrationUia.consumeSession(auth.session!);

      const responseDto = createMatrixRegisterResponseDTO(
        result.matrixUserId,
        result.accessToken,
        result.homeServerUrl,
        result.deviceId,
      );

      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('registerUser', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomId
   * @param eventType
   * @param stateKey
   */
  @GetMapping('/_matrix/client/r0/rooms/:roomId/state/:eventType/:stateKey')
  public static async getRoomStateByType(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
    @PathVariable('eventType', {required: true})
    eventType = '',
    @PathVariable('stateKey', {required: true})
    stateKey = '',
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('getRoomStateByType: roomId = ', roomId, eventType, stateKey);
      const responseDto = createGetRoomStateByTypeResponseDTO('roomName');
      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('getRoomStateByType', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomId
   * @param eventType
   * @param stateKey
   * @param body
   */
  @PutMapping('/_matrix/client/r0/rooms/:roomId/state/:eventType/:stateKey')
  public static async setRoomStateByType(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
    @PathVariable('eventType', {required: true})
    eventType = '',
    @PathVariable('stateKey', {required: true})
    stateKey = '',
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('setRoomStateByType: roomId = ', roomId, eventType, stateKey);

      if (!isSetRoomStateByTypeRequestDTO(body)) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Body not SetRoomStateByTypeRequestDTO',
            ),
          )
          .status(400);
      }

      const responseDto: PutRoomStateWithEventTypeResponseDTO =
        createPutRoomStateWithEventTypeResponseDTO(eventType);

      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('setRoomStateByType', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomId
   */
  @PostMapping('/_matrix/client/r0/rooms/:roomId/forget')
  public static async forgetRoom(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('forgetRoom: roomId = ', roomId);
      return ResponseEntity.ok({} as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('forgetRoom', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomId
   * @param body
   */
  @PostMapping('/_matrix/client/r0/rooms/:roomId/leave')
  public static async leaveRoom(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('leaveRoom: roomId = ', roomId);
      if (!isMatrixLeaveRoomRequestDTO(body)) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Body not MatrixLeaveRoomRequestDTO',
            ),
          )
          .status(400);
      }
      const responseDto = createMatrixLeaveRoomResponseDTO();
      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('leaveRoom', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomId
   * @param body
   */
  @PostMapping('/_matrix/client/r0/rooms/:roomId/invite')
  public static async inviteToRoom(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('inviteToRoom: roomId = ', roomId);
      if (!isMatrixInviteToRoomRequestDTO(body)) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Body not MatrixInviteToRoomRequestDTO',
            ),
          )
          .status(400);
      }
      const responseDto = createMatrixInviteToRoomResponseDTO();
      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('inviteToRoom', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomId
   * @param eventName
   * @param tnxId
   * @param body
   */
  @PutMapping('/_matrix/client/v3/rooms/:roomId/send/:eventName/:tnxId')
  public static async sendEventToRoomWithTnxId(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
    @PathVariable('eventName', {required: true})
    eventName = '',
    @PathVariable('tnxId', {required: true})
    tnxId = '',
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug(
        'sendEventToRoomWithTnxId: roomId = ',
        roomId,
        eventName,
        tnxId,
      );
      if (!isMatrixTextMessageDTO(body)) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Body not MatrixTextMessageDTO',
            ),
          )
          .status(400);
      }
      const {userId} = await this._whoAmIFromAccessHeader(accessHeader);
      const eventId = this.getMatrixServer().sendRoomMessage(
        userId,
        roomId,
        eventName,
        tnxId,
        body,
      );
      const responseDto = createSendEventToRoomWithTnxIdResponseDTO(eventId);
      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('sendEventToRoomWithTnxId', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param bodyJson
   */
  @PostMapping('/_matrix/client/r0/createRoom')
  public static async createRoom(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestBody
    bodyJson: ReadonlyJsonObject,
  ): Promise<ResponseEntity<MatrixCreateRoomResponseDTO | MatrixErrorDTO>> {
    try {
      LOG.debug('createRoom: bodyJson = ', bodyJson);
      if (!isMatrixCreateRoomDTO(bodyJson)) {
        LOG.debug(`Body invalid: ${explainMatrixCreateRoomDTO(bodyJson)}`);
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Body not MatrixCreateRoomDTO',
            ),
          )
          .status(400);
      }
      const body: MatrixCreateRoomDTO = bodyJson;

      LOG.debug('createRoom: accessHeader = ', accessHeader);
      const {userId, deviceId} =
        await this._whoAmIFromAccessHeader(accessHeader);

      const creationContent: Partial<MatrixRoomCreateEventDTO> | undefined =
        body?.creation_content;

      const visibility: MatrixVisibility =
        parseMatrixVisibility(body?.visibility) ?? MatrixVisibility.PRIVATE;
      const roomVersion =
        parseMatrixRoomVersion(body?.room_version) ??
        this.getMatrixServer().getDefaultRoomVersion();

      const _preset: MatrixCreateRoomPreset =
        body?.preset ?? MatrixUtils.getRoomPresetFromVisibility(visibility);

      LOG.debug('createRoom: whoAmI: ', userId, deviceId);
      const {roomId} = await this.getMatrixServer().createRoom(
        userId,
        deviceId,
        roomVersion,
        visibility,
        body?.name,
      );

      const initialStateEvents: readonly MatrixStateEvent[] =
        body?.initial_state ?? [];

      // 1. Add m.room.create event
      await this.getMatrixServer().createRoomCreateEvent(
        userId,
        roomId,
        roomVersion,
        userId,
        creationContent,
      );

      // 2. Create m.room.member event
      await this.getMatrixServer().createRoomMemberEvent(
        userId,
        roomId,
        RoomMembershipState.JOIN,
      );

      // 3. TODO: Create `m.room.power_levels` event
      // 4. TODO: Create `m.room.canonical_alias` event if `body.room_alias_name` is defined
      // 5. TODO: Add events from `presetStateEvents`

      // 6. Add events from `initialStateEvents`
      let i = 0;
      for (; i < initialStateEvents.length; i += 1) {
        const item = initialStateEvents[i];
        const itemType = item.type;
        const itemStateKey = item?.state_key;
        const itemContent = item.content;
        await this.getMatrixServer().createRoomStateEvent(
          userId,
          roomId,
          itemContent,
          itemType,
          itemStateKey ?? '',
        );
      }

      // 7a. TODO: Add `m.room.name` event
      // 7b. TODO: Add `m.room.topic` event

      // 8a. TODO: Add `m.room.member` event(s) from `body.invite`
      // 8b. TODO: Add `m.room.member` event(s) from `body.third_party_invite`

      LOG.debug('createRoom: roomId: ', roomId);

      const responseDto: MatrixCreateRoomResponseDTO =
        createMatrixCreateRoomResponseDTO(roomId as MatrixRoomId, undefined);

      LOG.debug('createRoom: responseDto: ', responseDto);
      return ResponseEntity.ok<MatrixCreateRoomResponseDTO>(responseDto);
    } catch (err) {
      return this._handleException('createRoom', err);
    }
  }

  /**
   * Idempotently ensure a batch of uniquely named rooms exist.
   * Existing names are returned unchanged (HTTP 200, `created: false`).
   */
  @PostMapping('/_matrix/client/r0/rooms/register')
  public static async registerRooms(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestBody
    bodyJson: ReadonlyJsonObject,
  ): Promise<ResponseEntity<MatrixRegisterRoomsResponseDTO | MatrixErrorDTO>> {
    try {
      if (!isMatrixRegisterRoomsRequestDTO(bodyJson)) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              explainMatrixRegisterRoomsRequestDTO(bodyJson),
            ),
          )
          .status(400);
      }
      const body: MatrixRegisterRoomsRequestDTO = bodyJson;
      const {userId, deviceId} =
        await this._whoAmIFromAccessHeader(accessHeader);
      const visibility: MatrixVisibility =
        parseMatrixVisibility(body.visibility) ?? MatrixVisibility.PRIVATE;
      const roomVersion =
        parseMatrixRoomVersion(body.room_version) ??
        this.getMatrixServer().getDefaultRoomVersion();

      const result = this.getMatrixServer().registerRooms(
        userId,
        deviceId,
        roomVersion,
        visibility,
        body.names,
      );

      const rooms = result.rooms.map((entry) =>
        createMatrixRegisterRoomResultDTO(
          entry.name,
          entry.room_id as MatrixRoomId,
          entry.created,
        ),
      );

      return ResponseEntity.ok<MatrixRegisterRoomsResponseDTO>(
        createMatrixRegisterRoomsResponseDTO(rooms),
      );
    } catch (err) {
      return this._handleException('registerRooms', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param roomId
   * @param body
   */
  @PostMapping('/_matrix/client/r0/rooms/:roomId/join')
  public static async joinToRoom(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      if (!isMatrixJoinRoomRequestDTO(body)) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN,
              'Body not MatrixJoinRoomRequestDTO',
            ),
          )
          .status(400);
      }
      LOG.debug('joinToRoom: ', roomId, body);
      const {userId} = await this._whoAmIFromAccessHeader(accessHeader);
      const joinedRoomId = this.getMatrixServer().joinRoom(userId, roomId);
      const responseDto = createMatrixJoinRoomResponseDTO(joinedRoomId);
      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('joinToRoom', err);
    }
  }

  /**
   * Recent room messages for history backfill (Matrix Client-Server API subset).
   */
  @GetMapping('/_matrix/client/v3/rooms/:roomId/messages')
  public static async getRoomMessages(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('roomId', {required: true})
    roomId = '',
    @RequestParam('limit', RequestParamValueType.STRING)
    limit = '',
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('getRoomMessages: ', roomId, limit);
      const {userId} = await this._whoAmIFromAccessHeader(accessHeader);
      const parsedLimit = limit ? Number.parseInt(limit, 10) : 0;
      const effectiveLimit = clampRoomHistoryLimit(
        parsedLimit > 0 ? parsedLimit : BACKEND_ROOM_HISTORY_LIMIT,
        BACKEND_ROOM_HISTORY_LIMIT,
      );
      const events = this.getMatrixServer().getTimelineEventsForRoom(
        userId,
        roomId,
        effectiveLimit,
      );
      const response = buildRoomMessagesResponse(events);
      return ResponseEntity.ok(response as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('getRoomMessages', err);
    }
  }

  /**
   *
   * @param accessHeader
   * @param filter
   * @param since
   * @param full_state
   * @param set_presence
   * @param timeout
   */
  @GetMapping('/_matrix/client/r0/sync')
  public static async sync(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestParam('filter', RequestParamValueType.STRING)
    filter = '',
    @RequestParam('since', RequestParamValueType.STRING)
    since = '',
    @RequestParam('full_state', RequestParamValueType.STRING)
    full_state = '',
    @RequestParam('set_presence', RequestParamValueType.STRING)
    set_presence = '',
    @RequestParam('timeout', RequestParamValueType.STRING)
    timeout = '',
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      LOG.debug('sync: ', filter, since, full_state, set_presence, timeout);
      const {userId} = await this._whoAmIFromAccessHeader(accessHeader);
      const responseDto: MatrixSyncResponseDTO =
        this.getMatrixServer().buildSync(userId, since);
      return ResponseEntity.ok(responseDto as unknown as ReadonlyJsonObject);
    } catch (err) {
      return this._handleException('sync', err);
    }
  }

  /**
   * Verifies who is the requester using access token
   *
   * @param accessToken
   * @private
   */
  private static async _whoAmIFromAccessToken(
    accessToken: string,
  ): Promise<WhoAmIResult> {
    LOG.debug('whoAmI: accessToken = ', accessToken);
    if (!accessToken) {
      LOG.warn('Warning! No authentication token provided.');
      throw createMatrixErrorDTO(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
      );
    }

    const deviceId: string | undefined =
      await this.getMatrixServer().verifyAccessToken(accessToken);
    if (!deviceId) {
      throw createMatrixErrorDTO(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
      );
    }

    const device = await this.getMatrixServer().findDeviceById(deviceId);
    if (!device) {
      LOG.warn('whoAmI: Device not found: ', deviceId, accessToken);
      throw createMatrixErrorDTO(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
      );
    }

    const userId = device?.userId;
    LOG.debug('whoAmI: userId = ', userId);
    if (!userId) {
      LOG.warn('whoAmI: User ID invalid: ', userId, deviceId, accessToken);
      throw createMatrixErrorDTO(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
      );
    }

    return {
      accessToken,
      deviceId,
      device,
      userId,
    };
  }

  /**
   * Verifies who is the requester using Bearer auth access header value
   *
   * @param accessHeader
   * @private
   */
  private static async _whoAmIFromAccessHeader(
    accessHeader: string,
  ): Promise<WhoAmIResult> {
    LOG.debug('_whoAmIFromAccessHeader: accessHeader = ', accessHeader);
    const accessToken = AuthorizationUtils.parseBearerToken(accessHeader);
    LOG.debug('_whoAmIFromAccessHeader: accessToken = ', accessToken);
    if (!accessToken) {
      throw createMatrixErrorDTO(
        MatrixErrorCode.M_UNKNOWN_TOKEN,
        'Unrecognised access token.',
      );
    }
    return this._whoAmIFromAccessToken(accessToken);
  }

  /**
   * Handle exceptions
   *
   * @param callName
   * @param err
   * @private
   */
  private static _handleException(
    callName: string,
    err: unknown,
  ): ResponseEntity<MatrixErrorDTO> {
    LOG.error(`${callName}: ERROR: `, err);
    if (err instanceof MatrixRegistrationError) {
      return ResponseEntity.badRequest<MatrixErrorDTO>()
        .body(createMatrixErrorDTO(err.errcode, err.message))
        .status(err.httpStatus);
    }
    if (isMatrixErrorDTO(err)) {
      return ResponseEntity.badRequest<MatrixErrorDTO>().body(err).status(401);
    }
    return ResponseEntity.internalServerError<MatrixErrorDTO>().body(
      createMatrixErrorDTO(MatrixErrorCode.M_UNKNOWN, 'Internal Server Error'),
    );
  }

  @PostMapping('/_matrix/client/v3/keys/upload')
  public static async uploadKeys(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      const token = AuthorizationUtils.parseBearerToken(accessHeader);
      if (!token) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN_TOKEN,
              'Unrecognised access token.',
            ),
          )
          .status(401);
      }
      const matrixUserId =
        this.getMatrixServer().resolveMatrixUserIdFromAccessToken(token);
      const deviceSubject = JwtDecodeServiceImpl.decodePayloadSubject(token);
      getMatrixCryptoStore().uploadKeys(matrixUserId, deviceSubject, body);
      const counts: Record<string, number> = {};
      for (const key of Object.keys(
        (body.one_time_keys as Record<string, unknown>) ?? {},
      )) {
        counts[key] = 1;
      }
      return ResponseEntity.ok({one_time_key_counts: counts});
    } catch (err) {
      return this._handleException('uploadKeys', err);
    }
  }

  @PostMapping('/_matrix/client/v3/keys/query')
  public static async queryKeys(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      const token = AuthorizationUtils.parseBearerToken(accessHeader);
      if (!token) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN_TOKEN,
              'Unrecognised access token.',
            ),
          )
          .status(401);
      }
      void this.getMatrixServer().resolveMatrixUserIdFromAccessToken(token);
      const deviceKeys = (body.device_keys as ReadonlyJsonObject) ?? {};
      return ResponseEntity.ok(
        getMatrixCryptoStore().queryKeys(deviceKeys) as unknown as ReadonlyJsonObject,
      );
    } catch (err) {
      return this._handleException('queryKeys', err);
    }
  }

  @PostMapping('/_matrix/client/v3/keys/claim')
  public static async claimKeys(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      const token = AuthorizationUtils.parseBearerToken(accessHeader);
      if (!token) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN_TOKEN,
              'Unrecognised access token.',
            ),
          )
          .status(401);
      }
      void this.getMatrixServer().resolveMatrixUserIdFromAccessToken(token);
      const oneTimeKeys =
        (body.one_time_keys as Record<string, Record<string, string>>) ?? {};
      return ResponseEntity.ok({
        one_time_keys: getMatrixCryptoStore().claimKeys(oneTimeKeys),
      });
    } catch (err) {
      return this._handleException('claimKeys', err);
    }
  }

  @PutMapping('/_matrix/client/v3/sendToDevice/{eventType}/{txnId}')
  public static async sendToDevicePut(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @PathVariable('eventType', {required: true})
    eventType: string,
    @PathVariable('txnId', {required: true})
    txnId: string,
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    return this.sendToDevice(accessHeader, {
      ...body,
      type: eventType,
      txn_id: txnId,
    });
  }

  @PostMapping('/_matrix/client/v3/sendToDevice')
  public static async sendToDevice(
    @RequestHeader(MATRIX_AUTHORIZATION_HEADER_NAME, {
      required: false,
      defaultValue: '',
    })
    accessHeader: string,
    @RequestBody
    body: ReadonlyJsonObject,
  ): Promise<ResponseEntity<ReadonlyJsonObject | MatrixErrorDTO>> {
    try {
      const token = AuthorizationUtils.parseBearerToken(accessHeader);
      if (!token) {
        return ResponseEntity.badRequest<MatrixErrorDTO>()
          .body(
            createMatrixErrorDTO(
              MatrixErrorCode.M_UNKNOWN_TOKEN,
              'Unrecognised access token.',
            ),
          )
          .status(401);
      }
      const sender = this.getMatrixServer().resolveMatrixUserIdFromAccessToken(
        token,
      );
      const eventType = String(body.type ?? 'm.room.encrypted');
      const messages =
        (body.messages as Record<string, Record<string, ReadonlyJsonObject>>) ??
        {};
      for (const [userId, devices] of Object.entries(messages)) {
        for (const content of Object.values(devices)) {
          getMatrixCryptoStore().enqueueToDevice(userId, {
            type: eventType,
            sender,
            content,
          });
        }
      }
      return ResponseEntity.ok({});
    } catch (err) {
      return this._handleException('sendToDevice', err);
    }
  }
}
