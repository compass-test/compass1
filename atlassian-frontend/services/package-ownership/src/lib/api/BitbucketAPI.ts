import axios, { AxiosInstance, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { Secrets } from '@atlassian/micros-serverless-platform';

import { Logger } from '../Logger';
import { config } from '../../config';
import {
  PullRequestBBResponse,
  TeamsBBResponse,
  PullRequestCommentsBBResponse,
  PullRequestInfo,
} from '../../types';
import { COMMENT_HEADER } from '../utils';

const baseURL = `https://api.bitbucket.org/2.0/repositories/${config.repository}/`;

/**
 * Client for fetching repository information.
 */
export class BitbucketAPI {
  private static instance: AxiosInstance | undefined;

  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = axios.create({
      baseURL,
      auth: {
        username: await Secrets.get('BB_USERNAME'),
        password: await Secrets.get('BB_APP_PASSWORD'),
      },
    });
    return this.instance;
  }

  /**
   * Fetch teams.json file
   * @param commit Commit hash to fetch the file from
   */
  static async getTeams(commit: string) {
    return (await this.getInstance())
      .get<TeamsBBResponse>(`src/${commit}/teams.json`)
      .then(res => res.data)
      .catch(error => {
        Logger.error('teams.json not found', {
          commit,
          error: error.response || error,
        });
        return undefined;
      });
  }

  /**
   * Fetch Pull Request information
   * @param prId PR ID to use
   */
  static async getPr(prId: string): Promise<PullRequestInfo | undefined> {
    return (await this.getInstance())
      .get<PullRequestBBResponse>(`pullrequests/${prId}`)
      .then(res => ({
        title: res.data.title,
        sourceBranch: res.data.source.branch.name,
        state: res.data.state,
        approvals: res.data.participants
          .filter(participant => participant.approved === true)
          .map(participant => participant.user.account_id),
        reviewers: res.data.participants
          .filter(participant => participant.role === 'REVIEWER')
          .map(participant => participant.user.account_id),
        author: res.data.author.account_id,
      }))
      .catch(error => {
        Logger.error('PR not found', { prId, error: error.response || error });
        return undefined;
      });
  }

  /**
   * Mutate Pull Request to add reviewers
   * @param prId PR ID to use
   * @param title Existing title of the PR (needed for the endpoint to work)
   * @param reviewers Existing and new reviewers
   */
  static async addReviewersToPr(
    prId: string,
    title: string,
    reviewers: string[],
  ) {
    return (await this.getInstance())
      .put(`pullrequests/${prId}`, {
        title,
        reviewers: reviewers.map(account_id => ({ account_id })),
      })
      .catch(error => {
        Logger.error('Failed to add reviewers', {
          prId,
          title,
          reviewers,
          error: error.response || error,
        });
        return undefined;
      });
  }

  /**
   * Get number of comments made by service to PR
   * Returns `-1` upon failure
   * @param prId PR ID to use
   */
  static async getNumberOfComments(prId: string) {
    const instance = await this.getInstance();

    const query = queryString.stringify({
      q: `content.raw ~ "${COMMENT_HEADER}" AND deleted = false`,
    });

    let endpoint: string | undefined = `pullrequests/${prId}/comments?${query}`;
    let response: AxiosResponse<PullRequestCommentsBBResponse>;
    let numComments = 0;

    while (endpoint) {
      try {
        response = await instance.get(endpoint);
        numComments += response.data.size;
        endpoint = response.data.next;
      } catch (error) {
        Logger.error('Failed to fetch comments', {
          prId,
          error: error.response || error,
        });
        return numComments || -1;
      }
    }

    return numComments;
  }

  /**
   * Add comment to a pull request
   * @param prId PR ID to use
   * @param comment Comment as a string (markdown allowed, mentions with @{aaid})
   */
  static async addCommentToPr(prId: string, comment: string) {
    return (await this.getInstance())
      .post(`pullrequests/${prId}/comments`, {
        content: {
          raw: comment,
        },
      })
      .catch(error => {
        Logger.error('Failed to add comment', {
          prId,
          comment,
          error: error.response || error,
        });
        return undefined;
      });
  }
}
