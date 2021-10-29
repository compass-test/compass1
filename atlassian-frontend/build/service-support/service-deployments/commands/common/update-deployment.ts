import axios from 'axios';

import {
  getPackage,
  Logger,
  validateDeploymentAfterScriptPipelinesVariables,
} from '../utils';
import { readDeploymentArtefactUrl } from '../utils/files';

type UpdateDeploymentArgs = {
  packageName: string;
  url: string;
  exitCode: number;
  pipelinesBuildNumber: string;
  pipelinesToken: string;
};

async function updateDeployment({
  packageName,
  url,
  exitCode,
  pipelinesBuildNumber,
  pipelinesToken,
}: UpdateDeploymentArgs) {
  const pkg = await getPackage(packageName);
  const { slackChannelId } = pkg.config['af:services'] || {};
  const artefactUrl = await readDeploymentArtefactUrl();

  await axios.post(
    `${url}/api/action/update-deployment`,
    {
      pipelineUuid: pipelinesBuildNumber,
      status: exitCode === 0 ? 'SUCCESSFUL' : 'FAILED',
      artefactUrl,
      slackChannelId,
    },
    {
      headers: {
        Authorization: `Bearer ${pipelinesToken}`,
      },
    },
  );
}

if (require.main === module) {
  validateDeploymentAfterScriptPipelinesVariables(process.env);
  const {
    SERVICE_PACKAGE,
    SERVICE_DASHBOARD_URL,
    BITBUCKET_EXIT_CODE,
    BITBUCKET_BUILD_NUMBER,
    PIPELINES_JWT_TOKEN,
  } = process.env;

  if (!BITBUCKET_EXIT_CODE) {
    throw new Error('This must be executed in a CI after-script');
  }

  updateDeployment({
    packageName: SERVICE_PACKAGE,
    url: SERVICE_DASHBOARD_URL,
    exitCode: parseInt(BITBUCKET_EXIT_CODE),
    pipelinesBuildNumber: BITBUCKET_BUILD_NUMBER,
    pipelinesToken: PIPELINES_JWT_TOKEN,
  }).catch(err => {
    Logger.log(err);
    Logger.exit('Failed to update deployment', 0);
  });
}
