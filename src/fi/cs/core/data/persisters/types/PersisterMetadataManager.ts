import {EntityMetadata} from '../../types/EntityMetadata';

export interface PersisterMetadataManager {
  setupEntityMetadata(metadata: EntityMetadata): void;

  getMetadataByTable(tableName: string): EntityMetadata | undefined;
}
