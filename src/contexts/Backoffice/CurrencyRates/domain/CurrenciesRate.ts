import CurrencyRate, { CurrencyRateType } from './CurrencyRate';

export type CurrenciesRateType = {
  id: string;
  date: Date;
  rates: CurrencyRateType[];
};
export default class CurrenciesRate {
  constructor(
    readonly id: string,
    readonly currencies: CurrencyRate[],
    readonly date: Date
  ) {}

  static create(info: CurrenciesRateType): CurrenciesRate {
    return new CurrenciesRate(
      info.id,
      info.rates.map(e => {
        return new CurrencyRate(e.code, e.rate);
      }),
      info.date
    );
  }
  toObject(): CurrenciesRateType {
    const resp: CurrenciesRateType = {
      id: this.id,
      date: this.date,
      rates: this.currencies.map(c => {
        return c.toObject();
      })
    };
    return resp;
  }
}
