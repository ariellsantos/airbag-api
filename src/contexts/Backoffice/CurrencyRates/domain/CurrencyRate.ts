import { Prisma } from '@prisma/client';

export type CurrencyRateType = {
  code: string;
  rate: Prisma.Decimal;
};

export default class CurrencyRate {
  constructor(
    readonly code: string,
    readonly rate: Prisma.Decimal
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
