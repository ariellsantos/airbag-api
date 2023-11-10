import { v4 as uuid } from 'uuid';
import { Prisma } from '@prisma/client';
import { VehicleRepositoryMock } from '../../__mocks__/VehicleRepositoryMock';
import { VehicleCreator } from '../../../../../../src/contexts/Backoffice/Vehicle/application/Create/VehicleCreator';
import { VehicleType } from '../../../../../../src/contexts/Backoffice/Vehicle/domain/Vehicle';

describe('VehicleCreator', () => {
  let vehicleRepository: VehicleRepositoryMock;

  beforeEach(() => {
    vehicleRepository = new VehicleRepositoryMock();
  });
  it('should register a new vehicle', async () => {
    const id = uuid();
    const plates = 'AC-121';
    const vin = '3LN123456789G4564';
    const vehicleType = 'SUV';
    const brand = 'Toyota';
    const price = new Prisma.Decimal(20000.0);

    const vehicleCreator = new VehicleCreator(vehicleRepository);
    const vehicleInfo: VehicleType = {
      id,
      plates,
      vin,
      price,
      brand,
      vehicleType
    };
    await vehicleCreator.run(vehicleInfo);

    vehicleRepository.assertCreateHasBeenCalledWith(vehicleInfo);
  });
});
