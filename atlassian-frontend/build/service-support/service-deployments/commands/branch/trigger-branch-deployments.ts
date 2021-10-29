/** Runs on default branch build and triggers pipelines for services that need to be branch deployed */
import { PipelinesClient } from '@atlaskit/build-utils/bitbucket';
import {
  getServiceDeploymentMetadata,
  DeploymentType,
} from '../utils/deployment-metadata';
import { triggerDeploymentPipelines } from '../utils/pipelines';
import { Logger, validatePipelineVariables } from '../utils';

type TriggerBranchDeploymentsArgs = {
  pipelinesClient: PipelinesClient;
  branch: string;
  commit: string;
};

async function triggerBranchDeployments({
  pipelinesClient,
  branch,
  commit,
}: TriggerBranchDeploymentsArgs) {
  Logger.progress('Determining services to deploy...');
  const serviceDeploymentMetadata = await getServiceDeploymentMetadata(
    DeploymentType.BRANCH,
    {
      onMaster: false,
    },
  );
  Logger.log(serviceDeploymentMetadata);

  if (serviceDeploymentMetadata.length === 0) {
    Logger.success('No deployments to trigger');
    return;
  }

  Logger.progress('Triggering deployments...');
  await triggerDeploymentPipelines(
    serviceDeploymentMetadata,
    { branch, commit },
    pipelinesClient,
    (servicePackage: string, url: string) =>
      Logger.success(
        `Triggered deployment pipeline for ${servicePackage}: ${url}`,
      ),
  );
}

if (require.main === module) {
  validatePipelineVariables(process.env);
  const {
    BITBUCKET_BRANCH,
    BITBUCKET_COMMIT,
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
  } = process.env;

  const pipelinesClient = new PipelinesClient({
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
    repoFullName: BITBUCKET_REPO_FULL_NAME,
  });

  triggerBranchDeployments({
    pipelinesClient,
    branch: BITBUCKET_BRANCH,
    commit: BITBUCKET_COMMIT,
  }).catch(err => Logger.exit(err));
}
