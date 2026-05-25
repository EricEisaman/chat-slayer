import {Headers} from '../../request/types/Headers';
import {JsonAny} from '../../Json';

export interface ParseRequestBodyCallback {
  (headers: Headers): JsonAny | undefined | Promise<JsonAny | undefined>;
}
