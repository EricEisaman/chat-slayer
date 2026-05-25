import {Condition} from './types/Condition';
import {WhereConditionTarget} from './types/WhereConditionTarget';
import {Where} from '../Where';

export class OrCondition extends Condition {
  private readonly _where: Where;

  protected constructor(where: Where) {
    super(WhereConditionTarget.create(where));
    this._where = where;
  }

  public override valueOf() {
    return this.toString();
  }

  public override toString() {
    return `OrCondition(${this._where
      .getConditions()
      .map(item => item.toString())
      .join(' or ')})`;
  }

  public getWhere(): Where {
    return this._where;
  }

  public static create(value: Where): OrCondition {
    return new OrCondition(value);
  }
}

export function isOrCondition(value: unknown): value is OrCondition {
  return value instanceof OrCondition;
}
