import {CalendarEvent, isCalendarEvent} from './CalendarEvent';
import {map} from '../functions/map';
import {isRegularObject, objectKey} from './RegularObject';
import {hasNoOtherKeys} from './OtherKeys';
import {isArrayOf} from './Array';

export interface CalendarDTO {
  readonly events: readonly CalendarEvent[];
}

export function createCalendarDTO(
  events: readonly CalendarEvent[] | CalendarEvent[],
): CalendarDTO {
  return {
    events: map(events, item => item),
  };
}

export function isCalendarDTO(value: unknown): value is CalendarDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['events']) &&
    isArrayOf<CalendarEvent>(objectKey(value, 'events'), isCalendarEvent)
  );
}

export function stringifyCalendarDTO(value: CalendarDTO): string {
  return `CalendarDTO(${value})`;
}

export function parseCalendarDTO(value: unknown): CalendarDTO | undefined {
  if (isCalendarDTO(value)) return value;
  return undefined;
}
