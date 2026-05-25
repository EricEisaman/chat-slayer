import {EntityMetadataUtils} from './utils/EntityMetadataUtils';
import {EntityMetadata} from './types/EntityMetadata';
import {isString, isStringOrSymbol} from '../types/String';
import {decoratorPropertyName} from './utils/decoratorPropertyName';

/**
 * Annotation which marks the property to be automatically initialized by
 * update time.
 */
export const UpdateTimestamp = () => {
  return (target: any, context: unknown) => {
    const propertyName = decoratorPropertyName(context);
    if (!isString(propertyName)) {
      throw new TypeError(
        'Symbols not supported for update timestamp property',
      );
    }
    EntityMetadataUtils.updateMetadata(
      target.constructor,
      (metadata: EntityMetadata) => {
        metadata.updateTimestamps.push(propertyName);
      },
    );
  };
};
