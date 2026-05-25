import {RequestParamObjectType} from './RequestParamObjectType';
import {objectKey} from '../../types/RegularObject';

import {
  DefaultPathVariableMapValuesType,
  isDefaultPathVariableMapValuesType,
} from './DefaultPathVariableMapValuesType';

export interface RequestPathVariableMapParamObject {
  objectType: RequestParamObjectType.PATH_VARIABLE_MAP;
  defaultValues?: DefaultPathVariableMapValuesType;
}

export function isRequestPathVariableMapParamObject(
  value: unknown,
): value is RequestPathVariableMapParamObject {
  return (
    !!value &&
    objectKey(value, 'objectType') ===
      RequestParamObjectType.PATH_VARIABLE_MAP &&
    (objectKey(value, 'defaultValues') === undefined ||
      isDefaultPathVariableMapValuesType(objectKey(value, 'defaultValues')))
  );
}
