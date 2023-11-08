import { aliasTo, asFunction, createContainer, InjectionMode } from 'awilix';
import { winstonLogger } from '../winstonLogger';
import { configFactory } from '../configs/configFactory';
import { typeormConnectionFactory } from '../../contexts/common/infrastructure/persistence/typeorm/typeormConnectionFactory';
import { mariadbTypeormConnectionFactory } from '../../contexts/common/infrastructure/persistence/typeorm/mariadb/mariadbConnectionFactory';

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
    injector: () => ({ resource: 'mariadbTypeorm' })
  }),
  typeormConnectionFactory: asFunction(typeormConnectionFactory),
  orm: aliasTo('typeormConnectionFactory'),
  mariadbConnection: asFunction(mariadbTypeormConnectionFactory)
});

export { container };
