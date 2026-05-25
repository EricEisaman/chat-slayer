import {explainEnum} from './Enum';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export function isTheme(value: unknown): value is Theme {
  switch (value) {
    case Theme.DARK:
    case Theme.LIGHT:
      return true;
    default:
      return false;
  }
}

export function explainTheme(value: unknown): string {
  return explainEnum('Theme', Theme, isTheme, value);
}

export function stringifyTheme(value: Theme): string {
  switch (value) {
    case Theme.DARK:
      return 'DARK';
    case Theme.LIGHT:
      return 'LIGHT';
  }
  throw new TypeError(`Unsupported Theme value: ${value}`);
}

export function parseTheme(value: unknown): Theme | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toUpperCase()) {
    case 'DARK':
      return Theme.DARK;
    case 'LIGHT':
      return Theme.LIGHT;
    default:
      return undefined;
  }
}
