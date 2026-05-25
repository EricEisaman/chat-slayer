import {EntityMetadata} from './EntityMetadata';
import {ReadonlyJsonObject} from '../../Json';

export interface CreateEntityLikeCallback {
  (dto?: unknown): EntityLike;
}

export interface EntityLike {
  /**
   * Get the metadata for this entity
   */
  getMetadata(): EntityMetadata;

  /**
   * Make a copy of this entity
   */
  clone(): EntityLike;

  /**
   * Get JSON presentation of this entity.
   */
  toJSON(): ReadonlyJsonObject;
}
