import { v4 as uuid } from 'uuid';
import { container } from '../../../../../../../src/Application/dependency-injection/container';
import VehiclesPrices, {
  VehiclesPricesType
} from '../../../../../../../src/contexts/Backoffice/VehiclesPrices/domain/VehiclesPrices';
import { Prisma } from '../../../../../../../prisma-mongo/client/';
import VehiclesPricesPrismaRepository from '../../../../../../../src/contexts/Backoffice/VehiclesPrices/infrastructure/persistence/prisma/VehiclePricesPrismaRepository';

const prismaConnection = container.resolve('prismaMongoClient');

const logger = container.resolve('logger');

/**
 * @group integration
 */
describe('VehiclesPricesPrismaRepository', () => {
  let vechiclesPricesRepository: VehiclesPricesPrismaRepository;
  beforeEach(() => {
    vechiclesPricesRepository = new VehiclesPricesPrismaRepository(prismaConnection, logger);
  });
  afterEach(async () => {
    // Todo: implement truncate info after tests finished
  });
  it('Should save a vehicle prices', async () => {
    const vehiclesPricesInfo: VehiclesPricesType = {
      id: uuid(),
      date: new Date(),
      vehiclesPrices: [
        {
          id: uuid(),
          date: new Date(),
          prices: [
            {
              code: 'USD',
              price: new Prisma.Decimal(2000.32)
            }
          ]
        }
      ]
    };
    JSON.stringify(vehiclesPricesInfo.vehiclesPrices);
    const c = VehiclesPrices.create(vehiclesPricesInfo);
    await vechiclesPricesRepository.create(c.toObject());
  });

  it('Should find the last inserted vehicle prices', async () => {
    const vehiclesPricesInfo: VehiclesPricesType = {
      id: uuid(),
      date: new Date(),
      vehiclesPrices: [
        {
          id: uuid(),
          date: new Date(),
          prices: [
            {
              code: 'USD',
              price: new Prisma.Decimal(2000.32)
            },
            {
              code: 'GBP',
              price: new Prisma.Decimal(20033.42)
            },
            {
              code: 'EUR',
              price: new Prisma.Decimal(30033.42)
            }
          ]
        }
      ]
    };

    const respExpected = {
      id: vehiclesPricesInfo.id,
      date: vehiclesPricesInfo.date,
      view: JSON.stringify(vehiclesPricesInfo.vehiclesPrices)
    };

    const c = VehiclesPrices.create(vehiclesPricesInfo);
    await vechiclesPricesRepository.create(c.toObject());
    const resp = await vechiclesPricesRepository.findLast();
    logger.info(JSON.stringify(resp));
    expect(resp).toStrictEqual(respExpected);
  });
});
