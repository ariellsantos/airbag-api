import CurrencyExchangeRateService from '../../domain/CurrencyExchangeRateService';
import { CurrenciesRateRepository } from '../../infrastructure/persistence/prisma/CurrenciesRateRepository';
import CurrenciesRate, { CurrenciesRateType } from '../../domain/CurrenciesRate';
import Logger from '../../../../common/domain/Logger';

export default class InsertLastCurrenciesRate {
  constructor(
    private readonly exchangeService: CurrencyExchangeRateService,
    private readonly currenciesRateRepository: CurrenciesRateRepository,
    private readonly logger: Logger
  ) {}

  async run(id: string, date: Date): Promise<void> {
    const currenciesRates = await this.exchangeService.getLastCurrencyRates('MXN', 'GBP', 'USD', 'EUR');
    this.logger.info(`Currencies rates ${JSON.stringify(currenciesRates)}`);
    const currenciesRateInfo: CurrenciesRateType = {
      id,
      date,
      rates: currenciesRates.map(c => {
        return c.toObject();
      })
    };

    const currenciesRate = CurrenciesRate.create(currenciesRateInfo);

    await this.currenciesRateRepository.create(currenciesRate.toObject());
  }
}
