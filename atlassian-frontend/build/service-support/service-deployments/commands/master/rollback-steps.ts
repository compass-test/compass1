import * as bolt from 'bolt';
import simplegit from 'simple-git/promise';
import {
  createTarFilename,
  downloadFromStatlas,
  untar,
} from '../utils/statlas';
import {
  Logger,
  validateRollbackPipelineVariables,
  getPackage,
} from '../utils';
import { writeDeploymentArtefactUrl } from '../utils/files';

type CheckoutVersionCommitArgs = {
  packageName: string;
  version: string;
};

async function checkoutVersionCommit({
  packageName,
  version,
}: CheckoutVersionCommitArgs) {
  const { dir } = await bolt.getProject();
  const git = simplegit(dir);

  const { all: commits } = await git.log({
    '--grep': 'RELEASING:',
  });

  const re = new RegExp(`${packageName}@${version}`);
  const serviceReleaseCommits = commits.filter(
    ({ body, author_name }) =>
      author_name === 'bitbucket-pipelines' && re.test(body),
  );

  if (serviceReleaseCommits.length === 0) {
    Logger.exit(`No release commit found for ${packageName}@${version}`);
  }
  const { hash: releaseCommit } = serviceReleaseCommits[0];

  await git.checkout(releaseCommit);
  Logger.success(`Checked out into ${releaseCommit}`);
}

type DownloadArtefactArgs = {
  packageName: string;
  serviceName: string;
  version: string;
  pipelinesToken: string;
};

async function downloadArtefact({
  packageName,
  serviceName,
  version,
  pipelinesToken,
}: DownloadArtefactArgs) {
  const pkg = await getPackage(packageName);

  const tarfile = createTarFilename(`${serviceName}/${version}`);
  const url = await downloadFromStatlas(
    {
      path: tarfile,
      authToken: pipelinesToken,
    },
    pkg.dir,
  );

  await untar({ filename: tarfile }, pkg.dir);
  await writeDeploymentArtefactUrl(url);
}

if (require.main === module) {
  validateRollbackPipelineVariables(process.env);
  const {
    BITBUCKET_BRANCH,
    PIPELINES_JWT_TOKEN,
    SERVICE_PACKAGE,
    SERVICE_NAME,
    VERSION,
  } = process.env;

  if (BITBUCKET_BRANCH !== 'master') {
    Logger.exit('This should only be executed on master');
  }

  const step = process.argv[2];

  if (step === 'checkout-version-commit') {
    checkoutVersionCommit({
      packageName: SERVICE_PACKAGE,
      version: VERSION,
    }).catch(err => Logger.exit(err));
  } else if (step === 'download-artefact') {
    downloadArtefact({
      packageName: SERVICE_PACKAGE,
      serviceName: SERVICE_NAME,
      version: VERSION,
      pipelinesToken: PIPELINES_JWT_TOKEN,
    }).catch(err => Logger.exit(err));
  }
}
