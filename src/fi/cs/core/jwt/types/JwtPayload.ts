import {isStringOrUndefined} from '../../types/String';
import {isNumberOrUndefined} from '../../types/Number';
import {isRegularObject, objectKey} from '../../types/RegularObject';
import {hasNoOtherKeys} from '../../types/OtherKeys';

export interface JwtPayload {
  /**
   * Expiration time
   * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.4
   */
  readonly exp?: number;

  /**
   * Audience, e.g. the recipient(s) who this JWT is intended for.
   * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.3
   */
  readonly aud?: string;

  /**
   * Subject, e.g. the subject of the JWT.
   * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.2
   */
  readonly sub?: string;
}

export function createJwtPayload(
  exp?: number,
  aud?: string,
  sub?: string,
): JwtPayload {
  return {
    exp,
    aud,
    sub,
  };
}

export function isJwtPayload(value: unknown): value is JwtPayload {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['exp', 'aud', 'sub']) &&
    isNumberOrUndefined(objectKey(value, 'exp')) &&
    isStringOrUndefined(objectKey(value, 'aud')) &&
    isStringOrUndefined(objectKey(value, 'sub'))
  );
}

export function stringifyJwtPayload(value: JwtPayload): string {
  return JSON.stringify(value);
}

export function parseJwtPayload(value: unknown): JwtPayload | undefined {
  if (isJwtPayload(value)) return value;
  return undefined;
}
