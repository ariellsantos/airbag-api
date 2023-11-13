import { v4 as uuid } from 'uuid';
import { Prisma } from '@prisma/client';
import { generateRandomRate } from '../../../CurrencyRates/domain/utils';
import { Vehicle } from '../../../../../../src/contexts/Backoffice/Vehicle/domain/Vehicle';
import AllVehiclesFinder from '../../../../../../src/contexts/Backoffice/Vehicle/application/Find/AllVehiclesFinder';
import { VehicleRepositoryMock } from '../../__mocks__/VehicleRepositoryMock';

/**
 * @group unit
 */
describe('AllVehiclesFinder', () => {
  let vehicleRepository: VehicleRepositoryMock;

  beforeEach(() => {
    vehicleRepository = new VehicleRepositoryMock();
  });

  it('should return a list of Vehicle', async () => {
    const id = uuid();
    const plates = 'AC-121';
    const vin = '3LN123456789G4564';
    const vehicleType = 'SUV';
    const brand = 'Toyota';
    const price = new Prisma.Decimal(generateRandomRate());

    const arrVehicles: Vehicle[] = [];
    for (let i = 0; i < 4; i++) {
      arrVehicles.push(new Vehicle(id, plates, vin, brand, vehicleType, price));
    }

    vehicleRepository.returnOnFindAll(arrVehicles);

    const allVehiclesFinder = new AllVehiclesFinder(vehicleRepository);

    const respVehicles = await allVehiclesFinder.run();

    vehicleRepository.assertFindAllHasBeenCalled();
    expect(respVehicles).toBe(arrVehicles);
  });
});
