import CurrenciesRate from '../../Backoffice/CurrencyRates/domain/CurrenciesRate';

export default interface LatestCurrenciesRatesFinderI {
  run(): Promise<CurrenciesRate>;
}
