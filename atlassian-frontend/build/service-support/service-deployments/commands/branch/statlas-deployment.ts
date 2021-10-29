/**
 * Executes each step of a static service branch deploy to statlas:
 *  1. Fetches package info using bolt and validates that the service has opted-in
 *  2. Fetches name of static content subdirectory from the service descriptor
 *  3. Compresses static content using tar
 *  4. Uploads tar to custom statlas URL under namespace atlassian-frontend-services with subdirectory <service-name>/<bb-commit>
 *  5. Uploads statlas URL as a build status on the commit
 */
import path from 'path';
import { BuildStatusClient } from '@atlaskit/build-utils/bitbucket';
import {
  DeploymentType,
  getDeploymentOptions,
} from '../utils/deployment-metadata';
import { readServiceDescriptor } from '../utils/files';
import { tar, uploadToStatlas } from '../utils/statlas';
import {
  Logger,
  validateDeploymentPipelineVariables,
  getPackage,
} from '../utils';

type StatlasDeploymentArgs = {
  buildStatusClient: BuildStatusClient;
  packageName: string;
  serviceName: string;
  commit: string;
  pipelinesToken: string;
};

async function statlasDeployment({
  buildStatusClient,
  packageName,
  serviceName,
  commit,
  pipelinesToken,
}: StatlasDeploymentArgs) {
  const pkg = await getPackage(packageName);

  const deploymentOpts = getDeploymentOptions(pkg, DeploymentType.BRANCH);
  const shouldStatlasBranchDeploy =
    deploymentOpts && deploymentOpts.env === 'statlas';

  if (!shouldStatlasBranchDeploy) {
    Logger.exit(
      `The package ${packageName} has not opted in to static branch deploys`,
    );
  }

  const sd = await readServiceDescriptor(serviceName, pkg.dir);
  if (!sd.static || !sd.static.content) {
    Logger.exit('static.content is not defined in the Service Descriptor');
  }
  const contentFolder: string = sd.static.content;

  const statlasPath = `${serviceName}/${commit}`;
  Logger.progress(
    `Uploading ${path.join(
      pkg.dir,
      contentFolder,
    )} to statlas (${statlasPath})...`,
  );
  const tarfile = await tar(
    {
      dir: contentFolder,
      filename: statlasPath,
      tarContents: true,
    },
    pkg.dir,
  );
  const url = await uploadToStatlas(
    {
      method: 'POST',
      path: statlasPath,
      file: tarfile,
      authToken: pipelinesToken,
    },
    pkg.dir,
  );

  Logger.progress('Uploading build status to commit...');
  await buildStatusClient.uploadBuildStatus({
    state: 'SUCCESSFUL',
    name: `${serviceName} statlas deployment`,
    url: `${url}/`,
  });

  Logger.success(`Created build status with ${url}/`);
}

if (require.main === module) {
  validateDeploymentPipelineVariables(process.env);
  const {
    BITBUCKET_COMMIT,
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
    PIPELINES_JWT_TOKEN,
    SERVICE_PACKAGE,
    SERVICE_NAME,
  } = process.env;

  const buildStatusClient = new BuildStatusClient({
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
    repoFullName: BITBUCKET_REPO_FULL_NAME,
    commit: BITBUCKET_COMMIT,
  });

  statlasDeployment({
    buildStatusClient,
    packageName: SERVICE_PACKAGE,
    serviceName: SERVICE_NAME,
    commit: BITBUCKET_COMMIT,
    pipelinesToken: PIPELINES_JWT_TOKEN,
  }).catch(err => Logger.exit(err));
}
