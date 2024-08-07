import CurrencyExchangeRateService from '../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrencyExchangeRateService';
import CurrencyRate from '../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrencyRate';

export default class ExchangeServiceMock implements CurrencyExchangeRateService {
  private mockGetLastCurrencyRates = jest.fn();

  returnOnGetLastCurrencyRates(currencies: CurrencyRate[]) {
    this.mockGetLastCurrencyRates.mockImplementation(() => {
      return currencies;
    });
  }

  async getLastCurrencyRates(...currencies: string[]): Promise<CurrencyRate[]> {
    return this.mockGetLastCurrencyRates(currencies);
  }

  assertGetLastCurrencyRatesCalledWith(...currencies: string[]) {
    expect(this.mockGetLastCurrencyRates).toBeCalledWith(currencies);
  }
}
