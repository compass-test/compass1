import { ConnectionOptions } from 'typeorm';

import { Service, ServiceState, Deployment, DeploymentState } from './entities';
import { initDB, PRODUCTION } from '../utils/env';

const createConfig = () => {
  const DB = initDB();
  const commonConfig = {
    type: 'postgres',
    host: DB.HOST,
    port: DB.PORT,
    username: DB.USERNAME,
    password: DB.PASSWORD,
    database: DB.DATABASE_NAME,
    entities: [Service, ServiceState, Deployment, DeploymentState],
    migrationsRun: true,
  };
  const localConfig = {
    logging: 'error',
    migrations: ['src/server/db/migrations/**/*.ts'],
    cli: {
      migrationsDir: 'src/server/db/migrations',
    },
  };
  const prodConfig = {
    migrations: ['server/db/migrations/**/*.js'],
  };
  return {
    ...commonConfig,
    ...(PRODUCTION ? prodConfig : localConfig),
  } as ConnectionOptions;
};

export default createConfig();
