export type CurrencyRateType = {
  code: string;
  rate: number;
};

export default class CurrencyRate {
  constructor(
    readonly code: string,
    readonly rate: number
  ) {}

  fromObject(data: CurrencyRateType): CurrencyRate {
    return new CurrencyRate(data.code, data.rate);
  }

  toObject(): CurrencyRateType {
    return {
      code: this.code,
      rate: this.rate
    };
  }
}
