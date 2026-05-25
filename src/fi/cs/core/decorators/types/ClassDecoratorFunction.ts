/**
 * This is the decorator type for TypeScript's experimental stage 2 decorators.
 *
 * TypeScript 5 introduced the standard ES style by default, however it does not
 * yet support parameter decorators, so we still need to use the old API.
 */
export interface ClassDecoratorFunction {
  /**
   * Class decorator function.
   *
   * @param constructor
   */
  (constructor: Function): void | any;
}
