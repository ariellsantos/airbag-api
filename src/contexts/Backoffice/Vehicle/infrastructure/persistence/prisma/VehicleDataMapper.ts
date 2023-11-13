import { Prisma } from '@prisma/client';
import { Vehicle } from '../../../domain/Vehicle';

export type VehicleTypeDB = {
  id: string;
  plates: string;
  vin: string;
  brand: string;
  vehicleType: string;
  price: Prisma.Decimal;
};
export class VehicleDataMapper {
  static mapOne(data: VehicleTypeDB): Vehicle {
    return new Vehicle(data.id, data.plates, data.vin, data.brand, data.vehicleType, data.price);
  }

  static mapMany(data: VehicleTypeDB[]) {
    return data.map(vehicle => {
      return VehicleDataMapper.mapOne(vehicle);
    });
  }
}
