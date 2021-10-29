import axios, { AxiosInstance } from 'axios';
import { getMessagePayload } from './message';

import type { Status } from '../announce';

const initSlack = () => {
  const { AFP_SLACK_TOKEN } = process.env;

  if (!AFP_SLACK_TOKEN) {
    throw new Error('Slack variables are not set');
  }

  return {
    TOKEN: AFP_SLACK_TOKEN,
  };
};

const BASE_API_URL = 'https://slack.com/api';

const CHANNEL_IDS = {
  // Expected channel
  '#twp-release-managers': 'C012AG16T1A',
  // Test channel to avoid spamming people
  '#releases-bot-test': 'C01T1TPMCMV',
};

export default class SlackClient {
  private dry: boolean;

  axiosInstance: AxiosInstance;

  constructor(dry = false) {
    const SLACK = initSlack();
    this.dry = dry;
    this.axiosInstance = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        Authorization: `Bearer ${SLACK.TOKEN}`,
      },
    });
  }

  async sendDeploymentNotification(status: Status, debug = true) {
    const channelName = debug ? '#releases-bot-test' : '#twp-release-managers';
    const payload = {
      channel: CHANNEL_IDS[channelName],
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: getMessagePayload(status),
          },
        },
        {
          type: 'divider',
        },
      ],
      username: 'Product Fabric Deployment Bot',
    };

    try {
      if (this.dry) {
        console.log(`\n${JSON.stringify(payload)}\n`);
      } else {
        await this.axiosInstance.post('/chat.postMessage', payload);
      }
      console.log(
        `Slack message sent to ${channelName}: ${
          status === 'OPERATIONAL'
            ? 'back up to date again'
            : 'no longer up to date'
        }.`,
      );
    } catch (err) {
      console.error('Failed to send Slack message to channel.');
      throw err;
    }
  }
}
