import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';
import app from './app';
import logger from './logger';
import { PORT } from './constants';
import { mapCompiledEnvironmentVariables } from './utils';

mapCompiledEnvironmentVariables();
checkEnvironmentVariables(process.env, ['STATLAS_NAMESPACE', 'MICROS_ENV']);

const main = async () => {
  try {
    app.listen(PORT, () => logger.info(`Server started`));
  } catch (err) {
    logger.error(err);
  }
};

main();
