import { aliasTo, asFunction, createContainer, InjectionMode } from 'awilix';
import { winstonLogger } from '../winstonLogger';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  winstonLogger: asFunction(winstonLogger).singleton(),
  logger: aliasTo('winstonLogger')
});

export { container };
