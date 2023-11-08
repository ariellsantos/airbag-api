import config from './config';
import convict from 'convict';

export type ApplicationConfigurations = {
  port: number;
};

const properties = config.getProperties();

type Configs = string | number | ApplicationConfigurations;
export function configFactory(resource: convict.Path<typeof properties>): Configs {
  return config.get(resource);
}
