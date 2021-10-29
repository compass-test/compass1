import spawn from 'spawndamnit';

import { ActionConfig, Clients, Credentials } from './types';
import { getBitbucketUuid } from './utils/rm';
import { createLandRequest } from './utils/landkid';
import { createPRDescription, approvePR } from './utils/pull-requests';
import { getMergeConflicts } from './utils/merge-conflicts';
import {
  sendSkippedMessage,
  sendSuccessfulMessage,
  sendFailedMessage,
} from './utils/slack';

export async function handleSkippedMerge(
  actionConfig: ActionConfig,
  { slackClient }: Clients,
) {
  console.log(
    `The merge branch ${actionConfig.mergeBranch} already exists, skipping this merge attempt.`,
  );
  await sendSkippedMessage(actionConfig, slackClient);
}

export async function handleSuccessfulMerge(
  actionConfig: ActionConfig,
  { git, prClient, slackClient }: Clients,
  { approvalAuth, landkidCustomToken }: Credentials,
) {
  const { from, to, mergeBranch, releaseManager } = actionConfig;

  await spawn('yarn', ['changeset', '--empty']);
  await git.push('origin', mergeBranch);
  console.log('Merge branch created');

  const releaseManagerUuids = await getBitbucketUuid(releaseManager.accountId);

  // Create PR for merging merge-branch into target branch
  const pr = await prClient.create({
    title: `Merge branch '${from}' into '${to}'`,
    description: createPRDescription(actionConfig),
    source: mergeBranch,
    destination: to,
    reviewers: releaseManagerUuids,
  });

  console.log(`Pull request created: ${pr.links.html.href}`);

  await approvePR(pr.links.approve.href, approvalAuth);

  // Create the land request and add it to the land-when-able queue
  await createLandRequest(pr.id, landkidCustomToken);

  console.log('PR successfully added to the land-when-able queue');

  await sendSuccessfulMessage(actionConfig, pr.links.html.href, slackClient);
}

export async function handleFailedMerge(
  actionConfig: ActionConfig,
  { git, slackClient }: Clients,
) {
  const mergeConflictDetails = await getMergeConflicts(git);
  await git.merge(['--abort']);
  console.log(`Merge failed`);

  await sendFailedMessage(actionConfig, mergeConflictDetails, slackClient);
}
