import {
  DefaultHeaderMapValuesType,
  isDefaultHeaderMapValuesType,
} from './DefaultHeaderMapValuesType';

import {objectKey} from '../../types/RegularObject';

export interface RequestHeaderListOptions {
  defaultValues?: DefaultHeaderMapValuesType;
}

export function isRequestHeaderListOptions(
  value: unknown,
): value is RequestHeaderListOptions {
  return (
    !!value &&
    (objectKey(value, 'defaultValues') === undefined ||
      isDefaultHeaderMapValuesType(objectKey(value, 'defaultValues')))
  );
}
