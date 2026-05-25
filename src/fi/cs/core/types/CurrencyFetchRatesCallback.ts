import {CurrencyRates} from './CurrencyRates';

export interface CurrencyFetchRatesCallback {
  (): Promise<CurrencyRates>;
}
