import { TypeOrmConfig } from './TypeOrmConfig';
import { DataSource } from 'typeorm';

export type ormFunctionFactory<C, T> = (configs: C) => Promise<T>;
export function typeormConnectionFactory(): ormFunctionFactory<TypeOrmConfig, DataSource> {
  return function async(configs: TypeOrmConfig): Promise<DataSource> {
    const connection = new DataSource({
      type: configs.type,
      host: configs.host,
      port: configs.port,
      username: configs.username,
      password: configs.password,
      database: configs.database
    });
    return connection.initialize();
  };
}
