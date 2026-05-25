import {map} from '../../../../functions/map';
import {reduce} from '../../../../functions/reduce';
import {has} from '../../../../functions/has';
import {InsertQueryBuilder} from '../../sql/insert/InsertQueryBuilder';
import {BaseInsertQueryBuilder} from '../../sql/insert/BaseInsertQueryBuilder';
import {QueryBuildResult, QueryValueFactory} from '../../types/QueryBuilder';
import {PgQueryUtils} from '../utils/PgQueryUtils';

export class PgInsertQueryBuilder
  extends BaseInsertQueryBuilder
  implements InsertQueryBuilder
{
  protected constructor() {
    super(', ');
    this.addPrefixFactory(
      () =>
        `INSERT INTO ${PgQueryUtils.quoteTableName(this.getFullTableName())}`,
    );
  }

  public static create(): PgInsertQueryBuilder {
    return new PgInsertQueryBuilder();
  }

  public override addPrefixFactory(
    queryFactory: () => string,
    ...valueFactories: QueryValueFactory[]
  ): void {
    super.addPrefixFactory(queryFactory, ...valueFactories);
  }

  public override addValueFactory(
    queryFactory: () => string,
    ...valueFactories: QueryValueFactory[]
  ): void {
    super.addValueFactory(queryFactory, ...valueFactories);
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.includeColumn}
   */
  public appendValueList(list: readonly any[]): void {
    const queryString = `(${map(list, () => PgQueryUtils.getValuePlaceholder()).join(', ')})`;
    const valueFactories = map(list, item => () => item);
    this.addValueFactory((): string => queryString, ...valueFactories);
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.includeColumn}
   */
  public appendValueObject(
    columnNames: readonly string[],
    obj: {readonly [key: string]: any},
  ): void {
    if (!columnNames?.length)
      throw new TypeError('There must be at least one column name');
    this.appendValueList(
      reduce(
        columnNames,
        (list: any[], columnName: string): any[] => {
          if (has(obj, columnName)) {
            list.push(obj[columnName]);
          } else {
            list.push(null);
          }
          return list;
        },
        [],
      ),
    );
  }

  public addColumnName(name: string): void {
    this.addColumnFactory(() => PgQueryUtils.quoteColumnName(name));
  }

  ///////////////////////      InsertQueryBuilder      ///////////////////////

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.getTablePrefix}
   */
  public override getTablePrefix(): string {
    return super.getTablePrefix();
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.setTablePrefix}
   */
  public override setTablePrefix(prefix: string): void {
    super.setTablePrefix(prefix);
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.getTablePrefix}
   */
  public override getTableName(): string {
    return super.getTableName();
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.setFromTable}
   */
  public override setTableName(tableName: string): void {
    super.setTableName(tableName);
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.getCompleteFromTable}
   */
  public override getFullTableName(): string {
    return super.getFullTableName();
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.getCompleteTableName}
   */
  public override getTableNameWithPrefix(tableName: string): string {
    return super.getTableNameWithPrefix(tableName);
  }

  ///////////////////////         QueryBuilder         ///////////////////////

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.valueOf}
   */
  public override valueOf() {
    return super.valueOf();
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.toString}
   */
  public override toString(): string {
    return super.toString();
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.build}
   */
  public override build(): QueryBuildResult {
    return super.build();
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.buildQueryString}
   */
  public override buildQueryString(): string {
    return `${super.buildQueryString()} RETURNING *`;
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.buildQueryValues}
   */
  public override buildQueryValues(): readonly any[] {
    return super.buildQueryValues();
  }

  /**
   * @inheritDoc
   * @see {@link InsertQueryBuilder.getQueryValueFactories}
   */
  public override getQueryValueFactories(): readonly QueryValueFactory[] {
    return super.getQueryValueFactories();
  }
}
