// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {RequestMethod, isRequestMethod} from './RequestMethod';
import {objectKey} from '../../types/RegularObject';

import {RequestInterfaceUtils} from '../utils/RequestInterfaceUtils';
import {isArray} from '../../types/Array';
import {isString} from '../../types/String';
import {every} from '../../functions/every';

export interface RequestMappingObject {
  readonly methods: readonly RequestMethod[];
  readonly paths: readonly string[];
}

export function isRequestMappingObject(
  value: unknown,
): value is RequestMappingObject {
  return (
    RequestInterfaceUtils.isObject(value) &&
    RequestInterfaceUtils.hasPropertyMethods(value) &&
    isArray(objectKey(value, 'methods')) &&
    every(objectKey(value, 'methods'), isRequestMethod) &&
    RequestInterfaceUtils.hasPropertyPaths(value) &&
    isArray(objectKey(value, 'paths')) &&
    every(objectKey(value, 'paths'), isString)
  );
}
