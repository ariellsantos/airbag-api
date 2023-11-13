import LatestCurrenciesRatesFinder from '../../../../../../src/contexts/Backoffice/CurrencyRates/application/Find/LatestCurrenciesRatesFinder';
import CurrenciesRateRepositoryMock from '../../__mocks__/CurrenciesRateRepositoryMock';
import CurrenciesRate, {
  CurrenciesRateType
} from '../../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrenciesRate';
import CurrencyRate from '../../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrencyRate';
import { generateRandomRate } from '../../domain/utils';
import { v4 as uuid } from 'uuid';

/**
 * @group unit
 */
describe('FindRelationsNotFoundError', () => {
  it('should retrieve the latest currencies rates', async () => {
    const currenciesRates = [
      new CurrencyRate('EUR', generateRandomRate()),
      new CurrencyRate('GBP', generateRandomRate()),
      new CurrencyRate('USD', generateRandomRate())
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

    const currenciesRate = CurrenciesRate.create(currenciesInfo);

    const currenciesRatesRepository = new CurrenciesRateRepositoryMock();

    currenciesRatesRepository.returnOnFinLast(currenciesRate);

    const latesCurrenciesRatesFinderService = new LatestCurrenciesRatesFinder(currenciesRatesRepository);

    const latestCurrenciesRates = await latesCurrenciesRatesFinderService.run();
    currenciesRatesRepository.assertFindOneHasBeenCalled();
    expect(latestCurrenciesRates).toBe(currenciesRate);
  });
});
