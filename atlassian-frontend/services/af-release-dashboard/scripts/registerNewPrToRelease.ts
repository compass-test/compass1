/* eslint-disable no-console */
import axios from 'axios';
import simpleGit from 'simple-git/promise';
import { getPrFromCommit } from '@atlaskit/build-utils/bitbucket';
import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';
import { AF_RELEASE_DASHBOARD_REGISTER_API_URL } from '../src/server/constants';

const git = simpleGit('./');

const getLatestReleaseName = async () => {
  const latestReleaseTag = await git.raw(
    `describe --abbrev=0 --first-parent --match next-release-start-* origin/develop`.split(
      ' ',
    ),
  );
  const latestReleaseName = latestReleaseTag
    .trim()
    .replace('next-release-start-', '');
  return latestReleaseName;
};

const resolvePrFromCommit = async (commit: string, repo: string) => {
  const pr = await getPrFromCommit(commit, repo);
  if (!pr) {
    throw Error(
      `Cannot find open pull request for commit ${process.env.BITBUCKET_COMMIT}`,
    );
  }
  return pr;
};

const registerNewPr = async (pullRequestId: number, releaseName: string) => {
  const data = {
    pullRequestId,
    releaseName,
  };
  await axios({
    method: 'post',
    url: AF_RELEASE_DASHBOARD_REGISTER_API_URL,
    headers: {
      Authorization: `Bearer ${process.env.PIPELINES_JWT_TOKEN}`,
    },
    data,
  });
};

const main = async () => {
  checkEnvironmentVariables(process.env, [
    'BITBUCKET_USER',
    'BITBUCKET_PASSWORD',
    'BITBUCKET_COMMIT',
    'BITBUCKET_REPO_FULL_NAME',
    'PIPELINES_JWT_TOKEN',
    'MICROS_ENV',
  ]);
  await git.fetch(['origin']);

  const pr = await resolvePrFromCommit(
    process.env.BITBUCKET_COMMIT as string,
    process.env.BITBUCKET_REPO_FULL_NAME as string,
  );

  if (pr.destination.branch.name === 'develop') {
    const latestReleaseName = await getLatestReleaseName();
    await registerNewPr(pr.id, latestReleaseName);
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
