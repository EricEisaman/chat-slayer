import {
  RequestParamValueType,
  isRequestParamValueType,
} from './RequestParamValueType';
import {objectKey} from '../../types/RegularObject';

import {isBoolean} from '../../types/Boolean';
import {RequestParamObjectType} from './RequestParamObjectType';
import {isString} from '../../types/String';

export interface RequestHeaderParamObject {
  objectType: RequestParamObjectType.REQUEST_HEADER;
  valueType: RequestParamValueType;
  headerName: string;
  isRequired: boolean;
  defaultValue: string | undefined;
}

export function isRequestHeaderParamObject(
  value: unknown,
): value is RequestHeaderParamObject {
  return (
    !!value &&
    objectKey(value, 'objectType') === RequestParamObjectType.REQUEST_HEADER &&
    isString(objectKey(value, 'headerName')) &&
    isBoolean(objectKey(value, 'isRequired')) &&
    isRequestParamValueType(objectKey(value, 'valueType')) &&
    (objectKey(value, 'defaultValue') === undefined ||
      isString(objectKey(value, 'defaultValue')))
  );
}
