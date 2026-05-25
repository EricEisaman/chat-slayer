import {RequestInterfaceUtils} from '../utils/RequestInterfaceUtils';
import {isArray} from '../../types/Array';
import {isString} from '../../types/String';
import {isObject} from '../../types/Object';
import {every} from '../../functions/every';

export type DefaultHeaderMapValuesType = {[key: string]: string | string[]};

export function isDefaultHeaderMapValuesType(
  value: unknown,
): value is DefaultHeaderMapValuesType {
  return (
    !!value &&
    isObject(value) &&
    RequestInterfaceUtils.everyPropertyIs<string>(
      value,
      (item: unknown): boolean => {
        return isString(item) || (isArray(item) && every(item, isString));
      },
    )
  );
}
