export type databaseType = 'mysql' | 'mariadb';
export interface TypeOrmConfig {
  type: databaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
