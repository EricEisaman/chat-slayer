import 'reflect-metadata';
import {asObject} from '../../types/castBoundaries';
import {createEntityMetadata, EntityMetadata} from '../types/EntityMetadata';

const METADATA_KEY = Symbol('metadata');

export class EntityMetadataUtils {
  public static getMetadata(value: unknown): EntityMetadata {
    return Reflect.getMetadata(METADATA_KEY, asObject(value));
  }

  public static updateMetadata(
    target: any,
    setValue: (metadata: EntityMetadata) => void,
  ): void {
    const metadata: EntityMetadata =
      Reflect.getMetadata(METADATA_KEY, target) ||
      createEntityMetadata('', '', [], [], [], [], undefined, [], [], []);
    setValue(metadata);
    Reflect.defineMetadata(METADATA_KEY, metadata, target);
  }
}
