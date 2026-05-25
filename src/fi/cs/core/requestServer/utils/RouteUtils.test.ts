import assert from 'node:assert/strict';
import {RouteUtils} from './RouteUtils';
import {RequestRouterImpl} from '../RequestRouterImpl';
import {PutMapping} from '../../request/PutMapping';
import {RequestMapping} from '../../request/RequestMapping';
import {RequestMethod} from '../../request/types/RequestMethod';
import {Headers} from '../../request/types/Headers';

function testPathHasParameter(): void {
  assert.equal(
    RouteUtils.pathHasParameter(
      '/_matrix/client/v3/rooms/:roomId/send/:eventName/:tnxId',
    ),
    true,
  );
  assert.equal(RouteUtils.pathHasParameter('/hello/{param}'), true);
  assert.equal(RouteUtils.pathHasParameter('/_matrix/client/r0/login'), false);
}

async function testColonParamPutRoute(): Promise<void> {
  @RequestMapping('/')
  class Controller {
    @PutMapping('/_matrix/client/v3/rooms/:roomId/send/:eventName/:tnxId')
    public static send(): string {
      return 'ok';
    }
  }

  const router = RequestRouterImpl.create(Controller);
  const response = await router.handleRequest(
    RequestMethod.PUT,
    '/_matrix/client/v3/rooms/!abc:localhost/send/m.room.message/txn1',
    undefined,
    Headers.create(),
  );
  assert.equal(response.getStatusCode(), 200);
  assert.equal(response.getBody(), 'ok');
}

await testColonParamPutRoute();
testPathHasParameter();
console.log('RouteUtils.test.ts: ok');
