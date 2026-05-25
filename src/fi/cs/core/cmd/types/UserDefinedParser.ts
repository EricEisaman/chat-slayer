/**
 * User defined custom type parser.
 *
 * @example
 *     (value: unknown) : string | undefined => BigInt.parse(value)
 */
export interface UserDefinedParser<T = any> {
  (value: unknown): T | undefined;
}
