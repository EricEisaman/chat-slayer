/**
 * @__PURE__
 */
export const BUILD_NODE_ENV: string =
  /* @__PURE__ */ _parseNonEmptyString('%{BUILD_NODE_ENV}') ?? 'development';

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

/**
 * This file must not have dependencies, otherwise there might be a circular dependencies.
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
function _parseNonEmptyString(value: unknown): string | undefined {
  /**
   * We have this as a separate constant so that the line will not be accidentally replaced in the build process
   */
  const startLiteral = '%';
  if (value === undefined) return undefined;
  const text = `${value}`;
  if (text === '') return undefined;
  if (text.startsWith(startLiteral + '{') && text.endsWith('}'))
    return undefined;
  return text;
}
