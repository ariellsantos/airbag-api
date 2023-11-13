import LatestVehiclePricesFinder from '../../../contexts/Backoffice/VehiclesPrices/application/Find/LatestVehiclePricesFinder';

export default class GetVehiclesPricesController {
  constructor(private readonly latestVehiclesPricesFinderService: LatestVehiclePricesFinder) {}

  async exec() {
    const resp = await this.latestVehiclesPricesFinderService.run();
    return {
      id: resp.id,
      date: resp.date,
      vehicles: JSON.parse(resp.view)
    };
  }
}
