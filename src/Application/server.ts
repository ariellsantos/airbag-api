import express from 'express';

import helmet from 'helmet';
import { router as routerHealth } from './routes/health.routes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(helmet());
server.use(routerHealth);

export { server };
