import { CurrenciesRateRepository } from '../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrenciesRateRepository';
import CurrenciesRate, {
  CurrenciesRateType
} from '../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrenciesRate';

export default class CurrenciesRateRepositoryMock implements CurrenciesRateRepository {
  private mockCreate = jest.fn();
  private mockFindLast = jest.fn();

  returnOnFinLast(currenciesRate: CurrenciesRate) {
    this.mockFindLast.mockImplementation(() => {
      return currenciesRate;
    });
  }

  async create(data: CurrenciesRateType): Promise<void> {
    this.mockCreate(data);
  }

  async findLast(): Promise<CurrenciesRate> {
    return this.mockFindLast();
  }

  async delete(id: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async findOne(id: string): Promise<CurrenciesRate> {
    throw new Error('Not implemented');
  }

  assertFindOneHasBeenCalled() {
    expect(this.mockFindLast).toHaveBeenCalled();
  }

  assertCreateHasBeenCalledWith(data: CurrenciesRateType) {
    expect(this.mockCreate).toHaveBeenCalledWith(data);
  }
}
