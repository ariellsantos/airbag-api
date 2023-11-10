import { container } from '../../../../../../src/Application/dependency-injection/container';
import { mariadbTypeormConnectionFactory } from '../../../../../../src/contexts/common/infrastructure/persistence/typeorm/mariadb/mariadbConnectionFactory';
import { describe } from 'node:test';
import { DataSource } from 'typeorm';
import { databaseType } from '../../../../../../src/contexts/common/infrastructure/persistence/typeorm/TypeOrmConfig';
import { DatabaseConnectionError } from '../../../../../../src/contexts/common/infrastructure/persistence/typeorm/DatabaseConnectionError';

const mariadbConfig = container.resolve('mariadbConfig');
const orm = container.resolve('orm');
const logger = container.resolve('logger');

describe('MariadbTypeormFactory', () => {
  it('creates a client to mariadb with already connected', async () => {
    const connection: DataSource = await mariadbTypeormConnectionFactory(mariadbConfig, orm, logger);

    expect(connection.isInitialized).toBe(true);

    await connection.destroy();
  });

  it('should throw an error because error connection', async () => {
    const typedb: databaseType = 'mariadb';
    const configs = {
      type: typedb,
      host: 'localhost',
      port: 3376,
      username: 'user',
      password: 'pass',
      database: 'airbag-db',
      databaseUrl: 'mysql://user:pass@localhost'
    };
    await expect(async () => {
      await mariadbTypeormConnectionFactory(configs, orm, logger);
    }).rejects.toThrowError(new DatabaseConnectionError("Can't connect to database"));
  });
});
