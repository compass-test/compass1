import {
  ConnectionOptions,
  createConnection as createTypeOrmConnection,
  DatabaseType,
} from 'typeorm';
import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';
import { getEnvironment, ENVIRONMENT } from '../server/constants';

checkEnvironmentVariables(process.env, [
  'PG_AF_RELEASE_DASHBOARD_HOST',
  'PG_AF_RELEASE_DASHBOARD_PORT',
  'PG_AF_RELEASE_DASHBOARD_ROLE',
  'PG_AF_RELEASE_DASHBOARD_PASSWORD',
  'PG_AF_RELEASE_DASHBOARD_SCHEMA',
  ...(process.env.MIGRATIONS === 'true' &&
  process.env.GENERATE_MIGRATIONS === 'true'
    ? ['MIGRATION_NAME']
    : []),
]);

let entitiesAndMigrations = {
  entities: ['src/db/entities/**'],
  migrations: ['src/db/migrations/**'],
};

// if running in webpack, load entities and migrations correctly
if (typeof __webpack_require__ === 'function') {
  entitiesAndMigrations = require('./webpack-entities-and-migrations')
    .entitiesAndMigrations;
}

const config = {
  type: 'postgres' as DatabaseType,
  host: process.env.PG_AF_RELEASE_DASHBOARD_HOST,
  port: process.env.PG_AF_RELEASE_DASHBOARD_PORT,
  username: process.env.PG_AF_RELEASE_DASHBOARD_ROLE,
  password: process.env.PG_AF_RELEASE_DASHBOARD_PASSWORD,
  database: process.env.PG_AF_RELEASE_DASHBOARD_SCHEMA,
  synchronize: false,
  logging: getEnvironment() !== ENVIRONMENT.PROD,
  subscribers: [],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  ...entitiesAndMigrations,
} as ConnectionOptions;

export const createConnection = () => createTypeOrmConnection(config as any);

export default config;
