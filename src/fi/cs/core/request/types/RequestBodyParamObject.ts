// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {
  RequestParamValueType,
  isRequestParamValueType,
} from './RequestParamValueType';
import {objectKey} from '../../types/RegularObject';

import {RequestParamObjectType} from './RequestParamObjectType';

export interface RequestBodyParamObject {
  objectType: RequestParamObjectType.REQUEST_BODY;
  valueType: RequestParamValueType;
}

export function isRequestBodyParamObject(
  value: unknown,
): value is RequestBodyParamObject {
  return (
    !!value &&
    objectKey(value, 'objectType') === RequestParamObjectType.REQUEST_BODY &&
    isRequestParamValueType(objectKey(value, 'valueType'))
  );
}
