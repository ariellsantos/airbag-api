import Router from 'express-promise-router';
import { Request, Response } from 'express';
import Logger from '../../contexts/common/domain/Logger';
import { container } from '../dependency-injection/container';
import httpStatus from 'http-status';
import GetVehicleController from '../constrollers/vehicles/GetVehicleController';
import { ClientError } from '../../contexts/common/domain/errors/ClientError';
import { param } from 'express-validator';
import { validateReqSchema } from './utils';

const logger: Logger = container.resolve('logger');

const router = Router();

const reqGetVehiclesValidator = [param('id').exists().isUUID()];

router.get('/vehicles/:id', reqGetVehiclesValidator, validateReqSchema, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const controller: GetVehicleController = container.resolve('getVehicleController');
    const payload = await controller.exec({ id });
    res.status(httpStatus.IM_A_TEAPOT);
    res.send({ data: payload });
  } catch (error) {
    logger.error(error as Error);
    if (error instanceof ClientError) {
      res.status(httpStatus.BAD_REQUEST);
      res.send({ error: error.message });
    } else {
      res.sendStatus(500).send({ eroor: 'Server error, retry later' });
    }
  }
});

export { router };
