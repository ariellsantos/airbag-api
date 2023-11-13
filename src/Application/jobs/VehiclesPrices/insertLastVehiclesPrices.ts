import cron from 'node-cron';
import { v4 as uuid } from 'uuid';
import { container } from '../../dependency-injection/container';
import Logger from '../../../contexts/common/domain/Logger';
import LastVehiclesPricesInsert from '../../../contexts/Backoffice/VehiclesPrices/application/Insert/LastVehiclesPricesInsert';

const logger: Logger = container.resolve('logger');
cron.schedule('* */30 * * *', async () => {
  try {
    logger.info('running job');

    const insertLasCurrenciesRateService: LastVehiclesPricesInsert = container.resolve(
      'lastVehiclesPricesInsertService'
    );
    const id = uuid();
    const date = new Date();
    await insertLasCurrenciesRateService.run(id, date);
  } catch (error) {
    logger.error(error as Error);
  }

  logger.info('Job finished');
});
