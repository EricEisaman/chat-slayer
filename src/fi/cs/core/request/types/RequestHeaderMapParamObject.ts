import {RequestParamObjectType} from './RequestParamObjectType';
import {objectKey} from '../../types/RegularObject';

import {
  DefaultHeaderMapValuesType,
  isDefaultHeaderMapValuesType,
} from './DefaultHeaderMapValuesType';

export interface RequestHeaderMapParamObject {
  objectType: RequestParamObjectType.REQUEST_HEADER_MAP;
  defaultValues?: DefaultHeaderMapValuesType;
}

export function isRequestHeaderMapParamObject(
  value: unknown,
): value is RequestHeaderMapParamObject {
  return (
    !!value &&
    objectKey(value, 'objectType') ===
      RequestParamObjectType.REQUEST_HEADER_MAP &&
    (objectKey(value, 'defaultValues') === undefined ||
      isDefaultHeaderMapValuesType(objectKey(value, 'defaultValues')))
  );
}
