import {isString} from './String';
import {isRegularObject, objectKey} from './RegularObject';
import {hasNoOtherKeys} from './OtherKeys';

export interface InternetCalendarParam {
  readonly name: string;
  readonly value: string;
}

export function createInternetCalendarParam(
  name: string,
  value: string,
): InternetCalendarParam {
  return {
    name,
    value,
  };
}

export function isInternetCalendarParam(
  value: unknown,
): value is InternetCalendarParam {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['name', 'value']) &&
    isString(objectKey(value, 'name')) &&
    isString(objectKey(value, 'value'))
  );
}

export function stringifyInternetCalendarParam(
  value: InternetCalendarParam,
): string {
  return `InternetCalendarParam(${value})`;
}

export function parseInternetCalendarParam(
  value: unknown,
): InternetCalendarParam | undefined {
  if (isInternetCalendarParam(value)) return value;
  return undefined;
}
