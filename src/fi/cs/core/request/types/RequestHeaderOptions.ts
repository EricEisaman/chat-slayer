import {isBoolean} from '../../types/Boolean';
import {objectKey} from '../../types/RegularObject';

import {isString} from '../../types/String';

export interface RequestHeaderOptions {
  required?: boolean;
  defaultValue?: string | undefined;
}

export function isRequestHeaderOptions(
  value: unknown,
): value is RequestHeaderOptions {
  return (
    !!value &&
    (objectKey(value, 'required') === undefined ||
      isBoolean(objectKey(value, 'required'))) &&
    (objectKey(value, 'defaultValue') === undefined ||
      isString(objectKey(value, 'defaultValue')))
  );
}

export function isRequestHeaderOptionsOrUndefined(
  value: unknown,
): value is RequestHeaderOptions | undefined {
  return value === undefined || isRequestHeaderOptions(value);
}
