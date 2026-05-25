import {QueryResultable} from './QueryResultable';
import {EntityField} from '../../types/EntityField';
import {TemporalProperty} from '../../types/TemporalProperty';

export interface QueryEntityResultable extends QueryResultable {
  includeEntityFields(
    tableName: string,
    fields: readonly EntityField[],
    temporalProperties: readonly TemporalProperty[],
  ): void;
}
