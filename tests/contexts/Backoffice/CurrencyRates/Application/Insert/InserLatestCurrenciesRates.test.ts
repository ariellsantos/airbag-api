import { container } from '../../../../../../src/Application/dependency-injection/container';
import InsertLastCurrenciesRate from '../../../../../../src/contexts/Backoffice/CurrencyRates/application/Insert/InsertLastCurrenciesRate';
import { v4 as uuid } from 'uuid';
import { CurrenciesRateRepository } from '../../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrenciesRateRepository';
import ExchangeServiceMock from '../../__mocks__/ExchangeServiceMock';
import CurrenciesRateRepositoryMock from '../../__mocks__/CurrenciesRateRepositoryMock';
import CurrencyRate from '../../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrencyRate';
import { generateRandomRate } from '../../domain/utils';
import { CurrenciesRateType } from '../../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrenciesRate';

/**
 * @group integration
 */
describe('InsertLatestCurrenciesRates', () => {
  it('Should insert new currencies rates', async () => {
    const insertLatestCurrenciesRates: InsertLastCurrenciesRate = container.resolve('insertLastCurrenciesRateService');
    const currenciesRatesRepository: CurrenciesRateRepository = container.resolve('currenciesRateRepository');

    const id = uuid();
    const date = new Date();
    await insertLatestCurrenciesRates.run(id, date);
    const lastCurrenciesRate = await currenciesRatesRepository.findLast();

    expect(lastCurrenciesRate.id).toBe(id);
  });
});

/**
 * @group unit
 */
describe('InsertLatestCurrenciesRates', () => {
  const logger = container.resolve('logger');
  it('Should insert new currencies rates', async () => {
    const currencyCodes = ['MXN', 'GBP', 'USD', 'EUR'];

    const currenciesRates = [
      new CurrencyRate('EUR', generateRandomRate()),
      new CurrencyRate('GBP', generateRandomRate()),
      new CurrencyRate('USD', generateRandomRate()),
      new CurrencyRate('MXN', 1)
    ];

    const id = uuid();
    const date = new Date();

    const currenciesInfo: CurrenciesRateType = {
      id,
      date,
      rates: currenciesRates.map(c => {
        return c.toObject();
      })
    };

    const exchangeService = new ExchangeServiceMock();

    exchangeService.returnOnGetLastCurrencyRates(currenciesRates);
    const currenciesRateRepository = new CurrenciesRateRepositoryMock();

    const insertLatestCurrenciesRateService = new InsertLastCurrenciesRate(
      exchangeService,
      currenciesRateRepository,
      logger
    );

    await insertLatestCurrenciesRateService.run(id, date);

    exchangeService.assertGetLastCurrencyRatesCalledWith(...currencyCodes);
    currenciesRateRepository.assertCreateHasBeenCalledWith(currenciesInfo);
  });
});
