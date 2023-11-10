import Router from 'express-promise-router';
import { Request, Response } from 'express';
import Logger from '../../contexts/common/domain/Logger';
import { container } from '../dependency-injection/container';
import httpStatus from 'http-status';

const logger: Logger = container.resolve('logger');

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
  try {
    logger.info('server working');
  } catch (error) {
    if (error instanceof Error) logger.error(error);
  }
  res.status(httpStatus.OK);
  res.send();
});

export { router };
