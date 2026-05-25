import {FunctionQueryBuilder} from '../../types/FunctionQueryBuilder';
import {QueryBuilder} from '../../types/QueryBuilder';

/**
 * This generates formulas like `array_agg([DISTINCT] formula)`
 */
export class PgJsonAggBuilder extends FunctionQueryBuilder {
  protected constructor(distinct: boolean, name: string) {
    super(distinct, name);
  }

  public static override create(
    builder: QueryBuilder,
    distinct: boolean,
  ): PgJsonAggBuilder {
    const f = new PgJsonAggBuilder(distinct, 'jsonb_agg');
    f.setFormulaFromQueryBuilder(builder);
    return f;
  }

  public override valueOf() {
    return this.toString();
  }

  public override toString(): string {
    return `PgJsonAggBuilder "${this.buildQueryString()}" with ${this.buildQueryValues()
      .map(item => item())
      .join(' ')}`;
  }
}
