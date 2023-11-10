import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaOrmRepository } from '../../../../../common/infrastructure/persistence/prisma/PrismaOrmRepository';
import { DriverTypeMap } from './DriverTypeMap';

export default class DriverPrismaRepository extends PrismaOrmRepository<Prisma.VehicleDelegate, DriverTypeMap> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient.vehicle);
  }
}
