// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {RequestMethod, isRequestMethod} from './RequestMethod';
import {isString} from '../../types/String';
import {isArrayOf} from '../../types/Array';

export type RequestMappingValue = RequestMethod | string;

export function isRequestMappingValue(
  value: unknown,
): value is RequestMappingValue {
  return isString(value) || isRequestMethod(value);
}

export function isRequestMappingValueArray(
  value: unknown,
): value is RequestMappingValue[] {
  return isArrayOf<RequestMappingValue>(value, isRequestMappingValue);
}
