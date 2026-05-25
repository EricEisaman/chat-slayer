import {Currency} from './Currency';
import {explain, explainProperty} from './explain';
import {explainNumber, isNumber} from './Number';
import {objectKey} from './RegularObject';
import {explainRegularObject, isRegularObject} from './RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from './OtherKeys';

export interface CurrencyRates {
  readonly [Currency.EUR]: number;
  readonly [Currency.USD]: number;
  readonly [Currency.GBP]: number;
}

export function createCurrencyRates(usd: number, gbp: number): CurrencyRates {
  return {
    [Currency.EUR]: 1,
    [Currency.USD]: usd,
    [Currency.GBP]: gbp,
  };
}

export function isCurrencyRates(value: unknown): value is CurrencyRates {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      Currency.EUR,
      Currency.USD,
      Currency.GBP,
    ]) &&
    isNumber(value[Currency.EUR]) &&
    isNumber(value[Currency.USD]) &&
    isNumber(value[Currency.GBP])
  );
}

export function explainCurrencyRates(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      Currency.EUR,
      Currency.USD,
      Currency.GBP,
    ]),
    explainProperty(
      Currency.EUR,
      explainNumber(objectKey(value, Currency.EUR)),
    ),
    explainProperty(
      Currency.USD,
      explainNumber(objectKey(value, Currency.USD)),
    ),
    explainProperty(
      Currency.GBP,
      explainNumber(objectKey(value, Currency.GBP)),
    ),
  ]);
}

export function stringifyCurrencyRates(value: CurrencyRates): string {
  if (!isCurrencyRates(value))
    throw new TypeError(`Not CurrencyRates: ${value}`);
  return `CurrencyRates(${value})`;
}

export function parseCurrencyRates(value: unknown): CurrencyRates | undefined {
  if (isCurrencyRates(value)) return value;
  return undefined;
}
