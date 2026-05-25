import {RequestMappingValue} from './types/RequestMappingValue';
import {RequestMapping} from './RequestMapping';
import {RequestMethod} from './types/RequestMethod';

export function PostMapping(...config: readonly RequestMappingValue[]) {
  return RequestMapping(RequestMethod.POST, ...config);
}
