export enum Language {
  FINNISH = 'fi',
  ENGLISH = 'en',
}

export function isLanguage(value: unknown): value is Language {
  switch (value) {
    case Language.FINNISH:
    case Language.ENGLISH:
      return true;

    default:
      return false;
  }
}

export function stringifyLanguage(value: Language): string {
  switch (value) {
    case Language.FINNISH:
      return 'fi';
    case Language.ENGLISH:
      return 'en';
  }
  throw new TypeError(`Unsupported Language value: ${value}`);
}

export function parseLanguage(value: unknown): Language | undefined {
  switch (`${value}`.toUpperCase()) {
    case 'FI':
    case 'FINNISH':
      return Language.FINNISH;

    case 'EN':
    case 'ENGLISH':
      return Language.ENGLISH;

    default:
      return undefined;
  }
}
