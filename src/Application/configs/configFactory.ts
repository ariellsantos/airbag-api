import config from './config';
import convict from 'convict';
import { databaseType } from '../../contexts/common/infrastructure/persistence/typeorm/TypeOrmConfig';

export type ApplicationConfigurations = {
  port: number;
};
export type MariaDbConfigurations = {
  type: databaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  databaseUrl: string;
};

export type OpenExchangeConfig = {
  appId: string;
  baseUrl: string;
};

export type MongoDBConfig = {
  databaseURI: string;
};
const properties = config.getProperties();

type Configs = string | number | ApplicationConfigurations | MariaDbConfigurations | OpenExchangeConfig | MongoDBConfig;
export function configFactory(resource: convict.Path<typeof properties>): Configs {
  return config.get(resource);
}
