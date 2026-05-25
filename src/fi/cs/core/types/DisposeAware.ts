/**
 * Interface to be implemented by applications that want to be aware if
 * the component has been destroyed.
 */
export interface DisposeAware {
  /**
   * Returns true if the component has been destroyed
   */
  isDestroyed(): boolean;
}
