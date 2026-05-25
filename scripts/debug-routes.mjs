import {ChatSlayerBackendController} from '../dist/chat-slayer.cjs';

// Minimal: use built bundle's internal state is opaque; use source via dynamic import
const {getInternalRequestMappingObject} = await import(
  '../src/fi/cs/core/request/types/RequestController.ts'
);
const {RequestRouterImpl} = await import(
  '../src/fi/cs/core/requestServer/RequestRouterImpl.ts'
);
const {parseRequestMethod} = await import(
  '../src/fi/cs/core/request/types/RequestMethod.ts'
);

const router = RequestRouterImpl.RequestRouterImpl.create(
  {setHandler() {}, start() {}, stop() {}},
  (await import('../src/fi/cs/core/requestServer/RequestRouterImpl.ts')).RequestRouterImpl.create().constructor,
);
// simpler approach
const {RouteUtils} = await import('../src/fi/cs/core/requestServer/utils/RouteUtils.ts');
const {RequestRouterImpl: RRI} = await import('../src/fi/cs/core/requestServer/RequestRouterImpl.ts');

const r = RRI.RequestRouterImpl.create(
  {setHandler() {}, start() {}, stop() {}},
  (await import('../src/fi/cs/core/requestServer/RequestRouterImpl.ts')).RequestRouterImpl.create(
    {setHandler() {}, start() {}, stop() {}},
    (await import('../src/fi/cs/core/requestServer/RequestRouterImpl.ts')).RequestRouterImpl,
  ),
);
