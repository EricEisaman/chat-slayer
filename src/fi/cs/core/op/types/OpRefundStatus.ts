import {explainEnum, isEnum, parseEnum, stringifyEnum} from '../../types/Enum';
import {explainNot, explainOk, explainOr} from '../../types/explain';
import {isUndefined} from '../../types/undefined';

export enum OpRefundStatus {
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
}

export function isOpRefundStatus(value: unknown): value is OpRefundStatus {
  return isEnum(OpRefundStatus, value);
}

export function explainOpRefundStatus(value: unknown): string {
  return explainEnum('RefundStatus', OpRefundStatus, isOpRefundStatus, value);
}

export function stringifyOpRefundStatus(value: OpRefundStatus): string {
  return stringifyEnum(OpRefundStatus, value);
}

export function parseOpRefundStatus(
  value: unknown,
): OpRefundStatus | undefined {
  return parseEnum(OpRefundStatus, value, true, true) as
    | OpRefundStatus
    | undefined;
}

export function isOpRefundStatusOrUndefined(
  value: unknown,
): value is OpRefundStatus | undefined {
  return isUndefined(value) || isOpRefundStatus(value);
}

export function explainOpRefundStatusOrUndefined(value: unknown): string {
  return isOpRefundStatusOrUndefined(value)
    ? explainOk()
    : explainNot(explainOr(['RefundStatus', 'undefined']));
}
