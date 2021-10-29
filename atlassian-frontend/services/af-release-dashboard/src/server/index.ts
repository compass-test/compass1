import 'reflect-metadata';
import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';
import app from './app';
import logger from './logger';
import { PORT } from './constants';
import { createConnection } from '../db/config';
import { mapCompiledEnvironmentVariables } from './utils';

mapCompiledEnvironmentVariables();
checkEnvironmentVariables(process.env, [
  'STATLAS_NAMESPACE',
  'MICROS_ENV',
  'BITBUCKET_USER',
  'BITBUCKET_PASSWORD',
]);

const main = async () => {
  try {
    const connection = await createConnection();
    logger.info('Running migrations...');
    await connection.runMigrations();
    logger.info('Migrations complete');
    app.listen(PORT, () => logger.info(`Server started`));
  } catch (err) {
    logger.error(err);
  }
};

main();
