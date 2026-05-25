import {explainEnum} from '../../../../types/Enum';

export enum JokerComApiPeriodType {
  YEARS = 'YEARS',
  MONTHS = 'MONTHS',
}

export function isJokerComApiPeriodType(
  value: unknown,
): value is JokerComApiPeriodType {
  switch (value) {
    case JokerComApiPeriodType.YEARS:
    case JokerComApiPeriodType.MONTHS:
      return true;
    default:
      return false;
  }
}

export function explainJokerComApiPeriodType(value: unknown): string {
  return explainEnum(
    'JokerComApiPeriodType',
    JokerComApiPeriodType,
    isJokerComApiPeriodType,
    value,
  );
}

export function stringifyJokerComApiPeriodType(
  value: JokerComApiPeriodType,
): string {
  switch (value) {
    case JokerComApiPeriodType.YEARS:
      return 'YEARS';
    case JokerComApiPeriodType.MONTHS:
      return 'MONTHS';
  }
  throw new TypeError(`Unsupported JokerComApiPeriodType value: ${value}`);
}

export function parseJokerComApiPeriodType(
  value: unknown,
): JokerComApiPeriodType | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toUpperCase()) {
    case 'YEARS':
      return JokerComApiPeriodType.YEARS;
    case 'MONTHS':
      return JokerComApiPeriodType.MONTHS;
    default:
      return undefined;
  }
}
