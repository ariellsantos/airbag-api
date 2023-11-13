import PriceVehicle, { PriceVehicleType } from './PriceVehicle';

export type VehiclePricesType = {
  id: string;
  date: Date;
  prices: PriceVehicleType[];
};

export default class VehiclePrices {
  constructor(
    readonly id: string,
    readonly date: Date,
    readonly prices: PriceVehicle[]
  ) {}

  static create(data: VehiclePricesType): VehiclePrices {
    return new VehiclePrices(
      data.id,
      data.date,
      data.prices.map((e): PriceVehicle => {
        return PriceVehicle.create({ price: e.price, code: e.code });
      })
    );
  }

  toObject(): VehiclePricesType {
    return {
      id: this.id,
      date: this.date,
      prices: this.prices.map(e => {
        return e.toObject();
      })
    };
  }
}
