export enum AuthSmsQueryParam {
  /**
   * Query key: `l`
   */
  LANGUAGE = 'l',
}

export function isAuthSmsQueryParam(
  value: unknown,
): value is AuthSmsQueryParam {
  switch (value) {
    case AuthSmsQueryParam.LANGUAGE:
      return true;

    default:
      return false;
  }
}

export function stringifyAuthSmsQueryParam(value: AuthSmsQueryParam): string {
  switch (value) {
    case AuthSmsQueryParam.LANGUAGE:
      return 'LANGUAGE';
  }
  throw new TypeError(`Unsupported AuthSmsQueryParam value: ${value}`);
}

export function parseAuthSmsQueryParam(
  value: unknown,
): AuthSmsQueryParam | undefined {
  switch (`${value}`.toUpperCase()) {
    case 'L':
    case 'LANGUAGE':
      return AuthSmsQueryParam.LANGUAGE;

    default:
      return undefined;
  }
}
