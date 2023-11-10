import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaOrmRepository } from '../../../../../common/infrastructure/persistence/prisma/PrismaOrmRepository';
import { VehicleTypeMap } from './VehicleTypeMap';
import { Vehicle, VehicleType } from '../../../domain/Vehicle';
import { VehicleDataMapper } from './VehicleDataMapper';
import { ObjectNotFound } from '../../../../../common/infrastructure/persistence/ObjectNotFound';

export default class VehiclePrismaRepository extends PrismaOrmRepository<
  Prisma.VehicleDelegate,
  VehicleTypeMap,
  VehicleType,
  Vehicle
> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient.vehicle);
  }

  async findOne(id: string) {
    try {
      const vehicle = await this.findUniqueOrThrows({
        where: {
          id,
          deleted: false
        }
      });
      return VehicleDataMapper.mapOne(vehicle);
    } catch (error) {
      throw new ObjectNotFound(`Object does not exist`);
    }
  }
}
