import { CurrenciesRateRepository } from '../../domain/CurrenciesRateRepository';
import CurrenciesRate from '../../domain/CurrenciesRate';
import LatestCurrenciesRatesFinderI from '../../../../common/domain/LatestCurrenciesRatesFinderI';

export default class LatestCurrenciesRatesFinder implements LatestCurrenciesRatesFinderI {
  constructor(private readonly currenciesRateRepository: CurrenciesRateRepository) {}

  async run(): Promise<CurrenciesRate> {
    return await this.currenciesRateRepository.findLast();
  }
}
