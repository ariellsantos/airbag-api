import CurrenciesRate from '../../../domain/CurrenciesRate';
import CurrencyRate from '../../../domain/CurrencyRate';
import { CurrenciesRateTypeDB } from './CurrenciesRatePrismaRepository';

export class CurrenciesRateDataMapper {
  static mapOne(data: CurrenciesRateTypeDB): CurrenciesRate {
    return new CurrenciesRate(
      data.id,
      data.rates.map(c => {
        return new CurrencyRate(c.code, c.rate);
      }),
      data.date
    );
  }
}
