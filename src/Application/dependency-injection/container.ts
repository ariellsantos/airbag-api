import { aliasTo, asFunction, createContainer, InjectionMode } from 'awilix';
import { winstonLogger } from '../winstonLogger';
import { configFactory } from '../configs/configFactory';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  winstonLogger: asFunction(winstonLogger).singleton(),
  logger: aliasTo('winstonLogger'),
  applicationConfig: asFunction(configFactory, {
    injector: () => ({ resource: 'application' })
  })
});

export { container };
