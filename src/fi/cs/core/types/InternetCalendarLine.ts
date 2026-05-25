import {
  InternetCalendarParam,
  isInternetCalendarParam,
} from './InternetCalendarParam';
import {isString} from './String';
import {isRegularObject, objectKey} from './RegularObject';
import {hasNoOtherKeys} from './OtherKeys';
import {isArrayOf} from './Array';

export interface InternetCalendarLine {
  readonly name: string;
  readonly params: InternetCalendarParam[];
  readonly value: string;
}

export function createInternetCalendarLine(
  name: string,
  value: string,
  params: InternetCalendarParam[] = [],
): InternetCalendarLine {
  return {
    name,
    value,
    params,
  };
}

export function isInternetCalendarLine(
  value: unknown,
): value is InternetCalendarLine {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['name', 'params', 'value']) &&
    isString(objectKey(value, 'name')) &&
    isArrayOf<InternetCalendarParam>(
      objectKey(value, 'params'),
      isInternetCalendarParam,
    ) &&
    isString(objectKey(value, 'value'))
  );
}

export function stringifyInternetCalendarLine(
  value: InternetCalendarLine,
): string {
  return `InternetCalendarLine(${value})`;
}

export function parseInternetCalendarLine(
  value: unknown,
): InternetCalendarLine | undefined {
  if (isInternetCalendarLine(value)) return value;
  return undefined;
}
