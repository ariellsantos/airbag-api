import { VehiclesPricesRepository } from '../../domain/VehiclesPricesRepository';

export default class LatestVehiclePricesFinder {
  constructor(private readonly vehiclesPricesRepository: VehiclesPricesRepository) {}

  async run() {
    return await this.vehiclesPricesRepository.findLast();
  }
}
