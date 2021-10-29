/**
 * ## README ##
 *
 * Adds a comment and task to all PRs that don't contain a required commit with instructions to rebase.
 *
 * Should be executed from pipelines.
 * If it needs to be run locally the AFP Repo Bot credentials can be found in the LastPass.
 *
 * Required environment variables:
 *    - BITBUCKET_USER
 *    - BITBUCKET_PASSWORD
 *    - BITBUCKET_REPO_FULL_NAME
 *    - ANCESTOR
 *
 * Optional environment variables:
 *    - TARGET_BRANCH = only comment on PRs targeting this branch
 *    - MESSAGE = append a custom message to the comment
 *    - DRY_RUN = don't add anything to PRs only log actions
 *
 * This script should be run by a member of Atlassian Frontend Platform in the event of a tooling change
 * requiring all other members of the atlassian-frontend repo to rebase.
 *
 * Please only run when required. If used too often, people will start ignoring the notifications
 * and the benefit will be lost.
 */

import { PullRequestClient } from '@atlaskit/build-utils/bitbucket';
import { validateEnvVars } from '@atlaskit/build-utils/guards';
import { isAncestorOf } from '@atlaskit/build-utils/git';

type Env = {
  BITBUCKET_USER: string;
  BITBUCKET_PASSWORD: string;
  BITBUCKET_REPO_FULL_NAME: string;
  ANCESTOR: string;
};

async function main() {
  validateEnvVars<Env>(process.env, [
    'BITBUCKET_USER',
    'BITBUCKET_PASSWORD',
    'BITBUCKET_REPO_FULL_NAME',
    'ANCESTOR',
  ]);

  const {
    ANCESTOR,
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
    TARGET_BRANCH,
    MESSAGE,
    DRY_RUN,
  } = process.env;

  const prClient = new PullRequestClient({
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
    repoFullName: BITBUCKET_REPO_FULL_NAME,
  });
  await addRebaseComments(
    prClient,
    ANCESTOR,
    TARGET_BRANCH,
    MESSAGE,
    DRY_RUN === 'true',
  );
}

async function addRebaseComments(
  prClient: PullRequestClient,
  ancestor: string,
  targetBranch?: string,
  message?: string,
  dryRun?: boolean,
) {
  let prQuery = 'state = "OPEN"';
  if (targetBranch) {
    prQuery += ` AND destination.branch.name = "${targetBranch}"`;
  }
  const prResults = await prClient.search({ q: prQuery });

  // This comment acts as a column header above console logs in the below loop.
  console.log('\nhasCommit branchName');

  // Go through the PRs and see if they need notifying.
  for (const pr of prResults.values) {
    const hasAncestor = await isAncestorOf(
      ancestor,
      `origin/${pr.source.branch.name}`,
    );
    console.log(hasAncestor, pr.source.branch.name);

    // Comment on open PRs telling them to rebase onto branch.
    if (!dryRun && !hasAncestor) {
      await addCommentAndTaskToPr(prClient, pr.id, ancestor, message);
    }
  }
}

async function addCommentAndTaskToPr(
  prClient: PullRequestClient,
  prId: number,
  ancestor: string,
  message?: string,
) {
  let commentMessage = `Please rebase your branch onto your target branch to allow for successful merging. Missing commit ${ancestor}

  To confirm if your branch is up to date, run the following command locally:
  \`$ git merge-base --is-ancestor ${ancestor} HEAD && echo "All good" || echo "Still need to rebase"\``;

  if (message) {
    commentMessage += `\n\nAdditional information: ${message}`;
  }

  try {
    const comment = await prClient.addComment(prId, commentMessage);
    await prClient.addTask(prId, 'Rebase / merge target branch', comment.id);
    console.log(prId, 'Comment and task added');
  } catch (err) {
    console.error(prId, err.response.statusText);
  }
}

if (require.main === module) {
  main().catch(e => {
    console.log(e);
    process.exit(1);
  });
}
