import { PAGINATION_THRESHOLD_IN_HOURS } from '../../../constants';
import { getMergedPullRequests } from '../../../bitbucket';
import { calcDiffInHours } from './time';

import type { BitbucketPullRequest } from '../../../bitbucket';
import type { PrSummary, PullRequestsMetadata } from './types';

function getPullRequestHash(pullRequest: BitbucketPullRequest): string {
  return pullRequest.merge_commit.hash;
}

function getPrSummary(pr: BitbucketPullRequest): PrSummary {
  const { closed_on: timestamp } = pr;
  return {
    commit: getPullRequestHash(pr),
    timestamp,
    date: new Date(timestamp),
  };
}

export async function parsePullRequests(
  pullRequests: BitbucketPullRequest[],
  lastDeploymentCommitHash: string,
  lastDeploymentTimestamp: string,
): Promise<PullRequestsMetadata> {
  const latestPr = pullRequests[0];
  const { closed_on: latestCommitTimestamp } = latestPr;
  const lastDeploymentDate = new Date(lastDeploymentTimestamp);

  // We avoid making paginated requests to find the deployed commit's PR
  // If the time difference between the deployment and the latest commit
  // exceeds our threshold.
  // When this elapses, it's very stale, so the PR count is irrelevant.
  if (
    calcDiffInHours(lastDeploymentTimestamp, latestCommitTimestamp) >=
    PAGINATION_THRESHOLD_IN_HOURS
  ) {
    const msg = `
      Stale Deployment: the time between the last deployment and the latest commmit exceeded our time threshold of ${
        PAGINATION_THRESHOLD_IN_HOURS / 24
      } days.
      Aborting the loading of pull requests as the number of missing PRs is irrelevant at this stage.
    `;
    console.warn(msg);
    // If the deployed PR is too old, we don't bother using pagination to find
    // an accurate figure, we just return the paged payload size to avoid
    // delaying the request's response.
    return {
      numPrsBehind: pullRequests.length,
      latestPr: getPrSummary(latestPr),
      deployedPr: {
        commit: lastDeploymentCommitHash,
        timestamp: lastDeploymentTimestamp,
        date: lastDeploymentDate,
      },
    };
  }

  let pageNo = 1;
  let numberOfPullRequestsBehind = 0;
  let lastPrInResults = pullRequests[pullRequests.length - 1];

  // Optionally load further paginated results if the deployment date is older
  // than the last result in the paged data.
  // Up to a maximum of 3 pages before giving up.
  while (
    pageNo < 3 &&
    pullRequests &&
    new Date(lastPrInResults.closed_on) > lastDeploymentDate
  ) {
    numberOfPullRequestsBehind += pullRequests.length;
    pullRequests = await getMergedPullRequests({ pageNo: ++pageNo });
    lastPrInResults = pullRequests[pullRequests.length - 1];
    console.warn(
      `Failed to find matching PR for deployed commit. Loading next page: ${pageNo}`,
    );
  }

  if (!pullRequests) {
    throw new Error(`Paginated PR results for page ${pageNo} didn't exist.`);
  }

  // Find the deployed commit within the PR results
  const index = pullRequests.findIndex((pullRequest: BitbucketPullRequest) => {
    // We use startsWith to support varying SHA lengths. e.g. 12 vs 40
    return lastDeploymentCommitHash.startsWith(getPullRequestHash(pullRequest));
  });

  // If we failed to find a match (gave up early for response performance)
  // we return indicative information
  if (index === -1) {
    throw new Error(`
      Failed to find the PR for the deployed commit '${lastDeploymentCommitHash}'.
      Unable to ascertain the number of PRs between it and the latest commit.
      Checked the latest ${pullRequests.length} PRs from ${pageNo} paged sets.
    `);
  }

  // Return full information
  const deployedPr = pullRequests[index];
  const nextPr = index > 0 ? pullRequests[index - 1] : undefined;
  return {
    numPrsBehind: numberOfPullRequestsBehind + index,
    latestPr: getPrSummary(latestPr),
    deployedPr: getPrSummary(deployedPr),
    prAfterDeployed: nextPr ? getPrSummary(nextPr) : undefined,
  };
}
