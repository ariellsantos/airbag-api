import { container } from './dependency-injection/container';
import Logger from '../contexts/common/domain/Logger';
import { ApplicationConfigurations } from './configs/configFactory';
import { server } from './server';

const logger: Logger = container.resolve('logger');

const appConfigs: ApplicationConfigurations = container.resolve('applicationConfig');

server.listen(appConfigs.port, () => {
  logger.info(`app running on port ${appConfigs.port}`);
});
