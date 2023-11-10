import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaOrmRepository } from '../../../../../common/infrastructure/persistence/prisma/PrismaOrmRepository';
import { ObjectNotFound } from '../../../../../common/infrastructure/persistence/ObjectNotFound';
import { DriverTypeMap } from './DriverTypeMap';
import Driver, { DriverType } from '../../../domain/Driver';
import { DriverDataMapper } from './DriverDataMapper';

export default class DriverPrismaRepository extends PrismaOrmRepository<
  Prisma.DriverDelegate,
  DriverTypeMap,
  DriverType,
  Driver
> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient.driver);
  }

  async findOne(id: string): Promise<Driver> {
    try {
      const driver = await this.findUniqueOrThrows({
        where: {
          id,
          deleted: false
        }
      });
      return DriverDataMapper.mapOne(driver);
    } catch (error) {
      throw new ObjectNotFound(`Object does not exist`);
    }
  }
}
