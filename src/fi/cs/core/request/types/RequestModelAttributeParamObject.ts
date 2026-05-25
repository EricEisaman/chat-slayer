// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {
  RequestParamValueType,
  isRequestParamValueType,
} from './RequestParamValueType';
import {objectKey} from '../../types/RegularObject';

import {RequestParamObjectType} from './RequestParamObjectType';
import {isString} from '../../types/String';

export interface RequestModelAttributeParamObject {
  objectType: RequestParamObjectType.MODEL_ATTRIBUTE;
  valueType: RequestParamValueType;
  attributeName: string;
}

export function isRequestModelAttributeParamObject(
  value: unknown,
): value is RequestModelAttributeParamObject {
  return (
    !!value &&
    objectKey(value, 'objectType') === RequestParamObjectType.MODEL_ATTRIBUTE &&
    isString(objectKey(value, 'attributeName')) &&
    isRequestParamValueType(objectKey(value, 'valueType'))
  );
}
