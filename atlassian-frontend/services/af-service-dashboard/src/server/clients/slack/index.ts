import axios, { AxiosInstance } from 'axios';
import { Deployment } from '../../db/entities';
import { initSlack } from '../../utils/env';
import { stats } from '../../utils/stats';
import { Status } from '../service/payloads';

const BASE_API_URL = 'https://slack.com/api';
const DASHBOARD_URL = `https://af-service-dashboard.${process.env.MICROS_ENVTYPE}.atl-paas.net`;
export class SlackClient {
  axiosInstance: AxiosInstance;

  constructor() {
    const SLACK = initSlack();
    this.axiosInstance = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        Authorization: `Bearer ${SLACK.TOKEN}`,
      },
    });
  }

  async sendDeploymentNotification(
    status: Status,
    deployment?: Deployment,
    slackChannelId?: string,
  ) {
    if (!slackChannelId || !deployment) {
      return;
    }

    const {
      service: { name: serviceName },
      env,
      pipelineUuid,
    } = deployment;

    const messageStatus =
      status === 'SUCCESSFUL'
        ? ':successful: *Successfully deployed'
        : ':failed: *Failed to deploy';

    try {
      await this.axiosInstance.post('/chat.postMessage', {
        channel: slackChannelId,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                `${messageStatus} \`${serviceName}\` to \`${env}\`*\n\n` +
                `:hammer_and_wrench: <https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/${pipelineUuid}|Pipeline>\n\n` +
                `:chart_with_upwards_trend: <${DASHBOARD_URL}/${serviceName}|Service Dashboard>`,
            },
          },
          {
            type: 'divider',
          },
        ],
        username: 'AFP Service Deployment Notifier',
      });
      stats.increment('slack_messsage.sent');
    } catch (err) {
      stats.increment('slack_message.failed');
      throw err;
    }
  }
}
