import { Prisma } from '@prisma/client';

export class VehicleTypeMap {
  create: Prisma.VehicleCreateArgs;
  delete: Prisma.VehicleUpdateArgs;
  findFirst: Prisma.VehicleFindFirstArgs;
  findMany: Prisma.VehicleFindManyArgs;
  findUnique: Prisma.VehicleFindUniqueArgs;
  update: Prisma.VehicleUpdateArgs;
  findUniqueOrThrow: Prisma.VehicleFindUniqueOrThrowArgs;
}
