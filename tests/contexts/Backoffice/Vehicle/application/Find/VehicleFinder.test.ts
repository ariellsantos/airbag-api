import { v4 as uuid } from 'uuid';
import { Vehicle, VehicleType } from '../../../../../../src/contexts/Backoffice/Vehicle/domain/Vehicle';
import { Prisma } from '@prisma/client';
import { VehicleRepositoryMock } from '../../__mocks__/VehicleRepositoryMock';
import {
  ResponseVehicleFinder,
  VehicleFinder
} from '../../../../../../src/contexts/Backoffice/Vehicle/application/Find/VehicleFinder';
import { ObjectNotFound } from '../../../../../../src/contexts/common/infrastructure/persistence/ObjectNotFound';

describe('VehicleFinder', () => {
  let vehicleRepository: VehicleRepositoryMock;

  beforeEach(() => {
    vehicleRepository = new VehicleRepositoryMock();
  });
  it('should return a vehicle registered', async () => {
    const id = uuid();
    const plates = 'AC-121';
    const vin = '3LN123456789G4564';
    const vehicleType = 'SUV';
    const brand = 'Toyota';
    const price = new Prisma.Decimal(20000.0);

    const vehicleInfo: VehicleType = { id, plates, vin, vehicleType, brand, price };

    const vehicleResp: ResponseVehicleFinder = { id, plates, vin, vehicleType, brand, price: price.toFixed() };

    vehicleRepository.returnOnFindOne(
      new Vehicle(
        vehicleInfo.id,
        vehicleInfo.plates,
        vehicleInfo.vin,
        vehicleInfo.brand,
        vehicleInfo.vehicleType,
        vehicleInfo.price
      )
    );

    const vehicleFinder = new VehicleFinder(vehicleRepository);

    const resp = await vehicleFinder.run({ id });
    expect(resp).toEqual(vehicleResp);
  });

  it('should throw an error because vehicle is not registered', async () => {
    const id = uuid();
    const error = new ObjectNotFound('Object does not exist');
    vehicleRepository.throwErrorOnFindOne(error);

    const vehicleFinder = new VehicleFinder(vehicleRepository);
    await expect(async () => {
      await vehicleFinder.run({ id });
    }).rejects.toThrowError(error);

    vehicleRepository.assertFindOneHasBeenCalledWith(id);
  });
});
