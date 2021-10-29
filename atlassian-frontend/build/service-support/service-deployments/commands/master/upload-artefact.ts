/** Prerequisite step for rollbacks: uploads an artefact to statlas containing the built service */
import path from 'path';
import { tar, uploadToStatlas } from '../utils/statlas';
import {
  readServiceDescriptor,
  writeDeploymentArtefactUrl,
} from '../utils/files';
import {
  Logger,
  validateDeploymentPipelineVariables,
  getPackage,
} from '../utils';

type UploadArtefactArgs = {
  packageName: string;
  serviceName: string;
  pipelinesToken: string;
};

async function uploadArtefact({
  packageName,
  serviceName,
  pipelinesToken,
}: UploadArtefactArgs) {
  const pkg = await getPackage(packageName);

  const sd = await readServiceDescriptor(serviceName, pkg.dir);
  if (!sd.static || !sd.static.content) {
    Logger.exit(
      'static.content is not defined in the Service Descriptor. Artefacts are only uploaded for static services.',
      0,
    );
  }
  const contentFolder: string = sd.static.content;

  const artefact = `${serviceName}/${pkg.config.version}`;
  Logger.progress(
    `Uploading ${path.join(
      pkg.dir,
      contentFolder,
    )} to statlas (${artefact})...`,
  );
  const tarfile = await tar(
    {
      dir: contentFolder,
      filename: artefact,
    },
    pkg.dir,
  );
  const url = await uploadToStatlas(
    {
      method: 'PUT',
      path: tarfile,
      file: tarfile,
      authToken: pipelinesToken,
    },
    pkg.dir,
  );
  Logger.success(`Uploaded artefact to ${url}`);

  await writeDeploymentArtefactUrl(url);
}

if (require.main === module) {
  validateDeploymentPipelineVariables(process.env);
  const {
    BITBUCKET_BRANCH,
    PIPELINES_JWT_TOKEN,
    SERVICE_PACKAGE,
    SERVICE_NAME,
  } = process.env;

  if (BITBUCKET_BRANCH !== 'master') {
    Logger.exit('Artefacts are only uploaded on master', 0);
  }

  uploadArtefact({
    packageName: SERVICE_PACKAGE,
    serviceName: SERVICE_NAME,
    pipelinesToken: PIPELINES_JWT_TOKEN,
  }).catch(err => Logger.exit(err));
}
