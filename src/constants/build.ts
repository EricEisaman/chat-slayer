//
// Build-time metadata only. Secrets and service URLs belong in runtime.ts (process.env).

import {parseBoolean as _parseBoolean} from '../fi/cs/core/types/Boolean';

import {parseNonEmptyString as _parseNonEmptyString} from '../fi/cs/core/types/String';

function parseBoolean(value: unknown): boolean | undefined {
  if (
    typeof value === 'string' &&
    value.startsWith('%' + '{') &&
    value.endsWith('}')
  )
    return undefined;
  return _parseBoolean(value);
}

function parseNonEmptyString(value: unknown): string | undefined {
  if (
    typeof value === 'string' &&
    value.startsWith('%' + '{') &&
    value.endsWith('}')
  )
    return undefined;
  return _parseNonEmptyString(value);
}

/**
 * @__PURE__
 */
export const BUILD_USAGE_URL = 'https://github.com';

/**
 * @__PURE__
 */
export const BUILD_VERSION: string =
  /* @__PURE__ */ parseNonEmptyString('%{BUILD_VERSION}') ?? '?';

/**
 * @__PURE__
 */
export const BUILD_COMMAND_NAME: string =
  /* @__PURE__ */ parseNonEmptyString('%{BUILD_COMMAND_NAME}') ?? 'chat-slayer';

/**
 * @__PURE__
 */
export const BUILD_LOG_LEVEL: string =
  /* @__PURE__ */ parseNonEmptyString('%{BUILD_LOG_LEVEL}') ?? '';

/**
 * @__PURE__
 */
export const BUILD_NODE_ENV: string =
  /* @__PURE__ */ parseNonEmptyString('%{BUILD_NODE_ENV}') ?? 'development';

/**
 * @__PURE__
 */
export const BUILD_DATE: string =
  /* @__PURE__ */ parseNonEmptyString('%{BUILD_DATE}') ?? '';

/**
 * @__PURE__
 */
export const BUILD_WITH_FULL_USAGE: boolean =
  /* @__PURE__ */ parseBoolean('%{BUILD_WITH_FULL_USAGE}') ?? true;

/**
 * @__PURE__
 */
export const IS_PRODUCTION: boolean = BUILD_NODE_ENV === 'production';

/**
 * @__PURE__
 */
export const IS_TEST: boolean = BUILD_NODE_ENV === 'test';

/**
 * @__PURE__
 */
export const IS_DEVELOPMENT: boolean = !IS_PRODUCTION && !IS_TEST;
