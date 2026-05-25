/**
 * This is the decorator type for TypeScript's experimental stage 2 decorators.
 *
 * TypeScript 5 introduced the standard ES style by default, however it does not
 * yet support parameter decorators, so we still need to use the old API.
 */
export interface MethodDecoratorFunction<T = any> {
  /**
   * Method decorator function
   *
   * @param target
   * @param propertyKey
   * @param descriptor
   */
  (
    target: any | Function,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
  ): void;
}
