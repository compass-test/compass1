import axios from 'axios';
import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';

import { ReleaseStatus } from '../../src/db/entities/Release';
import { PullRequestEntity } from '../../src/db/entities/PullRequest';
import { ReleaseRequestPayload } from '../../src/ui/interfaces/release-request-payload';

function postReleaseRequest(url: string, release: ReleaseRequestPayload) {
  const token = process.env.RELEASE_DASHBOARD_TOKEN;
  return axios({
    method: 'POST',
    url: `${url}/api/v1/release`,
    headers: {
      Authorization: `${token}`,
    },
    data: { release },
  });
}

function putReleaseRequest(
  url: string,
  name: string,
  release: Partial<ReleaseRequestPayload>,
) {
  const token = process.env.RELEASE_DASHBOARD_TOKEN;
  return axios({
    method: 'PUT',
    url: `${url}/api/v1/release/${name}`,
    headers: {
      Authorization: `${token}`,
    },
    data: { release },
  });
}

export function getEarliestMergeDate(pullRequests: PullRequestEntity[]) {
  const date = pullRequests
    .map((pr) => new Date(pr.mergeDate))
    .sort((a, b) => a.getTime() - b.getTime())
    .shift();

  if (!date) {
    throw new Error('No valid create date can be extracted.');
  }

  return date.toISOString();
}

export async function sendRelease(
  name: string,
  pullRequests: PullRequestEntity[],
  url: string,
  status?: ReleaseStatus,
) {
  checkEnvironmentVariables(process.env, ['RELEASE_DASHBOARD_TOKEN']);
  const release: ReleaseRequestPayload = {
    name: name,
    pullRequests,
    createdDate: getEarliestMergeDate(pullRequests),
  };
  if (status) {
    release.status = status;
  }
  console.log(`Sending release ${name} to the server.`);
  try {
    await postReleaseRequest(url, release);
    console.log(`Release ${name} was stored in the server.`);
  } catch (e) {
    console.log(`Release ${name} failed with error: ${e}.`);
  }
}

export async function updateRelease(
  name: string,
  release: Partial<ReleaseRequestPayload>,
  url: string,
) {
  checkEnvironmentVariables(process.env, ['RELEASE_DASHBOARD_TOKEN']);
  console.log(`Updating release ${name}.`);
  try {
    await putReleaseRequest(url, name, release);
    console.log(`Release ${name} was updated.`);
  } catch (e) {
    console.log(`Release ${name} update has failed with error: ${e}.`);
  }
}
