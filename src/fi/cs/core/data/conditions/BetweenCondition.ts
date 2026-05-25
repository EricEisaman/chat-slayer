import {Condition} from './types/Condition';
import {ConditionTarget} from './types/ConditionTarget';

export class BetweenCondition<T = any> extends Condition {
  private readonly _start: T;
  private readonly _end: T;

  protected constructor(target: ConditionTarget, start: T, end: T) {
    super(target);
    this._start = start;
    this._end = end;
  }

  public override valueOf() {
    return this.toString();
  }

  public override toString() {
    return `BetweenCondition(${this.getConditionTarget()} is between ${this._start} and ${this._end})`;
  }

  public getRangeStart(): T {
    return this._start;
  }

  public getRangeEnd(): T {
    return this._end;
  }

  public static create<T = any>(
    target: ConditionTarget,
    start: T,
    end: T,
  ): BetweenCondition<T> {
    return new BetweenCondition<T>(target, start, end);
  }
}

export function isBetweenCondition(
  value: unknown,
): value is BetweenCondition<any> {
  return value instanceof BetweenCondition;
}
