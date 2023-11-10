import { VehicleRepository } from '../../domain/VehicleRepository';
import { Vehicle, VehicleType } from '../../domain/Vehicle';

export class VehicleCreator {
  constructor(private readonly vehicleRepository: VehicleRepository) {}
  async run(info: VehicleType) {
    const vehicle = Vehicle.register(info);
    await this.vehicleRepository.create(vehicle.toObject());
  }
}
