/**
 * Service which synchronizes asynchronous operations
 */
export interface AsyncSynchronizer {
  /**
   * Calls the provided callback and returns the result.
   *
   * If another call happens before the previous finishes it will wait for
   * the previous operation to finish before executing another asynchronous
   * callback.
   *
   * @param callback A async function which returns a promise
   */
  run<T>(callback: () => Promise<T>): Promise<T>;
}
