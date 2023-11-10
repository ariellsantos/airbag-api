import { VehicleRepository } from '../../domain/VehicleRepository';

export type ResponseVehicleFinder = {
  id: string;
  plates: string;
  vin: string;
  brand: string;
  vehicleType: string;
  price: string;
};
export class VehicleFinder {
  constructor(private readonly vehicleRepository: VehicleRepository) {}
  async run(info: { id: string }): Promise<ResponseVehicleFinder> {
    const vehicle = await this.vehicleRepository.findOne(info.id);
    return {
      id: vehicle.id,
      plates: vehicle.plates,
      vin: vehicle.vin,
      brand: vehicle.brand,
      vehicleType: vehicle.vehicleType,
      price: vehicle.price.toFixed()
    };
  }
}
