import AllVehicleFinderMock from '../../../Vehicle/__mocks__/AllVehicleFinderMock';
import LatestCurrenciesRatesFinderMock from '../../../CurrencyRates/__mocks__/LatestCurrenciesRatesFinderMock';
import VehiclesPricesRepositoryMock from '../../__mocks__/VehiclesPricesRepositoryMock';
import LastVehiclesPricesInsert from '../../../../../../src/contexts/Backoffice/VehiclesPrices/application/Insert/LastVehiclesPricesInsert';
import { v4 as uuid } from 'uuid';
import { Vehicle } from '../../../../../../src/contexts/Backoffice/Vehicle/domain/Vehicle';
import { Prisma } from '@prisma/client';
import CurrenciesRate from '../../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrenciesRate';
import VehiclesPrices from '../../../../../../src/contexts/Backoffice/VehiclesPrices/domain/VehiclesPrices';
import { container } from '../../../../../../src/Application/dependency-injection/container';
import Logger from '../../../../../../src/contexts/common/domain/Logger';

/**
 * @group unit
 */
describe('LastVehiclesPricesInsert', () => {
  const logger: Logger = container.resolve('logger');
  let allVehiclesFinderService: AllVehicleFinderMock;
  let latestCurrencyRatesService: LatestCurrenciesRatesFinderMock;
  let vehiclesPricesRepository: VehiclesPricesRepositoryMock;

  beforeEach(() => {
    allVehiclesFinderService = new AllVehicleFinderMock();

    latestCurrencyRatesService = new LatestCurrenciesRatesFinderMock();

    vehiclesPricesRepository = new VehiclesPricesRepositoryMock();
  });
  it('should inset the latest vehicles prices', async () => {
    const v1 = Vehicle.register({
      id: uuid(),
      plates: 'AC-121',
      vin: '3LN123456789G4564',
      brand: 'Toyota',
      vehicleType: 'SUV',
      price: new Prisma.Decimal(200320.0)
    });
    const v2 = Vehicle.register({
      id: uuid(),
      plates: 'AC-122',
      vin: '3LN123456789G4564',
      brand: 'Toyota',
      vehicleType: 'SUV',
      price: new Prisma.Decimal(21040.0)
    });

    const currenciesRates = CurrenciesRate.create({
      id: uuid(),
      date: new Date(),
      rates: [
        { code: 'GBP', rate: 56 },
        { code: 'USD', rate: 45 },
        { code: 'EUR', rate: 52 },
        { code: 'MXN', rate: 1000 }
      ]
    });

    const idVehiclesPrices = uuid();
    const dateVehiclesPrices = new Date();
    const vehiclesPrices = VehiclesPrices.calculateVehiclesPrices([v1, v2], currenciesRates);
    const view = VehiclesPrices.create({
      id: idVehiclesPrices,
      date: dateVehiclesPrices,
      vehiclesPrices
    });

    allVehiclesFinderService.returnOnRunCall([v1, v2]);
    latestCurrencyRatesService.returnOnRunCall(currenciesRates);
    const latestVehiclesPricesInsert = new LastVehiclesPricesInsert(
      allVehiclesFinderService,
      latestCurrencyRatesService,
      vehiclesPricesRepository,
      logger
    );

    await latestVehiclesPricesInsert.run(idVehiclesPrices, dateVehiclesPrices);
    logger.info(JSON.stringify(vehiclesPrices));
    allVehiclesFinderService.assertOnRunHaveBeenCalled();
    latestCurrencyRatesService.assertOnRunHaveBeenCalled();
    vehiclesPricesRepository.assertCreateHaveBeenCalledWith(view.toObject());
  });

  it('should not call create because not vehicles provided', async () => {
    const idVehiclesPrices = uuid();
    const dateVehiclesPrices = new Date();

    allVehiclesFinderService.returnOnRunCall([]);

    const latestVehiclesPricesInsert = new LastVehiclesPricesInsert(
      allVehiclesFinderService,
      latestCurrencyRatesService,
      vehiclesPricesRepository,
      logger
    );

    await latestVehiclesPricesInsert.run(idVehiclesPrices, dateVehiclesPrices);

    allVehiclesFinderService.assertOnRunHaveBeenCalled();
    latestCurrencyRatesService.assertOnRunNotHaveBeenCalled();
    vehiclesPricesRepository.assertCreateNotHaveBeenCalled();
  });
});
