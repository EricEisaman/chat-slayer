import {FunctionQueryBuilder} from '../../types/FunctionQueryBuilder';
import {PgArgumentListBuilder} from './PgArgumentList';

/**
 * This generates formulas like `ROW(table.column[, table2.column2, ...])`
 */
export class PgRowBuilder extends FunctionQueryBuilder {
  private readonly _arguments: PgArgumentListBuilder;

  public constructor() {
    super(false, 'ROW');
    this._arguments = new PgArgumentListBuilder();
    this.setFormulaFromQueryBuilder(this._arguments);
  }

  public override valueOf() {
    return this.toString();
  }

  public override toString(): string {
    return `PgRowBuilder "${this.buildQueryString()}" with ${this.buildQueryValues()
      .map(item => item())
      .join(' ')}`;
  }

  /**
   *
   * @param tableName The table name from where to read the value
   * @param columnName The column name in the table where to read the value
   */
  public setTableColumn(tableName: string, columnName: string) {
    this._arguments.setTableColumn(tableName, columnName);
  }

  public static override create(): PgRowBuilder {
    return new PgRowBuilder();
  }
}
