import Router from 'express-promise-router';
import { Request, Response } from 'express';
import Logger from '../../contexts/common/domain/Logger';
import { container } from '../dependency-injection/container';
import httpStatus from 'http-status';
import GetVehicleController from '../constrollers/Vehicle/GetVehicleController';
import { ClientError } from '../../contexts/common/domain/errors/ClientError';
import { body, param } from 'express-validator';
import { validateReqSchema } from './utils';
import { PostCreateVehicleController } from '../constrollers/Vehicle/PostCreateVehicleController';

const logger: Logger = container.resolve('logger');

const router = Router();

const reqGetVehiclesValidator = [param('id').exists().isUUID()];

router.get('/vehicles/:id', reqGetVehiclesValidator, validateReqSchema, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const controller: GetVehicleController = container.resolve('getVehicleController');
    const payload = await controller.exec({ id });
    res.status(httpStatus.OK);
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

const reqBodyCreatValidator = [
  body('id').exists().exists().isUUID(),
  body('plates').exists().isString().isLength({ max: 7 }),
  body('vin').exists().isString().isLength({ max: 17, min: 17 }),
  body('brand').exists().isString().isLength({ max: 20 }),
  body('vehicleType').exists().isString().isLength({ max: 10 }),
  body('price').exists().isNumeric().isLength({ max: 10 })
];

router.post('/vehicles', reqBodyCreatValidator, validateReqSchema, async (req: Request, res: Response) => {
  try {
    const { id, plates, vin, brand, vehicleType, price } = req.body;
    const controller: PostCreateVehicleController = container.resolve('postVehicleCreatorController');

    await controller.exec({
      id,
      plates,
      vin,
      brand,
      vehicleType,
      price
    });

    res.status(httpStatus.CREATED).send();
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
