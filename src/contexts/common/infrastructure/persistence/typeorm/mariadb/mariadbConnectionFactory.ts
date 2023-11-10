import { MariaDbConfigurations } from '../../../../../../Application/configs/configFactory';
import { ormFunctionFactory } from '../typeormConnectionFactory';
import { TypeOrmConfig } from '../TypeOrmConfig';
import { DataSource } from 'typeorm';
import { DatabaseConnectionError } from '../DatabaseConnectionError';
import Logger from '../../../../../common/domain/Logger';

export async function mariadbTypeormConnectionFactory(
  mariadbConfig: MariaDbConfigurations,
  orm: ormFunctionFactory<TypeOrmConfig, DataSource>,
  logger: Logger
): Promise<DataSource> {
  try {
    return await orm(mariadbConfig);
  } catch (error) {
    logger.error(error as Error);
    throw new DatabaseConnectionError("Can't connect to database");
  }
}
