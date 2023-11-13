import { VehicleRepository } from '../../domain/VehicleRepository';
import { Vehicle } from '../../domain/Vehicle';
import AllVehiclesFinderI from '../../../../common/domain/AllVehiclesFinderI';

export default class AllVehiclesFinder implements AllVehiclesFinderI {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async run(): Promise<Vehicle[] | []> {
    return await this.vehicleRepository.findAll();
  }
}
