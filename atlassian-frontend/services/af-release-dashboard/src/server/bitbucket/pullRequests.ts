import axios from 'axios';
import {
  BITBUCKET_PULL_REQUESTS_URL,
  PULL_REQUESTS_PAGE_LENGTH,
} from '../constants';
import getHeaders from './headers';
import { getAxiosErrorMessage } from './errors';
interface BitbucketPullRequestResponse {
  pagelen: number;
  size: number;
  values: BitbucketPullRequest[];
  page: number;
  next: string;
}

export type BitbucketPullRequest = {
  id: string;
  closed_on: string;
  updated_on: string;
  merge_commit: {
    hash: string;
  };
};

function sortByMergedDate(a: BitbucketPullRequest, b: BitbucketPullRequest) {
  return -a.closed_on.localeCompare(b.closed_on);
}

export const getMergedPullRequests = async (
  options: { branch?: string; pageNo?: number } = {},
): Promise<BitbucketPullRequest[]> => {
  const branch = options.branch || 'develop';
  const pageNo = options.pageNo || 1;
  const headers = getHeaders();

  /**
   * TODO: https://product-fabric.atlassian.net/browse/ED-13153
   *
   * @see https://softwareteams.atlassian.net/browse/COREX-4134
   * @see https://softwareteams.atlassian.net/browse/COREX-4136
   *
   * When these tickets are done and deployed, we can remove
   * manual 'fields' expand and use the API sort instead of the
   * `sortByMergedDate` frontend one.
   */
  const apiNativelySupportsClosedOnTimestamp = false;
  const fields = apiNativelySupportsClosedOnTimestamp
    ? ''
    : '&fields=%2Bvalues.closed_on';
  const sort = apiNativelySupportsClosedOnTimestamp ? '&sort=-closed_on' : '';

  const query = `q=state="merged" and destination.branch.name="${branch}"${fields}${sort}&pagelen=${PULL_REQUESTS_PAGE_LENGTH}&page=${pageNo}`;
  return await axios
    .get<BitbucketPullRequestResponse>(
      `${BITBUCKET_PULL_REQUESTS_URL}?${query}`,
      headers,
    )
    .then(async (response) => {
      const error = getAxiosErrorMessage(response);
      if (error) {
        throw new Error(error);
      }
      return response.data;
    })
    .then((result) => result.values.sort(sortByMergedDate))
    .catch((error) => {
      const message =
        getAxiosErrorMessage(error.response) || error.message || error;
      console.error(message);
      throw new Error(`Failed to fetch PRs from Bitbucket.\n\t${message}`);
    });
};
