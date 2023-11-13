import Router from 'express-promise-router';
import { Request, Response } from 'express';
import Logger from '../../contexts/common/domain/Logger';
import { container } from '../dependency-injection/container';
import httpStatus from 'http-status';
import { ClientError } from '../../contexts/common/domain/errors/ClientError';
import GetVehiclesPricesController from '../constrollers/VehiclesPrices/GetVehiclesPricesController';

const logger: Logger = container.resolve('logger');

const router = Router();

router.get('/vehicles-prices', async (req: Request, res: Response) => {
  try {
    const controller: GetVehiclesPricesController = container.resolve('getVehiclesPricesController');
    const payload = await controller.exec();
    res.status(httpStatus.OK);
    res.send({ data: payload });
  } catch (error) {
    logger.error(error as Error);
    if (error instanceof ClientError) {
      res.status(httpStatus.BAD_REQUEST);
      res.send({ error: error.message });
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR).send({ eroor: 'Server error, retry later' });
    }
  }
});

export { router };
