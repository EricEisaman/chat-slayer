import {isString, isStringOrSymbol} from '../types/String';
import {decoratorPropertyName} from './utils/decoratorPropertyName';
import {EntityMetadataUtils} from './utils/EntityMetadataUtils';
import {EntityMetadata} from './types/EntityMetadata';
import {createEntityField} from './types/EntityField';
import {EntityFieldType} from './types/EntityFieldType';

/**
 * This annotation defines a reference to the mapped column. Use it with
 * `@ManyToOne` annotation.
 *
 * **Note!** The remote table name will be looked by using the `columnName`, so
 * make sure that it is unique among other columns marked with `@id` annotation.
 *
 * @param columnName The name of the column
 * @param nullable If `true` the column can be undefined.
 */
export const JoinColumn = (
  columnName: string,
  nullable?: boolean | undefined,
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
            undefined,
            nullable,
            EntityFieldType.JOINED_ENTITY,
          ),
        );
      },
    );
  };
};
