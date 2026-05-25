import {EntityMetadataUtils} from './utils/EntityMetadataUtils';
import {EntityMetadata} from './types/EntityMetadata';
import {isString, isStringOrSymbol} from '../types/String';
import {decoratorPropertyName} from './utils/decoratorPropertyName';

/**
 * Annotation which marks the property to be automatically initialized by
 * creation time.
 *
 * Right now this does not affect PostgreSQL or MySQL implementations where
 * this functionality is handled by the database configuration. It is
 * only used in the memory persister for now.
 *
 * However, some day when we have SQL initialization functionality, this may be
 * used there, to initialize database table schemas automatically.
 */
export const CreationTimestamp = () => {
  return (target: any, context: unknown): void => {
    const propertyName = decoratorPropertyName(context);
    if (!isString(propertyName)) {
      throw new TypeError(
        'Symbols not supported for creation timestamp property',
      );
    }
    EntityMetadataUtils.updateMetadata(
      target.constructor,
      (metadata: EntityMetadata) => {
        metadata.creationTimestamps.push(propertyName);
      },
    );
  };
};
