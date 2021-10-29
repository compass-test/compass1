import axios, {
  AxiosBasicCredentials,
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import queryString from 'query-string';
import {
  PrApproval,
  PrComment,
  PaginatedPrComments,
  PullRequest,
  PaginatedPullRequests,
} from './types';

const baseApiUrl = 'https://api.bitbucket.org/2.0';

type SortFilterOpts = {
  // Filters request based on object properties, see https://developer.atlassian.com/bitbucket/api/2/reference/meta/filtering
  q?: string;
  // Default order is ascending, prepend hyphen to reverse order, e.g. -updated_on
  sort?: string;
};

type PullRequestOpts = {
  title: string;
  description?: string;
  source: string;
  destination: string;
  closeSourceBranch?: boolean;
  reviewers?: { [type: string]: string }[];
};

type Logger = {
  info: (...args: any) => any;
  error: (...args: any) => any;
};

export class PullRequestClient {
  axiosInstance: AxiosInstance;
  logger: Logger;

  constructor({
    auth,
    repoFullName,
    logger,
  }: {
    auth: AxiosBasicCredentials;
    repoFullName: string;
    logger?: Logger;
  }) {
    this.axiosInstance = axios.create({
      baseURL: `${baseApiUrl}/repositories/${repoFullName}`,
      auth,
    });
    this.logger = logger || console;
  }

  /**
   * Open a pull request
   *
   * @see https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pullrequests#post
   */
  async create({
    title,
    description = '',
    source,
    destination,
    closeSourceBranch = true,
    reviewers = [],
  }: PullRequestOpts): Promise<PullRequest> {
    const response = await this.axiosInstance.post<PullRequest>(
      '/pullrequests',
      {
        title,
        description,
        source: {
          branch: {
            name: source,
          },
        },
        destination: {
          branch: {
            name: destination,
          },
        },
        close_source_branch: closeSourceBranch,
        reviewers,
      },
    );
    return response.data;
  }

  /**
   * Close a pull request
   *
   * Returns 200 when successfully declined, or 555 if it timed out.
   *
   * @see https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/decline
   */
  async decline(prId: number, reason = 'Programmatically closed') {
    const response = await this.axiosInstance.post<PullRequest>(
      `/pullrequests/${prId}/decline`,
      {
        message: reason,
      },
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  /**
   * Approve a pull request
   *
   * @see https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/approve
   */
  async approve(prId: number) {
    const response = await this.axiosInstance.post<PrApproval>(
      `/pullrequests/${prId}/approve`,
    );
    return response.data;
  }

  /**
   * Get the comments on a pull request
   *
   * @see https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/comments
   */
  async getComments(prId: number, opts?: SortFilterOpts) {
    let query;
    if (opts) {
      query = `?${queryString.stringify(opts)}`;
    }

    let endpoint: string | undefined = `/pullrequests/${prId}/comments${
      query || ''
    }`;
    let response: AxiosResponse<PaginatedPrComments>;
    const fullResponse: {
      size: number;
      values: PrComment[];
    } = {
      size: 0,
      values: [],
    };

    while (endpoint) {
      response = await this.axiosInstance.get<PaginatedPrComments>(endpoint);
      fullResponse.size += response.data.size;
      fullResponse.values.push(...response.data.values);
      endpoint = response.data.next;
    }

    return fullResponse;
  }

  /**
   * Add a comment into a pull request
   *
   * @see https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pullrequests/%7Bpull_request_id%7D/comments#post
   */
  async addComment(prId: number, text: string): Promise<PrComment> {
    const response = await this.axiosInstance.post<PrComment>(
      `/pullrequests/${prId}/comments`,
      {
        content: {
          raw: text,
        },
      },
    );
    return response.data;
  }

  /**
   * Delete a comment from a pull request
   */
  async deleteComment(prId: number, comment: PrComment) {
    const response = await this.axiosInstance.delete(
      `/pullrequests/${prId}/comments/${comment.id}`,
    );
    return response.data;
  }

  /**
   * Replace a comment with a revised newer verrsion
   *
   * Searches for an existing comment, and if found, deletes it, ahead of adding a new comment.
   */
  async upsertComment(prId: number, prefixIdentifier: string, text: string) {
    const commentContent = `${prefixIdentifier} ${text}`;
    let numDeleted = 0;

    const comments = await this.getComments(prId, {
      q: `content.raw ~ "${prefixIdentifier}" AND deleted = false`,
    });
    if (comments.size > 0) {
      if (comments.size > 1) {
        this.logger.error(
          `Found more than one comment with prefix '${prefixIdentifier}' in PR #${prId}. There should only be 0 or 1.`,
        );
      }
      for (const comment of comments.values) {
        if (comment.content.raw === commentContent) {
          continue;
        }
        await this.deleteComment(prId, comment);
        numDeleted += 1;
      }
    }

    if (numDeleted === comments.size) {
      await this.addComment(prId, commentContent);
    }
  }

  /**
   * Search for a particular pull request within the recent history
   */
  async search(opts: SortFilterOpts) {
    let query;
    if (opts) {
      query = `?${queryString.stringify(opts)}`;
    }

    let endpoint: string | undefined = `/pullrequests${query || ''}`;
    let response: AxiosResponse<PaginatedPullRequests>;
    const fullResponse: {
      size: number;
      values: PullRequest[];
    } = {
      size: 0,
      values: [],
    };

    while (endpoint) {
      response = await this.axiosInstance.get<PaginatedPullRequests>(endpoint);
      fullResponse.size += response.data.size;
      fullResponse.values.push(...response.data.values);
      endpoint = response.data.next;
    }

    return fullResponse;
  }

  /**
   * Add a new task within a pull request.
   */
  async addTask(
    prId: number,
    text: string,
    commentId?: number,
  ): Promise<PrComment> {
    const response = await this.axiosInstance.post<PrComment>(
      `/pullrequests/${prId}/tasks`,
      {
        content: {
          raw: text,
        },
        ...(commentId && {
          comment: {
            id: commentId,
          },
        }),
      },
    );
    return response.data;
  }

  /**
   * Delete a task from a pull request
   */
  async deleteTask(prId: number, taskId: string): Promise<PrComment> {
    const response = await this.axiosInstance.delete<PrComment>(
      `/pullrequests/${prId}/tasks/${taskId}`,
    );
    return response.data;
  }
}
