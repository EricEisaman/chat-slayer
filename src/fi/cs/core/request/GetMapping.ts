import {RequestMappingValue} from './types/RequestMappingValue';
import {RequestMapping} from './RequestMapping';
import {RequestMethod} from './types/RequestMethod';

export function GetMapping(...config: readonly RequestMappingValue[]) {
  return RequestMapping(RequestMethod.GET, ...config);
}
