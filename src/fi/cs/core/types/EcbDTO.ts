import {
  CurrencyRates,
  explainCurrencyRates,
  isCurrencyRates,
} from './CurrencyRates';
import {Currency} from './Currency';
import {explain, explainProperty} from './explain';
import {objectKey} from './RegularObject';
import {explainRegularObject, isRegularObject} from './RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from './OtherKeys';

/**
 * ECB backend's DTO containing euro exchange rates
 */
export interface EcbDTO {
  readonly [Currency.EUR]: CurrencyRates;
}

export function createEcbDTO(eurRates: CurrencyRates): EcbDTO {
  return {
    [Currency.EUR]: eurRates,
  };
}

export function isEcbDTO(value: unknown): value is EcbDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [Currency.EUR]) &&
    isCurrencyRates(value[Currency.EUR])
  );
}

export function explainEcbDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [Currency.EUR]),
    explainProperty(
      Currency.EUR,
      explainCurrencyRates(objectKey(value, Currency.EUR)),
    ),
  ]);
}

export function stringifyEcbDTO(value: EcbDTO): string {
  return `EcbDTO(${value})`;
}

export function parseEcbDTO(value: unknown): EcbDTO | undefined {
  if (isEcbDTO(value)) return value;
  return undefined;
}
