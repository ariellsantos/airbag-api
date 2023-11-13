import { Prisma } from '../../../../../prisma-mongo/client/';

export type PriceVehicleType = {
  price: Prisma.Decimal;
  code: string;
};

export default class PriceVehicle {
  constructor(
    readonly code: string,
    readonly price: Prisma.Decimal
  ) {}

  static create(data: PriceVehicleType): PriceVehicle {
    return new PriceVehicle(data.code, data.price);
  }

  toObject(): PriceVehicleType {
    return {
      code: this.code,
      price: this.price
    };
  }
}
