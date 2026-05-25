import {Condition} from './types/Condition';
import {WhereConditionTarget} from './types/WhereConditionTarget';
import {Where} from '../Where';

export class AndCondition extends Condition {
  private readonly _where: Where;

  protected constructor(where: Where) {
    super(WhereConditionTarget.create(where));
    this._where = where;
  }

  public override valueOf() {
    return this.toString();
  }

  public override toString() {
    return `AndCondition(${this._where
      .getConditions()
      .map(item => item.toString())
      .join(' and ')})`;
  }

  public getWhere(): Where {
    return this._where;
  }

  public static create(value: Where): AndCondition {
    return new AndCondition(value);
  }
}

export function isAndCondition(value: unknown): value is AndCondition {
  return value instanceof AndCondition;
}
