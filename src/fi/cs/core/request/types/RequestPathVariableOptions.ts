import {isBooleanOrUndefined} from '../../types/Boolean';
import {objectKey} from '../../types/RegularObject';

import {isStringOrUndefined} from '../../types/String';

export interface RequestPathVariableOptions {
  readonly required?: boolean;
  readonly defaultValue?: string | undefined;
  readonly decodeValue?: boolean;
}

export function isRequestPathVariableOptions(
  value: unknown,
): value is RequestPathVariableOptions {
  return (
    !!value &&
    isBooleanOrUndefined(objectKey(value, 'required')) &&
    isStringOrUndefined(objectKey(value, 'defaultValue')) &&
    isBooleanOrUndefined(objectKey(value, 'decodeValue'))
  );
}

export function isRequestPathVariableOptionsOrUndefined(
  value: unknown,
): value is RequestPathVariableOptions {
  return value === undefined || isRequestPathVariableOptions(value);
}
