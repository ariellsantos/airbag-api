import VehiclePrices, { VehiclePricesType } from './VehiclePrices';
import { Vehicle } from '../../Vehicle/domain/Vehicle';
import CurrenciesRate from '../../CurrencyRates/domain/CurrenciesRate';
import { PriceVehicleType } from './PriceVehicle';

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

  static calculateVehiclesPrices(vehicles: Vehicle[], currencyRates: CurrenciesRate) {
    const vehiclesPrices: VehiclePricesType[] = vehicles.map(v => {
      const prices = currencyRates.currencies.map((c): PriceVehicleType => {
        return {
          code: c.code,
          price: v.convertPriceToCurrency(c.rate)
        };
      });
      return {
        id: v.id,
        date: currencyRates.date,
        prices
      };
    });
    return vehiclesPrices;
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
