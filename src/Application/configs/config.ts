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
  },
  database: {
    type: {
      doc: 'driver of database connection',
      format: String,
      env: 'MARIADB_CONNECTION_TYPE',
      default: 'mysql'
    },
    host: {
      doc: 'mariadb database host',
      format: String,
      env: 'MARIADB_HOST',
      default: 'localhost'
    },
    port: {
      doc: 'mariadb database port',
      format: Number,
      env: 'MARIADB_PORT',
      default: 3306
    },
    username: {
      doc: 'mariadb database username',
      format: String,
      env: 'MARIADB_USERNAME',
      default: 'user'
    },
    password: {
      doc: 'mariadb database password',
      format: String,
      env: 'MARIADB_PASSWORD',
      default: 'pass'
    },
    database: {
      doc: 'mariadb database name',
      format: String,
      env: 'MARIADB_DATABASE',
      default: 'airbag-db'
    },
    databaseUrl: {
      doc: 'string database url',
      format: String,
      env: 'DATABASE_URL',
      default: 'mysql://user:passd@db:3306/airbag-db'
    }
  }
});

const env = config.get('env');
config.loadFile(path.join(process.cwd(), 'environments', `${env}.json`));

export default config;
