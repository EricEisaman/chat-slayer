import {RequestMappingValue} from './types/RequestMappingValue';
import {RequestMapping} from './RequestMapping';
import {RequestMethod} from './types/RequestMethod';

export function OptionsMapping(...config: readonly RequestMappingValue[]) {
  return RequestMapping(RequestMethod.OPTIONS, ...config);
}
