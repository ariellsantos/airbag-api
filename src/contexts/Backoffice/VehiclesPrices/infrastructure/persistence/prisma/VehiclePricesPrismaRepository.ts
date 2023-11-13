import { Prisma, PrismaClient } from '../../../../../../../prisma-mongo/client/';

import { PrismaOrmRepository } from '../../../../../common/infrastructure/persistence/prisma/PrismaOrmRepository';
import Logger from '../../../../../common/domain/Logger';

import { VehiclePricesTypeMap } from './VehiclePricesTypeMap';
import VehiclesPrices, { VehiclesPricesType } from '../../../domain/VehiclesPrices';
import { VehiclesPricesRepository } from '../../../domain/VehiclesPricesRepository';

export type VehiclesPricesTypeDB = {
  id: string;
  date: Date;
  view: string;
};

export default class VehiclesPricesPrismaRepository
  extends PrismaOrmRepository<Prisma.VehiclePricesDelegate, VehiclePricesTypeMap, VehiclesPricesType, VehiclesPrices>
  implements VehiclesPricesRepository
{
  constructor(
    protected readonly prismaMongoClient: PrismaClient,
    private readonly logger: Logger
  ) {
    super(prismaMongoClient.vehiclePrices);
  }

  async create(data: VehiclesPricesType): Promise<void> {
    this.logger.info(`saving vehicles prices ates ${JSON.stringify(data)}`);
    await this.delegate.create({
      data: {
        date: data.date,
        id: data.id,
        view: JSON.stringify(data.vehiclesPrices)
      }
    });
  }

  async findLast(): Promise<VehiclesPricesTypeDB> {
    const vehiclesPrices: VehiclesPricesTypeDB = await this.delegate.findFirstOrThrow({
      orderBy: {
        date: 'desc'
      }
    });
    return vehiclesPrices;
  }
}
