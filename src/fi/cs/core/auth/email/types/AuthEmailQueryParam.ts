export enum AuthEmailQueryParam {
  /**
   * Query key: `l`
   */
  LANGUAGE = 'l',
}

export function isAuthEmailQueryParam(
  value: unknown,
): value is AuthEmailQueryParam {
  switch (value) {
    case AuthEmailQueryParam.LANGUAGE:
      return true;

    default:
      return false;
  }
}

export function stringifyAuthEmailQueryParam(
  value: AuthEmailQueryParam,
): string {
  switch (value) {
    case AuthEmailQueryParam.LANGUAGE:
      return 'LANGUAGE';
  }
  throw new TypeError(`Unsupported AuthEmailQueryParam value: ${value}`);
}

export function parseAuthEmailQueryParam(
  value: unknown,
): AuthEmailQueryParam | undefined {
  switch (`${value}`.toUpperCase()) {
    case 'L':
    case 'LANGUAGE':
      return AuthEmailQueryParam.LANGUAGE;

    default:
      return undefined;
  }
}
