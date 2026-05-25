import assert from 'node:assert/strict';
import {JwtEncodeServiceImpl} from '../../backend/JwtEncodeServiceImpl';
import {MatrixServerService} from './MatrixServerService';
import {
  RegistrationUiaService,
  MATRIX_LOGIN_DUMMY,
} from './RegistrationUiaService';
import {ChatSlayerBackendController} from '../../../../controllers/ChatSlayerBackendController';
import {createMatrixRegisterRequestDTO} from '../types/request/register/MatrixRegisterRequestDTO';
import {MatrixLoginType} from '../types/request/login/MatrixLoginType';
import {MatrixErrorCode} from '../types/response/error/types/MatrixErrorCode';
import {isMatrixAuthFlowsResponseDTO} from '../types/response/auth/MatrixAuthFlowsResponseDTO';
import {isMatrixRegisterResponseDTO} from '../types/response/register/MatrixRegisterResponseDTO';
import {isMatrixErrorDTO} from '../types/response/error/MatrixErrorDTO';
import {MatrixRegistrationError} from '../MatrixRegistrationError';

const JWT_SECRET = 'test-registration-jwt-secret-32chars-min';

function createTestMatrixServer(): MatrixServerService {
  const jwtEngine = JwtEncodeServiceImpl.create().createJwtEngine(JWT_SECRET);
  return new MatrixServerService(
    'http://localhost:8008',
    'localhost',
    jwtEngine,
    300,
  );
}

function setupController(svc: MatrixServerService): void {
  ChatSlayerBackendController.setMatrixServer(svc);
  ChatSlayerBackendController.setRegistrationUiaService(
    new RegistrationUiaService(),
  );
}

async function testUiaFirstPostReturns401(): Promise<void> {
  const svc = createTestMatrixServer();
  setupController(svc);
  const res = await ChatSlayerBackendController.registerUser(
    '',
    'user',
    createMatrixRegisterRequestDTO(undefined, 'newuser', 'password12') as never,
  );
  assert.equal(res.getStatusCodeValue(), 401);
  const body = res.getBody();
  assert.ok(isMatrixAuthFlowsResponseDTO(body));
  assert.ok(body.session);
  assert.equal(body.flows[0]?.stages[0], MATRIX_LOGIN_DUMMY);
}

async function testUiaSecondPostWithoutSessionReturns401(): Promise<void> {
  const svc = createTestMatrixServer();
  setupController(svc);
  const res = await ChatSlayerBackendController.registerUser(
    '',
    'user',
    createMatrixRegisterRequestDTO(
      {type: MATRIX_LOGIN_DUMMY, session: 'not-a-real-session'},
      'newuser',
      'password12',
    ) as never,
  );
  assert.equal(res.getStatusCodeValue(), 401);
  assert.ok(isMatrixAuthFlowsResponseDTO(res.getBody()));
}

async function testUiaRegisterSuccessAndWhoami(): Promise<void> {
  const svc = createTestMatrixServer();
  setupController(svc);

  const step1 = await ChatSlayerBackendController.registerUser(
    '',
    'user',
    createMatrixRegisterRequestDTO(
      undefined,
      'reguser1',
      'password12',
    ) as never,
  );
  assert.equal(step1.getStatusCodeValue(), 401);
  const session = (step1.getBody() as {session: string}).session;

  const step2 = await ChatSlayerBackendController.registerUser(
    '',
    'user',
    createMatrixRegisterRequestDTO(
      {type: MATRIX_LOGIN_DUMMY, session},
      'reguser1',
      'password12',
    ) as never,
  );
  assert.equal(step2.getStatusCodeValue(), 200);
  const regBody = step2.getBody();
  assert.ok(isMatrixRegisterResponseDTO(regBody));
  assert.equal(regBody.user_id, '@reguser1:localhost');
  assert.ok(regBody.access_token);

  const deviceId = await svc.verifyAccessToken(regBody.access_token!);
  assert.ok(deviceId);
  const device = await svc.findDeviceById(deviceId);
  assert.ok(device);
  const user = await svc.findUserById(device.target.userId);
  assert.ok(user);
  assert.equal(user.target.username, 'reguser1');
}

async function testDuplicateUsername409(): Promise<void> {
  const svc = createTestMatrixServer();
  await svc.registerAccount('dupuser', 'password12');

  try {
    await svc.registerAccount('dupuser', 'password99');
    assert.fail('expected duplicate error');
  } catch (err) {
    assert.ok(err instanceof MatrixRegistrationError);
    assert.equal(err.errcode, MatrixErrorCode.M_USER_IN_USE);
    assert.equal(err.httpStatus, 409);
  }
}

async function testInvalidUsername400(): Promise<void> {
  const svc = createTestMatrixServer();
  try {
    await svc.registerAccount('ab', 'password12');
    assert.fail('expected invalid username');
  } catch (err) {
    assert.ok(err instanceof MatrixRegistrationError);
    assert.equal(err.errcode, MatrixErrorCode.M_INVALID_USERNAME);
    assert.equal(err.httpStatus, 400);
  }
}

async function testRejectPasswordAuthTypeOnRegister(): Promise<void> {
  const svc = createTestMatrixServer();
  setupController(svc);
  const res = await ChatSlayerBackendController.registerUser(
    '',
    'user',
    createMatrixRegisterRequestDTO(
      {type: MatrixLoginType.M_LOGIN_PASSWORD, session: 'x'},
      'user2',
      'password12',
    ) as never,
  );
  assert.equal(res.getStatusCodeValue(), 400);
  const body = res.getBody();
  assert.ok(isMatrixErrorDTO(body));
  assert.equal(body.errcode, MatrixErrorCode.M_UNKNOWN);
}

async function testRegistrationUiaSessionLifecycle(): Promise<void> {
  const uia = new RegistrationUiaService();
  const challenge = uia.createAuthChallenge();
  assert.ok(challenge.session);
  uia.completeDummyAuth(challenge.session);
  uia.consumeSession(challenge.session);
  assert.throws(() => uia.completeDummyAuth(challenge.session));
}

async function run(): Promise<void> {
  await testUiaFirstPostReturns401();
  await testUiaSecondPostWithoutSessionReturns401();
  await testUiaRegisterSuccessAndWhoami();
  await testDuplicateUsername409();
  await testInvalidUsername400();
  await testRejectPasswordAuthTypeOnRegister();
  await testRegistrationUiaSessionLifecycle();
  console.log('matrixRegistration.test.ts: all passed');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
