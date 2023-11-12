import { Prisma } from '../../../../../../../prisma-mongo/client/';

export class CurrenciesRateTypeMap {
  create: Prisma.CurrenciesRateCreateArgs;
  delete: Prisma.CurrenciesRateUpdateArgs;
  findFirst: Prisma.CurrenciesRateFindFirstArgs;
  findMany: Prisma.CurrenciesRateFindManyArgs;
  findUnique: Prisma.CurrenciesRateFindUniqueArgs;
  update: Prisma.CurrenciesRateUpdateArgs;
  findUniqueOrThrow: Prisma.CurrenciesRateFindUniqueOrThrowArgs;
}
