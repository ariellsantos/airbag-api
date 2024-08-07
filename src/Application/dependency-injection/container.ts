import { aliasTo, asClass, asFunction, createContainer, InjectionMode } from 'awilix';
import { winstonLogger } from '../winstonLogger';
import { configFactory } from '../configs/configFactory';
import { typeormConnectionFactory } from '../../contexts/common/infrastructure/persistence/typeorm/typeormConnectionFactory';
import { mariadbTypeormConnectionFactory } from '../../contexts/common/infrastructure/persistence/typeorm/mariadb/mariadbConnectionFactory';
import { prismaClientFactory } from '../../contexts/common/infrastructure/persistence/prisma/prismaClientFactory';
import { VehicleFinder } from '../../contexts/Backoffice/Vehicle/application/Find/VehicleFinder';
import VehiclePrismaRepository from '../../contexts/Backoffice/Vehicle/infrastructure/persistence/prisma/VehiclePrismaRespository';
import GetVehicleController from '../constrollers/Vehicle/GetVehicleController';
import { VehicleCreator } from '../../contexts/Backoffice/Vehicle/application/Create/VehicleCreator';
import { PostCreateVehicleController } from '../constrollers/Vehicle/PostCreateVehicleController';
import AxiosClient from '../../contexts/common/infrastructure/http/AxiosClient';
import OpenExchangeService from '../../contexts/Backoffice/CurrencyRates/infrastructure/openexchangeapi/OpenExchangeApiService';
import { prismaMongoClientFactory } from '../../contexts/common/infrastructure/persistence/prisma/prismaMongoClientFactory';
import CurrenciesRatePrismaRepository from '../../contexts/Backoffice/CurrencyRates/infrastructure/persistence/prisma/CurrenciesRatePrismaRepository';
import InsertLastCurrenciesRate from '../../contexts/Backoffice/CurrencyRates/application/Insert/InsertLastCurrenciesRate';
import LatestCurrenciesRatesFinder from '../../contexts/Backoffice/CurrencyRates/application/Find/LatestCurrenciesRatesFinder';
import AllVehiclesFinder from '../../contexts/Backoffice/Vehicle/application/Find/AllVehiclesFinder';
import VehiclesPricesPrismaRepository from '../../contexts/Backoffice/VehiclesPrices/infrastructure/persistence/prisma/VehiclePricesPrismaRepository';
import LastVehiclesPricesInsert from '../../contexts/Backoffice/VehiclesPrices/application/Insert/LastVehiclesPricesInsert';
import LatestVehiclePricesFinder from '../../contexts/Backoffice/VehiclesPrices/application/Find/LatestVehiclePricesFinder';
import GetVehiclesPricesController from '../constrollers/VehiclesPrices/GetVehiclesPricesController';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  winstonLogger: asFunction(winstonLogger).singleton(),
  logger: aliasTo('winstonLogger'),
  applicationConfig: asFunction(configFactory, {
    injector: () => ({ resource: 'application' })
  }),
  mariadbConfig: asFunction(configFactory, {
    injector: () => ({ resource: 'database' })
  }),
  openExchangeConfig: asFunction(configFactory, {
    injector: () => ({ resource: 'openExchangeApi' })
  }),
  typeormConnectionFactory: asFunction(typeormConnectionFactory),
  mariadbConnection: asFunction(mariadbTypeormConnectionFactory),
  prismaClient: asFunction(prismaClientFactory).singleton(),
  orm: aliasTo('typeormConnectionFactory'),
  vehicleRepository: asClass(VehiclePrismaRepository),
  vehicleFinder: asClass(VehicleFinder),
  getVehicleController: asClass(GetVehicleController),
  vehicleCreator: asClass(VehicleCreator),
  postVehicleCreatorController: asClass(PostCreateVehicleController),
  httpClient: asClass(AxiosClient),
  openExchangeService: asClass(OpenExchangeService),
  exchangeService: aliasTo('openExchangeService'),
  prismaMongoClient: asFunction(prismaMongoClientFactory).singleton(),
  currenciesRateRepository: asClass(CurrenciesRatePrismaRepository),
  insertLastCurrenciesRateService: asClass(InsertLastCurrenciesRate),
  latestCurrenciesRatesFinderService: asClass(LatestCurrenciesRatesFinder),
  allVehiclesFinderService: asClass(AllVehiclesFinder),
  vehiclesPricesRepository: asClass(VehiclesPricesPrismaRepository),
  lastVehiclesPricesInsertService: asClass(LastVehiclesPricesInsert),
  latestVehiclesPricesFinderService: asClass(LatestVehiclePricesFinder),
  getVehiclesPricesController: asClass(GetVehiclesPricesController)
});

export { container };
