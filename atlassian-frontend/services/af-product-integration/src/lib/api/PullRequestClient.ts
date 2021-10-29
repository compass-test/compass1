/* eslint-disable no-console */
import { PullRequestClient as PRClient } from '@atlaskit/build-utils/bitbucket/PullRequestClient';
import { Secrets } from '@atlassian/micros-serverless-platform';
import { Logger } from '../Logger';
import { config } from '../../config';

export class PullRequestClient {
  private static instance: PRClient | undefined;
  private static readonly integratorPrefix = '**Product CI Integration**';

  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new PRClient({
      auth: {
        username: await Secrets.get('BITBUCKET_USER'),
        password: await Secrets.get('BITBUCKET_PASSWORD'),
      },
      logger: Logger,
      repoFullName: config.repository,
    });

    return this.instance;
  }

  static async addIntegratorComment(prId: number, text: string) {
    const client = await this.getInstance();

    let prefix = this.integratorPrefix;

    if (process.env.MICROS_ENV !== 'prod-east') {
      prefix += ` [${process.env.MICROS_ENV}]`;
    }

    console.log({ prId, text });

    return client.upsertComment(prId, prefix, text);
  }
}
