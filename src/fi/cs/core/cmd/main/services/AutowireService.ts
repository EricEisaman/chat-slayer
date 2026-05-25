/**
 * Public interface for autowire service
 */
export interface AutowireService {
  hasName(name: string): boolean;
  getName<T>(name: string): T;
  setName<T>(name: string, value: T): void;
  deleteName(name: string): void;
}
