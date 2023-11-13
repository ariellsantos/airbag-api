import CurrencyRate from './CurrencyRate';

export default interface CurrencyExchangeRateService {
  getLastCurrencyRates(...currencies: string[]): Promise<CurrencyRate[]>;
}
