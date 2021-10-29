import AWS from 'aws-sdk';
import { Secrets } from '@atlassian/micros-serverless-platform';
import { getDynamoDBDocumentClient } from '@atlassian/micros-support';

import { Logger } from './Logger';
import { Status, DBStatus } from '../types';

export class DB {
  statusesTableName: string;
  client: AWS.DynamoDB.DocumentClient;

  private static instance: DB | undefined;

  private constructor(
    statusesTableName: string,
    config?: { endpoint: string; region: string },
  ) {
    this.statusesTableName = statusesTableName;
    this.client = getDynamoDBDocumentClient(config);
  }

  private generateCommitBranchKey(commit: string, branchName: string) {
    return `${commit}:${branchName}`;
  }

  private splitCommitBranchKey(commitBranch: string) {
    const splitIndex = commitBranch.indexOf(':');
    if (splitIndex < 0) {
      throw Error(`Cannot split commit branch key "${commitBranch}"`);
    }

    return {
      commit: commitBranch.substring(0, splitIndex),
      branchName: commitBranch.substring(splitIndex + 1),
    };
  }

  /**
   * Get the DynamoDB instance
   */
  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }
    const statusesTableName = await Secrets.get('DYNAMO_STATUSES_TABLE_NAME');
    let config;
    if (process.env.MICROS_ENV === 'local') {
      config = {
        endpoint: await Secrets.get('DYNAMO_STATUSES_ENDPOINT'),
        region: await Secrets.get('DYNAMO_STATUSES_TABLE_REGION'),
      };
    }
    this.instance = new DB(statusesTableName, config);
    return this.instance;
  }

  /**
   * Attempt to fetch all statuses for a commit from DB
   * @param commit Commit hash of the pull request
   */
  async getStatuses(
    commit: string,
    branchName: string,
    includeZeroInstalls = false,
  ): Promise<Status[] | undefined> {
    const read = await this.client
      .query({
        TableName: this.statusesTableName,
        KeyConditionExpression: 'commitBranch = :commitBranch',
        ExpressionAttributeValues: {
          ':commitBranch': this.generateCommitBranchKey(commit, branchName),
        },
      })
      .promise();
    const statuses = read.Items as DBStatus[];
    Logger.info(
      statuses.length > 0
        ? 'Found statuses in db'
        : 'Could not find statuses in db',
      { commit, statuses },
    );
    return statuses
      .map(({ commitBranch, ...rest }) => {
        const { commit, branchName } = this.splitCommitBranchKey(commitBranch);
        return {
          commit,
          branchName,
          ...rest,
        };
      })
      .filter(
        status =>
          includeZeroInstalls ||
          !status.result.successful ||
          status.result.numPackagesInstalled !== 0,
      );
  }

  /**
   * Store mapping of commit to list of changed packages in DB
   * @param commit Commit hash of the pull request
   * @param changedPackages List of the packages changed from the base branch
   */
  async putStatus(
    commit: string,
    product: string,
    branchName: string,
    result: DBStatus['result'],
  ) {
    const status: DBStatus = {
      commitBranch: this.generateCommitBranchKey(commit, branchName),
      product,
      result,
    };
    Logger.info('Storing status in db', status);
    return this.client
      .put({
        TableName: this.statusesTableName,
        Item: status,
      })
      .promise();
  }
}
