import LatestCurrenciesRatesFinderI from '../../../../../src/contexts/common/domain/LatestCurrenciesRatesFinderI';
import CurrenciesRate from '../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrenciesRate';

export default class LatestCurrenciesRatesFinderMock implements LatestCurrenciesRatesFinderI {
  private onRunMock = jest.fn();

  returnOnRunCall(currenciesRates: CurrenciesRate) {
    this.onRunMock.mockImplementation(() => {
      return currenciesRates;
    });
  }

  async run(): Promise<CurrenciesRate> {
    return this.onRunMock();
  }

  assertOnRunHaveBeenCalled() {
    expect(this.onRunMock).toHaveBeenCalled();
  }

  assertOnRunNotHaveBeenCalled() {
    expect(this.onRunMock).not.toHaveBeenCalled();
  }
}
