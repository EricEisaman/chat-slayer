import {RequestMappingValue} from './types/RequestMappingValue';
import {RequestMapping} from './RequestMapping';
import {RequestMethod} from './types/RequestMethod';

export function DeleteMapping(...config: readonly RequestMappingValue[]) {
  return RequestMapping(RequestMethod.DELETE, ...config);
}
