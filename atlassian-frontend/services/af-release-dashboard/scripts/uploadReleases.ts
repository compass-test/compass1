/* eslint-disable no-console */
import { uploadToStatlas } from '@atlaskit/ci-scripts/branch-deploy/utils';

import {
  RELEASES_JSON_PATH,
  STATLAS_RELEASES_JSON_DIR,
  STATLAS_RELEASES_JSON_URL,
} from './constants';
import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';

const main = async () => {
  checkEnvironmentVariables(process.env, [
    'STATLAS_AUTH_GROUP',
    'STATLAS_NAMESPACE',
    'MICROS_ENV',
  ]);
  console.log(`Publishing releases dataset to Statlas...`);
  await uploadToStatlas('put', RELEASES_JSON_PATH, STATLAS_RELEASES_JSON_DIR);
  console.log(`Releases data available at... ${STATLAS_RELEASES_JSON_URL}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
