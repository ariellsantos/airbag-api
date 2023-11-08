import { container } from './dependency-injection/container';
import Logger from '../contexts/common/domain/Logger';

const logger: Logger = container.resolve('logger');

logger.info('working...');
