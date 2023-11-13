import express from 'express';

import helmet from 'helmet';
import { router as healthRouter } from './routes/health.routes';
import { router as vehiclesRouter } from './routes/vechicle.routes';
import { router as vehiclesPricesRouter } from './routes/vehicle-prices.routes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(helmet());

server.use(healthRouter);
server.use(vehiclesRouter);
server.use(vehiclesPricesRouter);

export { server };
