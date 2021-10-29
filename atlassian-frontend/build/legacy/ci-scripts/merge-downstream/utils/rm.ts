import axios, { AxiosBasicCredentials } from 'axios';
import { JiraClient } from '@atlaskit/build-utils/jira';

import { User } from '../types';

export const RC_PREFIX = 'release-candidate/';

/**
 * Fetch RM email from FABDODGEM release issue depending on target branch
 * If target branch isn't an RC branch, get ticket with status "Development"
 */
export async function getReleaseManagerFromRcIssue(
  auth: AxiosBasicCredentials,
  targetBranch: string,
) {
  let releaseName;
  if (targetBranch.startsWith(RC_PREFIX)) {
    releaseName = targetBranch.replace(RC_PREFIX, '').replace('-', '*');
  }

  const jql =
    'project = "FABDODGEM" AND ' +
    (releaseName ? `summary ~ "${releaseName}"` : 'status = "Development"') +
    ' ORDER BY key desc';
  console.log('Fetching issue using jql: ', jql);

  const releaseIssues = await new JiraClient({
    auth,
    instance: 'product-fabric',
  }).searchIssues({
    jql,
    fields: ['key', 'summary', 'assignee', 'status'],
  });

  if (releaseIssues.total === 0) {
    throw new Error(`Found no release tickets`);
  }

  const { assignee, summary } = releaseIssues.issues[0].fields;
  console.log('Found issue: ', summary);
  if (!assignee) {
    throw new Error(`No assignee found on release issue: ${summary}`);
  }

  return assignee as User;
}

/* Converts staff email to Bitbucket uuid to add RM as PR reviewer */
export async function getBitbucketUuid(releaseManagerAaid: string) {
  // Use the aaid to fetch the uuid from BB
  const uuid = await axios
    .get(`https://api.bitbucket.org/2.0/users/${releaseManagerAaid}`)
    .then(res => res.data.uuid)
    .catch(() => undefined);
  // Convert uuid to form that BB accepts for reviewers
  return uuid ? [{ uuid }] : [];
}
