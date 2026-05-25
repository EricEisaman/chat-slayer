import {isString, isStringOrSymbol} from '../types/String';
import {EntityMetadataUtils} from './utils/EntityMetadataUtils';
import {EntityMetadata} from './types/EntityMetadata';
import {createEntityField} from './types/EntityField';
import {parseColumnDefinition} from './types/ColumnDefinition';
import {decoratorPropertyName} from './utils/decoratorPropertyName';

export const Column = (
  columnName: string,
  columnDefinition?: string,
  opts?: {
    readonly insertable?: boolean;
    readonly updatable?: boolean;
    readonly nullable?: boolean;
  },
) => {
  return (target: any, context: unknown): void => {
    const propertyName = decoratorPropertyName(context);
    if (!isString(propertyName))
      throw new TypeError(
        `Only string properties supported. The type was ${typeof propertyName}.`,
      );
    EntityMetadataUtils.updateMetadata(
      target.constructor,
      (metadata: EntityMetadata) => {
        metadata.fields.push(
          createEntityField(
            propertyName,
            columnName,
            parseColumnDefinition(columnDefinition),
            opts?.nullable,
            undefined,
            undefined,
            opts?.insertable,
            opts?.updatable,
          ),
        );
      },
    );
  };
};
