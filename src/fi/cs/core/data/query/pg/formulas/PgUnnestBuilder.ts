import {FunctionQueryBuilder} from '../../types/FunctionQueryBuilder';
import {QueryBuilder} from '../../types/QueryBuilder';

/**
 * This generates formulas like `unnest(formula)`
 */
export class PgUnnestBuilder extends FunctionQueryBuilder {
  public constructor() {
    super(false, 'unnest');
  }

  public override valueOf() {
    return this.toString();
  }

  public override toString(): string {
    return `PgUnnestBuilder "${this.buildQueryString()}" with ${this.buildQueryValues()
      .map(item => item())
      .join(' ')}`;
  }

  public static override create(builder: QueryBuilder): PgUnnestBuilder {
    const f = new PgUnnestBuilder();
    f.setFormulaFromQueryBuilder(builder);
    return f;
  }
}
