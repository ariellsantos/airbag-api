import { VehicleRepository } from '../../domain/VehicleRepository';
import { Vehicle } from '../../domain/Vehicle';

export default class AllVehiclesFinder {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async run(): Promise<Promise<Vehicle[]> | null> {
    return await this.vehicleRepository.findAll();
  }
}
