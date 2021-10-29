import axios from 'axios';
import { PipelinesClient } from '@atlaskit/build-utils/bitbucket';

import {
  validateDeploymentAfterScriptPipelinesVariables,
  getPackage,
  Logger,
} from '../utils';

type CheckLockArgs = {
  url: string;
  packageName: string;
  pipelinesToken: string;
  pipelinesBuildNumber: string;
  pipelinesClient: PipelinesClient;
};

async function checkLock({
  url,
  packageName,
  pipelinesToken,
  pipelinesBuildNumber,
  pipelinesClient,
}: CheckLockArgs) {
  const pkg = await getPackage(packageName);
  const { serviceName } = pkg.config['af:services'] || {};
  if (!serviceName) {
    throw new Error('package.json does not define af:services.serviceName');
  }

  const { data: lockData } = await axios.get(`${url}/api/service-lock-state`, {
    params: { name: serviceName },
    headers: {
      Authorization: `Bearer ${pipelinesToken}`,
    },
  });

  Logger.progress('Received response:');
  Logger.log(lockData);

  if (!lockData?.isLocked) {
    Logger.success('Service not locked, continuing deployment');
    return;
  }

  Logger.progress('Service locked, stopping deployment pipeline...');
  await pipelinesClient.stop(pipelinesBuildNumber);
}

if (require.main === module) {
  validateDeploymentAfterScriptPipelinesVariables(process.env);
  const {
    PIPELINES_JWT_TOKEN,
    SERVICE_DASHBOARD_URL,
    SERVICE_PACKAGE,
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_BUILD_NUMBER,
  } = process.env;

  const pipelinesClient = new PipelinesClient({
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
    repoFullName: BITBUCKET_REPO_FULL_NAME,
  });

  checkLock({
    url: SERVICE_DASHBOARD_URL,
    packageName: SERVICE_PACKAGE,
    pipelinesToken: PIPELINES_JWT_TOKEN,
    pipelinesBuildNumber: BITBUCKET_BUILD_NUMBER,
    pipelinesClient,
  }).catch(err => {
    Logger.log(err);
    Logger.exit('Failed to check lock state', 0);
  });
}
