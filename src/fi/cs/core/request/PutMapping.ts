import {RequestMappingValue} from './types/RequestMappingValue';
import {RequestMapping} from './RequestMapping';
import {RequestMethod} from './types/RequestMethod';

export function PutMapping(...config: readonly RequestMappingValue[]) {
  return RequestMapping(RequestMethod.PUT, ...config);
}
