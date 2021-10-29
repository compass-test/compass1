import { SlackClient } from '@atlaskit/build-utils/slack';
import {
  validateDeploymentAfterScriptPipelinesVariables,
  getPackage,
  Logger,
} from '../utils';

type SendSlackNotificationArgs = {
  packageName: string;
  env: string;
  pipelineLink: string;
  exitCode: number;
  slackClient: SlackClient;
};

async function sendSlackNotification({
  slackClient,
  packageName,
  env,
  pipelineLink,
  exitCode,
}: SendSlackNotificationArgs) {
  const pkg = await getPackage(packageName);
  const { serviceName, slackChannelId } = pkg.config['af:services'] || {};
  if (!serviceName || !slackChannelId) {
    return;
  }

  Logger.progress('Sending slack notification...');

  const status =
    exitCode === 0
      ? ':successful: *Successfully deployed'
      : ':failed: *Failed to deploy';

  const response = await slackClient.sendMessage({
    channel: slackChannelId,
    message: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            `${status} \`${serviceName}\` to \`${env}\`*\n\n` +
            `:hammer_and_wrench: <${pipelineLink}|pipeline>`,
        },
      },
    ],
  });

  if (response.ok) {
    Logger.success('Sent message');
  } else {
    Logger.exit(`Failed to sent message: ${response.error}`, 0);
  }
}

if (require.main === module) {
  validateDeploymentAfterScriptPipelinesVariables(process.env);
  const {
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_BUILD_NUMBER,
    BITBUCKET_EXIT_CODE,
    SERVICE_PACKAGE,
    MICROS_ENV,
    AFP_SLACK_TOKEN,
  } = process.env;

  if (!BITBUCKET_EXIT_CODE) {
    throw new Error('This must be executed in a CI after-script');
  }

  const slackClient = new SlackClient({
    username: 'AFP Service Deployment Notifier',
    token: AFP_SLACK_TOKEN,
  });

  sendSlackNotification({
    packageName: SERVICE_PACKAGE,
    env: MICROS_ENV,
    pipelineLink: `http://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}`,
    exitCode: parseInt(BITBUCKET_EXIT_CODE),
    slackClient,
  }).catch(err => Logger.exit(err, 0));
}
