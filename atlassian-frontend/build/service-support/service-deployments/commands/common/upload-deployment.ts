import axios from 'axios';
import { SlackClient } from '@atlaskit/build-utils/slack';

import {
  Logger,
  validateDeploymentPipelineVariables,
  getPackage,
  getFlag,
} from '../utils';

const DEPLOYMENT_OPS_CHANNEL_ID = 'C01GWT84NH5';

type UploadDeploymentArgs = {
  url: string;
  serviceName: string;
  packageName: string;
  env: string;
  pipelinesToken: string;
  commit: string;
  branch: string;
  pipelineBuildNumber: string;
  pipelineLink: string;
  slackClient: SlackClient;
  isRollback: boolean;
};

async function uploadDeployment({
  url,
  serviceName,
  packageName,
  env,
  pipelinesToken,
  commit,
  branch,
  pipelineBuildNumber,
  pipelineLink,
  slackClient,
  isRollback,
}: UploadDeploymentArgs) {
  const pkg = await getPackage(packageName);
  let { description, version } = pkg.config || {};
  const { team } = pkg.config['atlassian'] || {};

  if (!serviceName || !description || !version || !team) {
    throw new Error(
      'package.json did not contain required fields: version, description, atlassian.team, af:services.serviceName',
    );
  }

  if (isRollback) {
    version = process.env.VERSION as string;
  }

  Logger.progress('Sending create deployment request...');

  try {
    const response = await axios.post(
      `${url}/api/action/create-deployment`,
      {
        service: {
          name: serviceName,
          packageName,
          description,
          team,
        },
        deployment: {
          env,
          commit,
          branch,
          packageVersion: version,
          pipelineUuid: pipelineBuildNumber,
          isRollback,
          status: 'INPROGRESS',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${pipelinesToken}`,
        },
      },
    );
    Logger.log(response.data);
  } catch (err) {
    if (process.env.SERVICE_DASHBOARD_NOTIFICATIONS === 'true') {
      await slackClient.sendMessage({
        message: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                `*Failed to upload deployment metadata for \`${packageName}\` to \`${env}\` *\n\n` +
                `:hammer_and_wrench: <${pipelineLink}|pipeline>`,
            },
          },
        ],
      });
    }
    Logger.log(err);
    Logger.exit('Failed to upload deployment metadata', 0);
  }
}

if (require.main === module) {
  validateDeploymentPipelineVariables(process.env);
  const {
    SERVICE_DASHBOARD_URL,
    SERVICE_NAME,
    SERVICE_PACKAGE,
    MICROS_ENV,
    PIPELINES_JWT_TOKEN,
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_COMMIT,
    BITBUCKET_BRANCH,
    BITBUCKET_BUILD_NUMBER,
    AFP_SLACK_TOKEN,
  } = process.env;

  const slackClient = new SlackClient({
    username: 'AFP Service Dashboard Notifier',
    token: AFP_SLACK_TOKEN,
    channel: DEPLOYMENT_OPS_CHANNEL_ID,
  });

  uploadDeployment({
    url: SERVICE_DASHBOARD_URL,
    serviceName: SERVICE_NAME,
    packageName: SERVICE_PACKAGE,
    env: MICROS_ENV,
    pipelinesToken: PIPELINES_JWT_TOKEN,
    commit: BITBUCKET_COMMIT,
    branch: BITBUCKET_BRANCH,
    pipelineBuildNumber: BITBUCKET_BUILD_NUMBER,
    pipelineLink: `http://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}`,
    slackClient,
    isRollback: getFlag('--is-rollback'),
  }).catch(err => Logger.exit(err, 0));
}
