import { v4 as uuid } from 'uuid';
import { container } from '../../../../../../../src/Application/dependency-injection/container';
import CurrenciesRatePrismaRepository from '../../../../../../../src/contexts/Backoffice/CurrencyRates/infrastructure/persistence/prisma/CurrenciesRatePrismaRepository';
import CurrenciesRate, {
  CurrenciesRateType
} from '../../../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrenciesRate';
import { generateRandomRate } from '../../../domain/utils';

const prismaConnection = container.resolve('prismaMongoClient');

const logger = container.resolve('logger');
describe('CurrenciesRatePrismaRepository', () => {
  let currenciesRateRepository: CurrenciesRatePrismaRepository;
  beforeEach(() => {
    currenciesRateRepository = new CurrenciesRatePrismaRepository(prismaConnection, logger);
  });
  beforeEach(async () => {
    // Todo: implement truncate info after tests finished
  });
  it('Should save a CurrenciesRate', async () => {
    const currenciesInfo: CurrenciesRateType = {
      id: uuid(),
      rates: [
        {
          code: 'GBP',
          rate: generateRandomRate()
        },
        {
          code: 'EUR',
          rate: generateRandomRate()
        },
        {
          code: 'USD',
          rate: generateRandomRate()
        }
      ],
      date: new Date()
    };
    const c = CurrenciesRate.create(currenciesInfo);
    await currenciesRateRepository.create(c.toObject());
  });

  it('should find  the last a CurrenciesRate registered', async () => {
    const currenciesRateInfo: CurrenciesRateType = {
      id: uuid(),
      date: new Date(),
      rates: [
        {
          code: 'GBP',
          rate: generateRandomRate()
        },
        {
          code: 'EUR',
          rate: generateRandomRate()
        },
        {
          code: 'USD',
          rate: generateRandomRate()
        }
      ]
    };
    const c = CurrenciesRate.create(currenciesRateInfo);
    await currenciesRateRepository.create(c.toObject());
    const currenciesRateDb = await currenciesRateRepository.findLast();
    expect(currenciesRateDb).toEqual(c);
  });
});
