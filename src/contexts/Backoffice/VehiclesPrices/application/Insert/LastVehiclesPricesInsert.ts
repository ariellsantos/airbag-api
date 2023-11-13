import VehiclesPrices from '../../domain/VehiclesPrices';

import { VehiclesPricesRepository } from '../../domain/VehiclesPricesRepository';
import AllVehiclesFinderI from '../../../../common/domain/AllVehiclesFinderI';
import LatestCurrenciesRatesFinderI from '../../../../common/domain/LatestCurrenciesRatesFinderI';
import Logger from '../../../../common/domain/Logger';

export default class LastVehiclesPricesInsert {
  constructor(
    private readonly allVehiclesFinderService: AllVehiclesFinderI,
    private readonly latestCurrenciesRatesFinderService: LatestCurrenciesRatesFinderI,
    private readonly vehiclesPricesRepository: VehiclesPricesRepository,
    private readonly logger: Logger
  ) {}

  async run(id: string, date: Date) {
    const vehicles = await this.allVehiclesFinderService.run();
    this.logger.debug('before vehicles');
    if (vehicles.length === 0) {
      return;
    }
    const currencyRates = await this.latestCurrenciesRatesFinderService.run();

    const vehiclesPrices = VehiclesPrices.calculateVehiclesPrices(vehicles, currencyRates);

    const view = VehiclesPrices.create({
      id,
      date,
      vehiclesPrices
    });

    await this.vehiclesPricesRepository.create(view.toObject());
  }
}
