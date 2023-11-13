import { CurrenciesRateRepository } from '../../infrastructure/persistence/prisma/CurrenciesRateRepository';
import CurrenciesRate from '../../domain/CurrenciesRate';

export default class LatestCurrenciesRatesFinder {
  constructor(private readonly currenciesRateRepository: CurrenciesRateRepository) {}

  async run(): Promise<CurrenciesRate> {
    return await this.currenciesRateRepository.findLast();
  }
}
