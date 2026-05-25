import {explainEnum} from './Enum';

/**
 * ISO 4217 code for currencies
 */
export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}

export function isCurrency(value: unknown): value is Currency {
  switch (value) {
    case Currency.EUR:
    case Currency.USD:
    case Currency.GBP:
      return true;
    default:
      return false;
  }
}

export function explainCurrency(value: unknown): string {
  return explainEnum('Currency', Currency, isCurrency, value);
}

export function stringifyCurrency(value: Currency): string {
  switch (value) {
    case Currency.EUR:
      return 'EUR';
    case Currency.USD:
      return 'USD';
    case Currency.GBP:
      return 'GBP';
  }
  throw new TypeError(`Unsupported Currency value: ${value}`);
}

export function parseCurrency(value: unknown): Currency | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toUpperCase()) {
    case 'EUR':
      return Currency.EUR;
    case 'USD':
      return Currency.USD;
    case 'GBP':
      return Currency.GBP;
    default:
      return undefined;
  }
}
