import axios, { AxiosBasicCredentials } from 'axios';
import {
  PullRequestClient,
  PullRequest,
} from '@atlaskit/build-utils/bitbucket';

import { ActionConfig } from '../types';
import { RC_PREFIX } from './rm';

/* Find the next oldest currently open release candidate Pull Request */
export async function findRC(
  currentBranch: string,
  prClient: PullRequestClient,
) {
  // All open PRs with the RC prefix in the source branch name sorted from oldest to newest
  const results = await prClient.search({
    q: `source.branch.name ~ "${RC_PREFIX}" AND state = "OPEN"`,
    sort: 'created_on',
  });

  // If this is run on an RC we want to filter to RC PRs opened afterwards
  let foundCurrentPr = !currentBranch.startsWith(RC_PREFIX);
  const downstreamRCs = results.values.reduce((acc: PullRequest[], pr) => {
    // Double-check rc prefix in case it's somewhere else in the branch name
    if (foundCurrentPr && pr.source.branch.name.startsWith(RC_PREFIX)) {
      acc.push(pr);
    }
    if (!foundCurrentPr && pr.source.branch.name === currentBranch) {
      foundCurrentPr = true;
    }
    return acc;
  }, []);

  if (downstreamRCs.length === 0) {
    return undefined;
  }
  console.log(
    `Found open RCs: ${downstreamRCs
      .map(rc => rc.source.branch.name)
      .join(', ')}`,
  );
  return downstreamRCs[0];
}

export const approvePR = (
  approveLink: string,
  approvalAuth: AxiosBasicCredentials,
) =>
  axios.post(approveLink, null, {
    auth: approvalAuth,
  });

export const createPRDescription = ({
  from,
  to,
  mergeBranch,
  pipelinesLink,
}: ActionConfig) => `
This PR was automatically created to merge \`${from}\` into \`${to}\`, using a temporary intermediate branch \`${mergeBranch}\`


**If the Landkid build fails, please investigate and land manually.**


Created by pipeline: ${pipelinesLink}
`;
