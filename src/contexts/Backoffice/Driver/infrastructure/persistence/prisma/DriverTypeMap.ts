import { Prisma } from '@prisma/client';

export class DriverTypeMap {
  create: Prisma.DriverCreateArgs;
  delete: Prisma.DriverUpdateArgs;
  findFirst: Prisma.DriverFindFirstArgs;
  findMany: Prisma.DriverFindManyArgs;
  findUnique: Prisma.DriverFindUniqueArgs;
  update: Prisma.DriverUpdateArgs;
  findUniqueOrThrow: Prisma.DriverFindUniqueOrThrowArgs;
}
