// Script that uses Landkid to automatically merge branches
// If executed on master, will merge into the oldest open RC, otherwise into develop
// If executed on an RC, will merge into the next open RC, otherwise into develop
// Will notify the current release managers via slack upon failure of the merge
import simplegit from 'simple-git/promise';
import { PullRequestClient } from '@atlaskit/build-utils/bitbucket';
import { SlackClient } from '@atlaskit/build-utils/slack';

import { validateEnvVariables } from './utils/env-variables';
import { findRC } from './utils/pull-requests';
import { resolveMergeConflicts } from './utils/merge-conflicts';
import { getReleaseManagerFromRcIssue, RC_PREFIX } from './utils/rm';
import {
  handleSkippedMerge,
  handleSuccessfulMerge,
  handleFailedMerge,
} from './actions';

async function main(targetBranchOverride?: string) {
  validateEnvVariables(process.env);

  const {
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_BUILD_NUMBER,
    BITBUCKET_BRANCH,
    ATLASSIAN_USER,
    ATLASSIAN_PASSWORD,
    BOT_APPROVER_USER,
    BOT_APPROVER_PASSWORD,
    LANDKID_CUSTOM_TOKEN,
    SLACK_RELEASE_MANAGERS_CHANNEL,
    AFP_SLACK_TOKEN,
  } = process.env;

  const bbAuth = {
    username: BITBUCKET_USER,
    password: BITBUCKET_PASSWORD,
  };
  const jiraAuth = {
    username: ATLASSIAN_USER,
    password: ATLASSIAN_PASSWORD,
  };
  const approvalAuth = {
    username: BOT_APPROVER_USER,
    password: BOT_APPROVER_PASSWORD,
  };

  const prClient = new PullRequestClient({
    auth: bbAuth,
    repoFullName: BITBUCKET_REPO_FULL_NAME,
  });

  const slackClient = new SlackClient({
    channel: SLACK_RELEASE_MANAGERS_CHANNEL,
    username: 'AFP Downstream Merge Notifier',
    token: AFP_SLACK_TOKEN,
  });

  const pipelinesLink = `https://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}`;

  const from = BITBUCKET_BRANCH;
  if (from !== 'master' && !from.startsWith(RC_PREFIX)) {
    throw new Error(
      'This script should only be run on master or the current release-candidate.',
    );
  }

  const date = new Date();
  date.setHours(date.getHours() + 10);
  const dateStr = date.toISOString().split('T')[0];
  const mergeBranch = `merge-branch/merge-${from.replace(
    RC_PREFIX,
    'rc-',
  )}-${dateStr}`;

  // Create branch for attempting merge
  const git = simplegit();
  await git.fetch('origin');

  // If no RC exists to merge into, merge into develop
  let to = 'develop';
  if (targetBranchOverride) {
    // Allow specifying a target branch override - used for testing purposes
    to = targetBranchOverride;
  } else {
    const rc = await findRC(from, prClient);
    if (rc) {
      to = rc.source.branch.name;
    }
  }
  console.log(`Target branch is ${to}`);

  // Fetch current release manager from FABDODGEM project
  const releaseManager = await getReleaseManagerFromRcIssue(jiraAuth, to);

  const actionConfig = {
    from,
    to,
    mergeBranch,
    pipelinesLink,
    releaseManager,
  };

  const clients = {
    git,
    prClient,
    slackClient,
  };

  if (!!(await git.listRemote(['--heads', 'origin', mergeBranch]))) {
    return handleSkippedMerge(actionConfig, clients);
  }

  await git.checkoutBranch(mergeBranch, `origin/${to}`);
  console.log(`Created branch ${mergeBranch} from origin/${to}`);

  // Attempt to merge master into new branch
  console.log(`Attempting merge from ${from} to ${mergeBranch}`);

  let successfulMerge = true;
  try {
    await git.merge([`origin/${from}`]);
  } catch (err) {
    console.error(err);
    successfulMerge = await resolveMergeConflicts(git);
  }

  if (successfulMerge) {
    await handleSuccessfulMerge(actionConfig, clients, {
      approvalAuth,
      landkidCustomToken: LANDKID_CUSTOM_TOKEN,
    });
  } else {
    await handleFailedMerge(actionConfig, clients);
  }
}

if (require.main === module) {
  const targetBranchOverride = process.argv[2] || undefined;
  main(targetBranchOverride).catch(e => {
    if (e.response) {
      console.error(e.response);
    } else {
      console.error(e);
    }
    process.exit(1);
  });
}
