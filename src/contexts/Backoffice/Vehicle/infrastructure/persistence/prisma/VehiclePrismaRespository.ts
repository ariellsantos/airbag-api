import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaOrmRepository } from '../../../../../common/infrastructure/persistence/prisma/PrismaOrmRepository';
import { VehicleTypeMap } from './VehicleTypeMap';
import { Vehicle, VehicleType } from '../../../domain/Vehicle';
import { VehicleDataMapper } from './VehicleDataMapper';
import { ObjectNotFound } from '../../../../../common/infrastructure/persistence/ObjectNotFound';
import { VehicleRepository } from '../../../domain/VehicleRepository';
import Logger from '../../../../../common/domain/Logger';

export default class VehiclePrismaRepository
  extends PrismaOrmRepository<Prisma.VehicleDelegate, VehicleTypeMap, VehicleType, Vehicle>
  implements VehicleRepository
{
  constructor(
    prismaClient: PrismaClient,
    private readonly logger: Logger
  ) {
    super(prismaClient.vehicle);
  }

  async findOne(id: string): Promise<Vehicle> {
    try {
      const vehicle = await this.findUniqueOrThrows({
        where: {
          id,
          deleted: false
        }
      });
      return VehicleDataMapper.mapOne(vehicle);
    } catch (error) {
      this.logger.error(error as Error);
      throw new ObjectNotFound(`Object does not exist`);
    }
  }
}
