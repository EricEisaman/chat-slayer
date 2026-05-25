import {RequestInterfaceUtils} from '../utils/RequestInterfaceUtils';
import {isString} from '../../types/String';
import {isObject} from '../../types/Object';

export type DefaultPathVariableMapValuesType = {[key: string]: string};

export function isDefaultPathVariableMapValuesType(
  value: unknown,
): value is DefaultPathVariableMapValuesType {
  return (
    !!value &&
    isObject(value) &&
    RequestInterfaceUtils.everyPropertyIs<string>(value, isString)
  );
}
