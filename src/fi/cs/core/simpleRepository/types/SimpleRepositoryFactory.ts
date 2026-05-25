import {SimpleStoredRepositoryItem} from './SimpleStoredRepositoryItem';
import {SimpleRepository} from './SimpleRepository';

export interface SimpleRepositoryFactory<T extends SimpleStoredRepositoryItem> {
  (rooms: readonly string[]): SimpleRepository<T>;
}
