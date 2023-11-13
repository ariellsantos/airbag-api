import { Prisma } from '../../../../../../../prisma-mongo/client/';

export class VehiclePricesTypeMap {
  create: Prisma.VehiclePricesCreateArgs;
  delete: Prisma.VehiclePricesUpdateArgs;
  findFirst: Prisma.VehiclePricesFindFirstArgs;
  findMany: Prisma.VehiclePricesFindManyArgs;
  findUnique: Prisma.VehiclePricesFindUniqueArgs;
  update: Prisma.VehiclePricesUpdateArgs;
  findUniqueOrThrow: Prisma.VehiclePricesFindUniqueOrThrowArgs;
}
