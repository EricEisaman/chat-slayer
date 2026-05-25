import {BackendTranslationServiceImpl} from './fi/cs/backend/BackendTranslationServiceImpl';
import {EmailServiceImpl} from './fi/cs/backend/EmailServiceImpl';
import {JwtEncodeServiceImpl} from './fi/cs/backend/JwtEncodeServiceImpl';
import {EmailService} from './fi/cs/core/email/EmailService';
import {JwtEncodeService} from './fi/cs/core/jwt/JwtEncodeService';
import {JwtEngine} from './fi/cs/core/jwt/JwtEngine';
import {ProcessUtils} from './fi/cs/core/ProcessUtils';
import {
  BACKEND_SCRIPT_NAME,
  BACKEND_LOG_LEVEL,
  BACKEND_URL,
  BACKEND_HOSTNAME,
  BACKEND_JWT_SECRET,
  BACKEND_JWT_ALG,
  BACKEND_DEFAULT_LANGUAGE,
  BACKEND_EMAIL_FROM,
  BACKEND_EMAIL_CONFIG,
  BACKEND_ACCESS_TOKEN_EXPIRATION_TIME,
  BACKEND_INITIAL_USERS,
  BACKEND_INITIAL_ROOMS,
  BACKEND_PRIVATE_ROOMS,
  BACKEND_PUBLIC_URL,
  ALLOWED_CLIENTS_CONFIG,
  FEDERATION_URL,
  FEDERATION_ENABLED,
} from './constants/runtime';
import {formatAllowedClientsLogLines} from './config/allowedClients';
import {validateProductionEnv} from './config/validateEnv';
import {BUILD_USAGE_URL, BUILD_WITH_FULL_USAGE} from './constants/build';

import {LogService} from './fi/cs/core/LogService';
import {RequestClientImpl} from './fi/cs/core/RequestClientImpl';
import {RequestServer} from './fi/cs/core/RequestServer';
import {RequestRouterImpl} from './fi/cs/core/requestServer/RequestRouterImpl';
import {LogLevel} from './fi/cs/core/types/LogLevel';

LogService.setLogLevel(BACKEND_LOG_LEVEL);

import {TRANSLATIONS} from './fi/cs/core/translations';

import {Headers} from './fi/cs/core/request/types/Headers';
Headers.setLogLevel(LogLevel.INFO);

import {CommandExitStatus} from './fi/cs/core/cmd/types/CommandExitStatus';
import {CommandArgumentUtils} from './fi/cs/core/cmd/utils/CommandArgumentUtils';
import {ParsedCommandArgumentStatus} from './fi/cs/core/cmd/types/ParsedCommandArgumentStatus';
import {Language, parseLanguage} from './fi/cs/core/types/Language';
import {StaticRoutes} from './fi/cs/core/requestServer/types/StaticRoutes';
import {parseInteger} from './fi/cs/core/types/Number';
import {MatrixServerService} from './fi/cs/matrix/server/MatrixServerService';
import {ChatSlayerBackendController} from './controllers/ChatSlayerBackendController';
import {ServerServiceImpl} from './fi/cs/node/requestServer/ServerServiceImpl';
import {
  RequestServerImpl,
  setRequestPreHandler,
} from './fi/cs/node/RequestServerImpl';
import {handleHttpPreRequest} from './demo/httpPreHandlers';
import {getDemoEventHub} from './demo/DemoEventHub';
import {setDemoMatrixServer} from './demo/DemoHttpHandler';
import {randomBytes} from 'node:crypto';
import {resolvePreconfiguredRoomsConfig} from './config/initialRooms';
import {MatrixVisibility} from './fi/cs/matrix/types/request/createRoom/types/MatrixVisibility';

/** Internal Matrix user used only to create boot-seeded public rooms when no seed users are configured. */
const BOOT_SEED_MATRIX_USERNAME = '__boot_seed__';

const LOG = LogService.createLogger('main');

export async function main(args: string[] = []): Promise<CommandExitStatus> {
  try {
    validateProductionEnv();

    for (const line of formatAllowedClientsLogLines(
      ALLOWED_CLIENTS_CONFIG,
      BACKEND_PUBLIC_URL,
    )) {
      LOG.info(line);
    }

    RequestRouterImpl.setLogLevel(LogLevel.INFO);
    RequestClientImpl.setLogLevel(LogLevel.INFO);
    // RequestServer.setLogLevel(LogLevel.INFO);
    StaticRoutes.setLogLevel(LogLevel.INFO);
    ChatSlayerBackendController.setLogLevel(LogLevel.DEBUG);
    MatrixServerService.setLogLevel(LogLevel.DEBUG);

    LOG.debug(`Loglevel as ${LogService.getLogLevelString()}`);

    const {scriptName, parseStatus, exitStatus, errorString} =
      CommandArgumentUtils.parseArguments(BACKEND_SCRIPT_NAME, args);

    if (
      parseStatus === ParsedCommandArgumentStatus.HELP ||
      parseStatus === ParsedCommandArgumentStatus.VERSION
    ) {
      console.log(getMainUsage(scriptName));
      return exitStatus;
    }

    if (errorString) {
      console.error(`ERROR: ${errorString}`);
      return exitStatus;
    }

    const jwtService: JwtEncodeService = JwtEncodeServiceImpl.create();
    const jwtEngine: JwtEngine = jwtService.createJwtEngine(
      BACKEND_JWT_SECRET,
      BACKEND_JWT_ALG,
    );

    const emailService: EmailService =
      EmailServiceImpl.create(BACKEND_EMAIL_FROM);

    const defaultLanguage: Language =
      parseLanguage(BACKEND_DEFAULT_LANGUAGE) ?? Language.ENGLISH;

    const matrixServer: MatrixServerService = new MatrixServerService(
      BACKEND_PUBLIC_URL,
      BACKEND_HOSTNAME,
      jwtEngine,
      parseInteger(BACKEND_ACCESS_TOKEN_EXPIRATION_TIME),
    );

    // Start initializing

    await BackendTranslationServiceImpl.initialize(
      defaultLanguage,
      TRANSLATIONS,
    );

    emailService.initialize(BACKEND_EMAIL_CONFIG);

    await matrixServer.initialize();

    const preconfigured = resolvePreconfiguredRoomsConfig(
      BACKEND_INITIAL_ROOMS,
      BACKEND_PRIVATE_ROOMS,
    );
    matrixServer.setPreconfiguredPublicRoomNames(preconfigured.publicNames);
    matrixServer.setPreconfiguredPrivateRoomNames(preconfigured.privateNames);
    if (preconfigured.publicNames.size > 0) {
      LOG.info(
        `Preconfigured public rooms: ${preconfigured.publicNames.size} (boot-seeded)`,
      );
    }
    if (preconfigured.privateNames.size > 0) {
      LOG.info(
        `Preconfigured private room names: ${preconfigured.privateNames.size} (hidden until discovered)`,
      );
    }

    let bootSeedUserId: string | undefined;
    if (BACKEND_INITIAL_USERS) {
      const users = BACKEND_INITIAL_USERS.split(';');
      LOG.debug(
        `Creating initial users from "${BACKEND_INITIAL_USERS}": `,
        users,
      );
      let i = 0;
      for (; i < users.length; i += 1) {
        const parts = users[i].split(':');
        const username = parts.shift();
        const password = parts.join(':');
        if (username && password) {
          LOG.debug(`Creating initial user: "${username}"`);
          const user = await matrixServer.createUser(username, password);
          LOG.info(`Created initial user: "${username}" as ID "${user.id}"`);
          if (!bootSeedUserId) {
            bootSeedUserId = user.id;
          }
        }
      }
    } else {
      LOG.debug('No initial users defined. Will not create users.');
    }

    if (preconfigured.publicDisplayNames.length > 0) {
      let publicBootUserId = bootSeedUserId;
      if (!publicBootUserId) {
        const bootstrap = await matrixServer.createUser(
          BOOT_SEED_MATRIX_USERNAME,
          randomBytes(32).toString('hex'),
        );
        publicBootUserId = bootstrap.id;
        LOG.warn(
          'BACKEND_INITIAL_ROOMS set without BACKEND_INITIAL_USERS; boot-seeding public rooms with internal user (set BACKEND_INITIAL_USERS to control the seed account)',
        );
      }
      const roomVersion = matrixServer.getDefaultRoomVersion();
      let created = 0;
      for (const displayName of preconfigured.publicDisplayNames) {
        const entry = matrixServer.ensureRoom(
          publicBootUserId,
          '',
          roomVersion,
          MatrixVisibility.PUBLIC,
          displayName,
        );
        if (entry.created) {
          created += 1;
        }
      }
      LOG.info(
        `Boot-seeded ${preconfigured.publicDisplayNames.length} public room(s) (${created} newly created)`,
      );
      getDemoEventHub().publishRoomDirectory();
    }

    ChatSlayerBackendController.setMatrixServer(matrixServer);

    setDemoMatrixServer(matrixServer);
    const demoHub = getDemoEventHub();
    matrixServer.setEventHooks({
      onRoomCreated: () => {
        demoHub.publishRoomDirectory();
      },
      onMessage: (event) => {
        demoHub.publishMessage(event);
      },
    });

    setRequestPreHandler(handleHttpPreRequest);

    const server: RequestServer = RequestServerImpl.create(
      ServerServiceImpl.create(BACKEND_URL),
      RequestRouterImpl.create(),
    );

    server.attachController(ChatSlayerBackendController);

    let fedServer: RequestServer | undefined = undefined;
    if (FEDERATION_ENABLED) {
      fedServer = RequestServerImpl.create(
        ServerServiceImpl.create(FEDERATION_URL),
        RequestRouterImpl.create(),
      );
      fedServer.attachController(ChatSlayerBackendController);
    } else {
      LOG.info('Federation listener disabled (FEDERATION_ENABLED=false)');
    }

    server.start();
    fedServer?.start();

    let serverListener: (() => void) | undefined = undefined;
    const stopPromise = new Promise<void>((resolve, reject) => {
      try {
        serverListener = server.on(RequestServerImpl.Event.STOPPED, () => {
          LOG.debug('Stopping backend server from RequestServer stop event');
          serverListener = undefined;
          fedServer?.stop();
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });

    let fedServerListener: (() => void) | undefined = undefined;
    const fedStopPromise = fedServer
      ? new Promise<void>((resolve, reject) => {
          try {
            fedServerListener = fedServer.on(
              RequestServerImpl.Event.STOPPED,
              () => {
                LOG.debug(
                  'Stopping federation server from RequestServer stop event',
                );
                fedServerListener = undefined;
                server.stop();
                resolve();
              },
            );
          } catch (err) {
            reject(err);
          }
        })
      : Promise.resolve();

    ProcessUtils.setupDestroyHandler(
      () => {
        LOG.debug('Stopping server from process utils event');
        server.stop();
        fedServer?.stop();
        if (serverListener) {
          serverListener();
          serverListener = undefined;
        }
        if (fedServerListener) {
          fedServerListener();
          fedServerListener = undefined;
        }
      },
      (err: unknown) => {
        LOG.error('Error while shutting down the service: ', err);
      },
    );

    await stopPromise;
    await fedStopPromise;

    return CommandExitStatus.OK;
  } catch (err) {
    LOG.error('Fatal error: ', err);
    return CommandExitStatus.FATAL_ERROR;
  }
}

/**
 *
 * @param scriptName
 * @nosideeffects
 * @__PURE__
 */
export function getMainUsage(scriptName: string): string {
  /* @__PURE__ */ if (/* @__PURE__ */ BUILD_WITH_FULL_USAGE) {
    return `USAGE: ${/* @__PURE__ */ scriptName} [OPT(s)] ARG(1) [...ARG(N)]

  Chat Slayer.
  
...and OPT is one of:

    -h --help          Print help
    -v --version       Print version
    --                 Disables option parsing

  Environment variables:

    BACKEND_LOG_LEVEL as one of:
    
      ALL
      DEBUG
      INFO
      WARN
      ERROR
      NONE
`;
  } else {
    return `USAGE: ${/* @__PURE__ */ scriptName} ARG(1) [...ARG(N)]
See ${/* @__PURE__ */ BUILD_USAGE_URL}
`;
  }
}
