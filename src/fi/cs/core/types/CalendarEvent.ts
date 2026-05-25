import {isString} from './String';
import {isRegularObject, objectKey} from './RegularObject';
import {hasNoOtherKeys} from './OtherKeys';

export interface CalendarEvent {
  readonly start: string;
  readonly end: string;
  readonly repeatRule: string;
  readonly stamp: string;
  readonly uid: string;
  readonly created: string;
  readonly description: string;
  readonly lastModified: string;
  readonly location: string;
  readonly sequence: string;
  readonly status: string;
  readonly summary: string;
  readonly transparency: string;
}

export function createCalendarEvent(
  start: string,
  end: string,
  repeatRule: string,
  stamp: string,
  uid: string,
  created: string,
  description: string,
  lastModified: string,
  location: string,
  sequence: string,
  status: string,
  summary: string,
  transparency: string,
): CalendarEvent {
  return {
    start,
    end,
    repeatRule,
    stamp,
    uid,
    created,
    description,
    lastModified,
    location,
    sequence,
    status,
    summary,
    transparency,
  };
}

export function isCalendarEvent(value: unknown): value is CalendarEvent {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'start',
      'end',
      'repeatRule',
      'stamp',
      'uid',
      'created',
      'description',
      'lastModified',
      'location',
      'sequence',
      'status',
      'summary',
      'transparency',
    ]) &&
    isString(objectKey(value, 'start')) &&
    isString(objectKey(value, 'end')) &&
    isString(objectKey(value, 'repeatRule')) &&
    isString(objectKey(value, 'stamp')) &&
    isString(objectKey(value, 'uid')) &&
    isString(objectKey(value, 'created')) &&
    isString(objectKey(value, 'description')) &&
    isString(objectKey(value, 'lastModified')) &&
    isString(objectKey(value, 'location')) &&
    isString(objectKey(value, 'sequence')) &&
    isString(objectKey(value, 'status')) &&
    isString(objectKey(value, 'summary')) &&
    isString(objectKey(value, 'transparency'))
  );
}

export function stringifyCalendarEvent(value: CalendarEvent): string {
  return `CalendarEvent(${value})`;
}

export function parseCalendarEvent(value: unknown): CalendarEvent | undefined {
  if (isCalendarEvent(value)) return value;
  return undefined;
}
