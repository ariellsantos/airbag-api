import { VehicleCreator } from '../../../contexts/Backoffice/Vehicle/application/Create/VehicleCreator';
import { Prisma } from '@prisma/client';

export type RegisterVehicleRequest = {
  id: string;
  plates: string;
  vin: string;
  brand: string;
  vehicleType: string;
  price: number;
};

export class PostCreateVehicleController {
  constructor(private readonly vehicleCreator: VehicleCreator) {}

  async exec(vehicleInfo: RegisterVehicleRequest): Promise<void> {
    await this.vehicleCreator.run({
      id: vehicleInfo.id,
      plates: vehicleInfo.plates,
      vin: vehicleInfo.vin,
      vehicleType: vehicleInfo.vehicleType,
      brand: vehicleInfo.brand,
      price: new Prisma.Decimal(vehicleInfo.price)
    });
  }
}
