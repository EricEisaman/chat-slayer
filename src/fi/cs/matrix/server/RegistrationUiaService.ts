import {randomUUID} from 'node:crypto';
import {
  createMatrixAuthFlowDTO,
  createMatrixAuthFlowsResponseDTO,
  type MatrixAuthFlowsResponseDTO,
} from '../types/response/auth/MatrixAuthFlowsResponseDTO';

export const MATRIX_LOGIN_DUMMY = 'm.login.dummy';

const SESSION_TTL_MS = 30 * 60 * 1000;

interface RegistrationSession {
  readonly id: string;
  readonly createdAt: number;
  dummyCompleted: boolean;
  consumed: boolean;
}

export class RegistrationUiaService {
  private readonly _sessions = new Map<string, RegistrationSession>();

  public createAuthChallenge(): MatrixAuthFlowsResponseDTO {
    const session: RegistrationSession = {
      id: randomUUID(),
      createdAt: Date.now(),
      dummyCompleted: false,
      consumed: false,
    };
    this._sessions.set(session.id, session);
    return createMatrixAuthFlowsResponseDTO(session.id);
  }

  public completeDummyAuth(sessionId: string | undefined): string {
    const session = this._resolveSession(sessionId);
    if (session.dummyCompleted) {
      return session.id;
    }
    session.dummyCompleted = true;
    return session.id;
  }

  public consumeSession(sessionId: string): void {
    const session = this._resolveSession(sessionId);
    session.consumed = true;
    this._sessions.delete(session.id);
  }

  private _resolveSession(sessionId: string | undefined): RegistrationSession {
    this._purgeExpired();
    if (!sessionId?.trim()) {
      throw new TypeError('Session required');
    }
    const session = this._sessions.get(sessionId.trim());
    if (!session || session.consumed) {
      throw new TypeError('Invalid session');
    }
    return session;
  }

  private _purgeExpired(): void {
    const now = Date.now();
    for (const [id, session] of this._sessions) {
      if (now - session.createdAt > SESSION_TTL_MS) {
        this._sessions.delete(id);
      }
    }
  }
}
