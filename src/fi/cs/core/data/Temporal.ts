import {EntityMetadataUtils} from './utils/EntityMetadataUtils';
import {EntityMetadata} from './types/EntityMetadata';
import {
  explainTemporalType,
  isTemporalType,
  TemporalType,
} from './types/TemporalType';
import {createTemporalProperty} from './types/TemporalProperty';
import {isString, isStringOrSymbol} from '../types/String';
import {decoratorPropertyName} from './utils/decoratorPropertyName';

export const Temporal = (type: TemporalType = TemporalType.TIMESTAMP) => {
  return (target: any, context: unknown) => {
    const propertyName = decoratorPropertyName(context);
    if (!isString(propertyName)) {
      throw new TypeError('Symbols not supported for temporal property');
    }
    if (!isTemporalType(type))
      throw new TypeError(
        `Only TemporalType properties supported for property "${propertyName}". The type was ${explainTemporalType(type)}.`,
      );
    EntityMetadataUtils.updateMetadata(
      target.constructor,
      (metadata: EntityMetadata) => {
        metadata.temporalProperties.push(
          createTemporalProperty(propertyName, type),
        );
      },
    );
  };
};
