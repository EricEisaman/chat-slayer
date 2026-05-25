import {SimpleRepositoryEntry} from './SimpleRepositoryEntry';

/**
 * @deprecated Use Repository<T> directly -- or refactor this interface to have multiple interfaces
 *             for every type of access.
 */
export interface SimplePublicRepository<T> {
  findById(id: string): Promise<SimpleRepositoryEntry<T> | undefined>;
}
