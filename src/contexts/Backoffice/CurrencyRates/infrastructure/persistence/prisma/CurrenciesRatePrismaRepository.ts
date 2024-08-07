import { Prisma, PrismaClient } from '../../../../../../../prisma-mongo/client/';
import CurrenciesRate, { CurrenciesRateType } from '../../../domain/CurrenciesRate';
import { PrismaOrmRepository } from '../../../../../common/infrastructure/persistence/prisma/PrismaOrmRepository';
import { ObjectNotFound } from '../../../../../common/infrastructure/persistence/ObjectNotFound';
import Logger from '../../../../../common/domain/Logger';
import { CurrenciesRateTypeMap } from './CurrencesRateTypeMap';
import { CurrenciesRateDataMapper } from './CurrenciesRateDataMapper';
import { CurrenciesRateRepository } from '../../../domain/CurrenciesRateRepository';

export type CurrencyRateTypeDB = {
  id?: string;
  code: string;
  rate: number;
};
export type CurrenciesRateTypeDB = {
  id: string;
  date: Date;
  rates: CurrencyRateTypeDB[];
};

export default class CurrenciesRatePrismaRepository
  extends PrismaOrmRepository<Prisma.CurrenciesRateDelegate, CurrenciesRateTypeMap, CurrenciesRateType, CurrenciesRate>
  implements CurrenciesRateRepository
{
  constructor(
    protected readonly prismaMongoClient: PrismaClient,
    private readonly logger: Logger
  ) {
    super(prismaMongoClient.currenciesRate);
  }

  async create(data: CurrenciesRateType): Promise<void> {
    this.logger.info(`saving currencies rates ${JSON.stringify(data)}`);
    await this.delegate.create({
      data: {
        date: data.date,
        id: data.id,
        rates: {
          createMany: {
            data: data.rates
          }
        }
      }
    });
  }

  async findLast() {
    const currenciesRate: CurrenciesRateTypeDB = await this.delegate.findFirstOrThrow({
      where: {
        deleted: false
      },
      orderBy: {
        date: 'desc'
      },
      include: {
        rates: true
      }
    });
    return CurrenciesRateDataMapper.mapOne(currenciesRate);
  }
  async findOne(id: string): Promise<CurrenciesRate> {
    try {
      const currenciesRate = await this.findUniqueOrThrows({
        where: {
          id,
          deleted: false
        }
      });
      return CurrenciesRateDataMapper.mapOne(currenciesRate);
    } catch (error) {
      this.logger.error(error as Error);
      throw new ObjectNotFound(`Object does not exist`);
    }
  }
}
