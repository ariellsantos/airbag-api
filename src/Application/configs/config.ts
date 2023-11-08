import convict from 'convict';
import * as path from 'path';

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  application: {
    port: {
      doc: 'port where app server will be running',
      format: Number,
      env: 'APP_PORT',
      default: 3000
    }
  }
});

const env = config.get('env');
config.loadFile(path.join(process.cwd(), 'environments', `${env}.json`));

export default config;
