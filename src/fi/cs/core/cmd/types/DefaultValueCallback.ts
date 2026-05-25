export interface DefaultValueCallback<T = any, R = any> {
  (value?: T | undefined): R | undefined | Promise<R | undefined>;
}
