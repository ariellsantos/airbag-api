import { v4 as uuid } from 'uuid';
import { container } from '../../../../../../../src/Application/dependency-injection/container';
import VehiclePrismaRepository from '../../../../../../../src/contexts/Backoffice/Vehicle/infrastructure/persistence/prisma/VehiclePrismaRespository';
import { Vehicle } from '../../../../../../../src/contexts/Backoffice/Vehicle/domain/Vehicle';
import { Prisma } from '@prisma/client';
import { ObjectNotFound } from '../../../../../../../src/contexts/common/infrastructure/persistence/ObjectNotFound';

const prismaConnection = container.resolve('prismaClient');

describe('VehiclePrismaRepository', () => {
  let vehicleRepository: VehiclePrismaRepository;
  beforeEach(async () => {
    vehicleRepository = new VehiclePrismaRepository(prismaConnection);
  });

  beforeEach(async () => {
    // Todo: implement truncate info after tests finished
  });

  it('Should create a new Vehicle', async () => {
    const vehicleInfo = {
      id: uuid(),
      plates: 'AC-121',
      vin: '3LN123456789G4564',
      vehicleType: 'SUV',
      brand: 'Toyota',
      price: new Prisma.Decimal(20000.0)
    };
    const vehicle = Vehicle.register(vehicleInfo);
    await vehicleRepository.create(vehicle.toObject());
  });
  it('should find a vehicle registered', async () => {
    const vehicleInfo = {
      id: uuid(),
      plates: 'AC-121',
      vin: '3LN123456789G4564',
      vehicleType: 'SUV',
      brand: 'Toyota',
      price: new Prisma.Decimal(20000.0)
    };
    const vehicle = Vehicle.register(vehicleInfo);
    await vehicleRepository.create(vehicle.toObject());

    const vehicleDb = await vehicleRepository.findOne(vehicle.id);
    expect(vehicleDb).toEqual(vehicleInfo);
  });

  it('should delete a vehicle ', async () => {
    const vehicleInfo = {
      id: uuid(),
      plates: 'AC-121',
      vin: '3LN123456789G4564',
      vehicleType: 'SUV',
      brand: 'Toyota',
      price: new Prisma.Decimal(20000.0)
    };
    const vehicle = Vehicle.register(vehicleInfo);
    await vehicleRepository.create(vehicle.toObject());
    await vehicleRepository.delete(vehicle.id);
    await expect(async () => {
      await vehicleRepository.findOne(vehicle.id);
    }).rejects.toThrowError(new ObjectNotFound(`Object does not exist`));
  });
});
