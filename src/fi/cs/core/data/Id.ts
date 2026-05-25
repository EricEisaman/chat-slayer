import {isString, isStringOrSymbol} from '../types/String';
import {decoratorPropertyName} from './utils/decoratorPropertyName';
import {EntityMetadataUtils} from './utils/EntityMetadataUtils';
import {EntityMetadata} from './types/EntityMetadata';

export const Id = () => {
  return (target: any, context: unknown) => {
    const propertyName = decoratorPropertyName(context);
    if (!isString(propertyName))
      throw new TypeError(
        `Only string properties supported. The type was ${typeof propertyName}.`,
      );
    EntityMetadataUtils.updateMetadata(
      target.constructor,
      (metadata: EntityMetadata) => {
        metadata.idPropertyName = propertyName;
      },
    );
  };
};
