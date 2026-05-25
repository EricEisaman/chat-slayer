// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {
  RequestParamValueType,
  isRequestParamValueType,
} from './RequestParamValueType';
import {objectKey} from '../../types/RegularObject';

import {RequestParamObjectType} from './RequestParamObjectType';
import {isStringOrUndefined} from '../../types/String';

export interface RequestQueryParamObject {
  objectType: RequestParamObjectType.QUERY_PARAM;
  valueType: RequestParamValueType;

  /**
   * If undefined, result will be an object of all query parameters provided
   */
  queryParam: string | undefined;
}

export function isRequestQueryParamObject(
  value: unknown,
): value is RequestQueryParamObject {
  return (
    !!value &&
    objectKey(value, 'objectType') === RequestParamObjectType.QUERY_PARAM &&
    isStringOrUndefined(objectKey(value, 'queryParam')) &&
    isRequestParamValueType(objectKey(value, 'valueType'))
  );
}
