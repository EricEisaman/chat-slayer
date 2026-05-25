import {SimpleStoredRepositoryItem} from './SimpleStoredRepositoryItem';
import {SimpleRepository} from './SimpleRepository';
import {SimpleRepositoryClient} from './SimpleRepositoryClient';

export interface SimpleRepositoryInitializer<
  T extends SimpleStoredRepositoryItem,
> {
  initializeRepository(
    client: SimpleRepositoryClient,
  ): Promise<SimpleRepository<T>>;
}
