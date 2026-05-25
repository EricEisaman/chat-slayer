import {BaseUpdateQueryBuilder} from '../../sql/update/BaseUpdateQueryBuilder';
import {
  QueryBuilder,
  QueryBuildResult,
  QueryStringFactory,
  QueryValueFactory,
} from '../../types/QueryBuilder';
import {PgQueryUtils} from '../utils/PgQueryUtils';

export class PgUpdateQueryBuilder extends BaseUpdateQueryBuilder {
  protected constructor() {
    super();
    this.addPrefixFactory(
      () =>
        `UPDATE ${PgQueryUtils.quoteTableName(this.getCompleteTableName())}`,
    );
  }

  public static create(): PgUpdateQueryBuilder {
    return new PgUpdateQueryBuilder();
  }

  ///////////////////////      BaseUpdateQueryBuilder      ///////////////////////

  ///////////////////////      UpdateQueryBuilder      ///////////////////////

  /**
   * @inheritDoc
   */
  public override addPrefixFactory(
    queryFactory: QueryStringFactory,
    ...valueFactories: readonly QueryValueFactory[]
  ): void {
    super.addPrefixFactory(queryFactory, ...valueFactories);
  }

  /**
   * @inheritDoc
   */
  public override addSetFactory(
    queryFactory: QueryStringFactory,
    ...valueFactories: readonly QueryValueFactory[]
  ): void {
    super.addSetFactory(queryFactory, ...valueFactories);
  }

  /**
   * @inheritDoc
   */
  public override appendSetListUsingQueryBuilder(builder: QueryBuilder): void {
    super.appendSetListUsingQueryBuilder(builder);
  }

  ///////////////////////      TablePrefixable      ///////////////////////

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.getTablePrefix}
   */
  public override getTablePrefix(): string {
    return super.getTablePrefix();
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.setTablePrefix}
   */
  public override setTablePrefix(prefix: string): void {
    super.setTablePrefix(prefix);
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.getTablePrefix}
   */
  public override getTableName(): string {
    return super.getTableName();
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.setFromTable}
   */
  public override setTableName(tableName: string): void {
    super.setTableName(tableName);
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.getCompleteFromTable}
   */
  public override getCompleteTableName(): string {
    return super.getCompleteTableName();
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.getCompleteTableName}
   */
  public override getTableNameWithPrefix(tableName: string): string {
    return super.getTableNameWithPrefix(tableName);
  }

  ///////////////////////         QueryBuilder         ///////////////////////

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.valueOf}
   */
  public override valueOf() {
    return super.valueOf();
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.toString}
   */
  public override toString(): string {
    return super.toString();
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.build}
   */
  public override build(): QueryBuildResult {
    return super.build();
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.buildQueryString}
   */
  public override buildQueryString(): string {
    return `${super.buildQueryString()} RETURNING *`;
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.buildQueryValues}
   */
  public override buildQueryValues(): readonly any[] {
    return super.buildQueryValues();
  }

  /**
   * @inheritDoc
   * @see {@link UpdateQueryBuilder.getQueryValueFactories}
   */
  public override getQueryValueFactories(): readonly QueryValueFactory[] {
    return super.getQueryValueFactories();
  }
}
