import { Secrets } from '@atlassian/micros-serverless-platform';
import { getDynamoDBDocumentClient } from '@atlassian/micros-support';

import { Logger } from './Logger';
import { Package } from '../types';

export class Cache {
  contributorsTableName: string;
  changedPackagesTableName: string;
  client: any;

  private static instance: Cache | undefined;

  private constructor(
    contributorsTableName: string,
    changedPackagesTableName: string,
    config?: { endpoint: string; region: string },
  ) {
    this.contributorsTableName = contributorsTableName;
    this.changedPackagesTableName = changedPackagesTableName;
    this.client = getDynamoDBDocumentClient(config);
  }

  /**
   * Get the DynamoDB Cache instance
   */
  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }
    const contributorsTableName = await Secrets.get(
      'DYNAMO_CONTRIBUTORS_TABLE_NAME',
    );
    const changedPackagesTableName = await Secrets.get(
      'DYNAMO_CHANGED_PACKAGES_TABLE_NAME',
    );
    let config;
    if (process.env.MICROS_ENV === 'local') {
      config = {
        endpoint: await Secrets.get('DYNAMO_CONTRIBUTORS_ENDPOINT'),
        region: await Secrets.get('DYNAMO_CONTRIBUTORS_TABLE_REGION'),
      };
    }
    this.instance = new Cache(
      contributorsTableName,
      changedPackagesTableName,
      config,
    );
    return this.instance;
  }

  /**
   * Attempt to fetch a user's aaid from the DB
   * @param staffId User's atlassian staff ID (e.g. jgardner)
   */
  async getAccountId(staffId: string): Promise<string | undefined> {
    const read = await this.client
      .get({
        TableName: this.contributorsTableName,
        Key: { staffId },
      })
      .promise();
    return (read && read.Item && read.Item.accountId) || undefined;
  }

  /**
   * Store mapping of staff ID to aaid in DB
   * @param staffId User's atlassian staff ID (e.g. jgardner)
   * @param accountId Atlassian account ID
   */
  async putAccountId(staffId: string, accountId: string) {
    return this.client
      .put({
        TableName: this.contributorsTableName,
        Item: { staffId, accountId },
      })
      .promise();
  }

  /**
   * Attempt to fetch the changed packages for a commit from DB
   * @param commit Commit hash of the pull request
   */
  async getChangedPackages(commit: string): Promise<Package[] | undefined> {
    const read = await this.client
      .get({
        TableName: this.changedPackagesTableName,
        Key: { commit },
      })
      .promise();
    const changedPackages =
      (read && read.Item && read.Item.changedPackages) || undefined;
    Logger.info(
      changedPackages
        ? 'Found changedPackages in cache'
        : 'Could not find changedPackages in cache',
      { commit, changedPackages },
    );
    return changedPackages;
  }

  /**
   * Store mapping of commit to list of changed packages in DB
   * @param commit Commit hash of the pull request
   * @param changedPackages List of the packages changed from the base branch
   */
  async putChangedPackages(commit: string, changedPackages: Package[]) {
    Logger.info('Storing changedPackages in cache', {
      commit,
      changedPackages,
    });
    return this.client
      .put({
        TableName: this.changedPackagesTableName,
        Item: { commit, changedPackages },
      })
      .promise();
  }
}
