import {ParameterDecoratorFunction} from './ParameterDecoratorFunction';
import {MethodDecoratorFunction} from './MethodDecoratorFunction';

/**
 * This is the decorator type for TypeScript's experimental stage 2 decorators.
 *
 * TypeScript 5 introduced the standard ES style by default, however it does not
 * yet support parameter decorators, so we still need to use the old API.
 */
export interface ParameterOrMethodDecoratorFunction<T = any>
  extends ParameterDecoratorFunction, MethodDecoratorFunction<T> {
  /**
   * @inheritDoc
   */
  (target: any | Function, propertyKey: string, paramIndex: number): void;

  /**
   * @inheritDoc
   */
  (
    target: any | Function,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
  ): void;
}
