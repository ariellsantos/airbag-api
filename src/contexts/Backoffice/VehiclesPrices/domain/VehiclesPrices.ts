import VehiclePrices, { VehiclePricesType } from './VehiclePrices';

export type VehiclesPricesType = {
  id: string;
  date: Date;
  vehiclesPrices: VehiclePricesType[];
};

export default class VehiclesPrices {
  constructor(
    readonly id: string,
    readonly date: Date,
    readonly vehiclesPrices: VehiclePrices[]
  ) {}

  static create(data: VehiclesPricesType) {
    return new VehiclesPrices(
      data.id,
      data.date,
      data.vehiclesPrices.map(e => {
        return VehiclePrices.create({
          id: e.id,
          date: e.date,
          prices: e.prices
        });
      })
    );
  }

  toObject(): VehiclesPricesType {
    return {
      id: this.id,
      date: this.date,
      vehiclesPrices: this.vehiclesPrices.map(e => {
        return e.toObject();
      })
    };
  }
}
