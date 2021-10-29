import axios, { AxiosInstance } from 'axios';
import {
  Overrides,
  LookupByEmailOpts,
  MessageOpts,
  UserResponse,
  SendMessageResponse,
} from './types';

type Logger = {
  info: (...args: any) => any;
  error: (...args: any) => any;
};

const BASE_API_URL = 'https://slack.com/api';

export class SlackClient {
  token: string;
  axiosInstance: AxiosInstance;
  logger: Logger;
  channel?: string;
  username?: string;

  constructor({
    channel,
    username,
    token,
    logger,
  }: Overrides & {
    token: string;
    logger?: Logger;
  }) {
    this.token = token;
    this.channel = channel;
    this.username = username;
    this.axiosInstance = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.logger = logger || console;
  }

  async lookupUserByEmail({ email }: LookupByEmailOpts) {
    const result = await this.axiosInstance.get<UserResponse>(
      `/users.lookupByEmail?email=${email}&token=${this.token}`,
    );
    return result.data;
  }

  async sendMessage({ username, channel, message }: MessageOpts) {
    const result = await this.axiosInstance.post<SendMessageResponse>(
      '/chat.postMessage',
      {
        channel: channel || this.channel,
        username: username || this.username,
        ...(typeof message === 'string'
          ? { text: message }
          : { blocks: message }),
      },
    );
    return result.data;
  }
}
