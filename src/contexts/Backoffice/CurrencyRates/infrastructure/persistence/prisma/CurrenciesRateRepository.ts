import CurrenciesRate, { CurrenciesRateType } from '../../../domain/CurrenciesRate';

export interface CurrenciesRateRepository {
  findOne(id: string): Promise<CurrenciesRate>;

  delete(id: string): Promise<void>;

  create(data: CurrenciesRateType): Promise<void>;

  findLast(): Promise<CurrenciesRate>;
}
