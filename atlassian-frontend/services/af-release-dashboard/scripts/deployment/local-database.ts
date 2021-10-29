import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';
import axios, { AxiosResponse } from 'axios';
import { DeploymentResponse } from '../../src/ui/interfaces';

import type { DeploymentHistoryEntity } from '../../src/db/entities/DeploymentHistory';

export type UpdateDeploymentEntity = Pick<
  DeploymentHistoryEntity,
  'lastDeploymentCommitHash' | 'isAutoRebase' | 'confluenceBuildUrl'
>;

export async function getDeploymentInfo() {
  checkEnvironmentVariables(process.env, [
    'RELEASE_DASHBOARD_TOKEN',
    'RELEASE_DASHBOARD_URL',
  ]);
  const {
    RELEASE_DASHBOARD_TOKEN: token,
    RELEASE_DASHBOARD_URL: dashboardUrl,
  } = process.env;
  const url = `${dashboardUrl}${
    dashboardUrl.endsWith('/') ? '' : '/'
  }api/v1/deployment`;
  console.log(`\nRead: ${url}\n`);
  const result = await axios.get<DeploymentResponse>(url, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return result.data.payload;
}

export async function sendDeploymentInfo(data: UpdateDeploymentEntity) {
  checkEnvironmentVariables(process.env, [
    'RELEASE_DASHBOARD_TOKEN',
    'RELEASE_DASHBOARD_URL',
  ]);
  const {
    RELEASE_DASHBOARD_TOKEN: token,
    RELEASE_DASHBOARD_URL: dashboardUrl,
  } = process.env;
  const urlPrefix = dashboardUrl.endsWith('/')
    ? dashboardUrl.slice(0, -1)
    : dashboardUrl;
  const url = `${urlPrefix}/api/v1/deployment`;
  console.log(`Send metadata to deployment endpoint url:\n\t${url}`);
  return await axios
    .post<UpdateDeploymentEntity, AxiosResponse<DeploymentResponse>>(
      url,
      data,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )
    .then((response) => {
      const { data } = response;
      if (!data || data.status !== 'success' || !data.payload) {
        throw new Error('Failed to update deployment.');
      }
      console.log('Deployment metadata successfully updated.');
      console.log(
        `\tLatest deployment timestamp: ${data.payload.lastDeploymentTimestamp}`,
      );
      return data;
    })
    .catch((error) => {
      if (error.response) {
        const { status, statusText, config, data } = error.response;
        const { url, method, data: postData } = config;
        console.error(
          `ERROR: ${statusText} (${status}) during ${method.toUpperCase()} to ${url} with payload:\n\t${postData}`,
        );
        if (data.status === 'error') {
          console.error(`\t${data.message}`);
        }
      } else {
        console.error(
          `ERROR: Failure during POST to ${url} with payload:\n\t${data}`,
          error,
        );
      }
      throw new Error(
        'Failed to update /deployment endpoint. Do you have the correct permissions?',
      );
    });
}
