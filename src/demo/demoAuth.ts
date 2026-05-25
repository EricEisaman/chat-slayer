import {JwtDecodeServiceImpl} from '../fi/cs/backend/JwtDecodeServiceImpl';
import {MatrixServerService} from '../fi/cs/matrix/server/MatrixServerService';
import {MatrixRegistrationError} from '../fi/cs/matrix/MatrixRegistrationError';
import {createMatrixErrorDTO} from '../fi/cs/matrix/types/response/error/MatrixErrorDTO';
import {MatrixErrorCode} from '../fi/cs/matrix/types/response/error/types/MatrixErrorCode';
import {
  assertValidMatrixPassword,
  assertValidMatrixUsername,
} from '../fi/cs/matrix/matrixUsername';

export interface DemoSession {
  readonly accessToken: string;
  readonly internalUserId: string;
  readonly matrixUserId: string;
  /** Matrix / Olm device id (JWT subject when client did not supply one). */
  readonly matrixDeviceId: string;
}

export function readSignalString(
  signals: Record<string, unknown>,
  key: string,
): string {
  const value = signals[key];
  return typeof value === 'string' ? value : '';
}

/** Room names from a signal array or comma-separated string. */
export function readSignalRoomNames(
  signals: Record<string, unknown>,
  key: string,
): readonly string[] {
  const value = signals[key];
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  }
  return [];
}

export async function resolveDemoSession(
  matrixServer: MatrixServerService,
  accessToken: string,
): Promise<DemoSession> {
  if (!accessToken) {
    throw createMatrixErrorDTO(
      MatrixErrorCode.M_UNKNOWN_TOKEN,
      'Unrecognised access token.',
    );
  }
  const deviceId = await matrixServer.verifyAccessToken(accessToken);
  if (!deviceId) {
    throw createMatrixErrorDTO(
      MatrixErrorCode.M_UNKNOWN_TOKEN,
      'Unrecognised access token.',
    );
  }
  const device = await matrixServer.findDeviceById(deviceId);
  if (!device?.userId) {
    throw createMatrixErrorDTO(
      MatrixErrorCode.M_UNKNOWN_TOKEN,
      'Unrecognised access token.',
    );
  }
  const matrixUserId = matrixServer.resolveMatrixUserId(device.userId);
  if (!matrixUserId) {
    throw createMatrixErrorDTO(
      MatrixErrorCode.M_UNKNOWN_TOKEN,
      'Unrecognised access token.',
    );
  }
  const tokenSubject = JwtDecodeServiceImpl.decodePayloadSubject(accessToken) ?? '';
  const matrixDeviceId = device.target.deviceId?.trim() || tokenSubject;
  return {
    accessToken,
    internalUserId: device.userId,
    matrixUserId,
    matrixDeviceId,
  };
}

export async function demoRegister(
  matrixServer: MatrixServerService,
  username: string,
  password: string,
): Promise<DemoSession> {
  assertValidMatrixUsername(username);
  assertValidMatrixPassword(password);
  const result = await matrixServer.registerAccount(
    username,
    password,
    undefined,
    false,
  );
  if (!result.accessToken) {
    throw createMatrixErrorDTO(
      MatrixErrorCode.M_UNKNOWN,
      'Registration did not return an access token',
    );
  }
  return resolveDemoSession(matrixServer, result.accessToken);
}

export async function demoLogin(
  matrixServer: MatrixServerService,
  username: string,
  password: string,
): Promise<DemoSession> {
  const accessToken = await matrixServer.loginWithPassword(username, password);
  if (!accessToken) {
    throw createMatrixErrorDTO(
      MatrixErrorCode.M_FORBIDDEN,
      'Invalid username or password',
    );
  }
  return resolveDemoSession(matrixServer, accessToken);
}

export function matrixErrorToMessage(err: unknown): string {
  if (err instanceof MatrixRegistrationError) {
    return err.message;
  }
  if (
    typeof err === 'object' &&
    err !== null &&
    'errcode' in err &&
    'error' in err
  ) {
    return String((err as {error: unknown}).error);
  }
  return err instanceof Error ? err.message : String(err);
}
