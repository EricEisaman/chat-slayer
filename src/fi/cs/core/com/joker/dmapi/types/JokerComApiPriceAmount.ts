import {trim} from '../../../../functions/trim';
import {
  explainNumber,
  explainNumberOrUndefined,
  isNumber,
  isNumberOrUndefined,
} from '../../../../types/Number';

export type JokerComApiPriceAmount = number;

export function isJokerComApiPriceAmount(
  value: unknown,
): value is JokerComApiPriceAmount {
  return isNumber(value);
}

export function explainJokerComApiPriceAmount(value: unknown): string {
  return explainNumber(value);
}

export function isJokerComApiPriceAmountOrUndefined(
  value: unknown,
): value is JokerComApiPriceAmount {
  return isNumberOrUndefined(value);
}

export function explainJokerComApiPriceAmountOrUndefined(
  value: unknown,
): string {
  return explainNumberOrUndefined(value);
}

export function parseJokerComApiPriceAmount(
  value: string,
): JokerComApiPriceAmount | undefined {
  if (trim(value) === '') return undefined;
  return parseFloat(value);
}
