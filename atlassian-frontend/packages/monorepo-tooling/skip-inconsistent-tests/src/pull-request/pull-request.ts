import type { SimpleGit } from 'simple-git/promise';

import { PullRequestClient } from '@atlaskit/build-utils/bitbucket';

import type { Test } from '../types';
import { getAxiosErrorMessage } from '../utils/axios';
import { getDateString } from '../utils/dates';

import { getBranchName } from './branch';
import getDescription from './pr-description-markdown';
import { createLandRequest } from './utils/landkid';

const { LANDKID_CUSTOM_TOKEN } = process.env;
const landkidCustomToken = LANDKID_CUSTOM_TOKEN || '';

let prClient: PullRequestClient | undefined;

// Default pull request client used for opening and closing a pull request
export function getPullRequestClient() {
  if (prClient) {
    return prClient;
  }

  const { BITBUCKET_USER, BITBUCKET_PASSWORD } = process.env;
  prClient = new PullRequestClient({
    auth: {
      username: BITBUCKET_USER || '',
      password: BITBUCKET_PASSWORD || '',
    },
    repoFullName: 'atlassian/atlassian-frontend',
  });

  return prClient;
}

/**
 * Open an empty pull request to house our skipped tests.
 *
 * We open it ahead of making changes to get the generated pull request URL
 * which we utilise in the codemods ahead of modifying the files.
 */
export async function openPullRequestForPackage(
  git: SimpleGit,
  packageName: string,
  expectedSkipCount: number,
  verbose = false,
) {
  const baseBranch = process.env.BITBUCKET_BRANCH || 'master';
  const skippedTestsBranch = getBranchName(packageName);
  if (verbose) {
    console.log(
      `Created new branch ${skippedTestsBranch} from origin/${baseBranch}`,
    );
  }

  await git.checkoutBranch(skippedTestsBranch, `origin/${baseBranch}`);
  if (verbose) {
    console.log(
      `Created branch ${skippedTestsBranch} from origin/${baseBranch}`,
    );
  }

  // Push empty commit to allow opening a pull request
  await git.commit(
    ['Empty commit to create a pull request up front.', '[skip ci]'],
    undefined,
    { '--allow-empty': true },
  );
  await git.push('origin', skippedTestsBranch, { '--set-upstream': true });

  if (verbose) {
    console.log(`Creating pull request for ${packageName}...`);
  }
  const today = getDateString();
  const prTitle = `Auto skipped tests for ${packageName} on ${today}`;
  const prDescription = getDescription(expectedSkipCount);

  try {
    const { url, id } = await createPullRequest(
      skippedTestsBranch,
      baseBranch,
      prTitle,
      prDescription,
    );
    console.log(`Pull request created for ${packageName}: ${url}`);

    // Store the PR url and temp file for later use
    return {
      url,
      id,
      branch: skippedTestsBranch,
    };
  } catch (error) {
    // Intercept Axios errors to avoid the auth credentials being printed during error output
    // e.g. if we pass through an invalid payload in the request.
    const message =
      getAxiosErrorMessage(error.response) || error.message || error;
    throw new Error(`Failed to create pull request.\n\t${message}`);
  }
}

/**
 * Open a pull request on Bitbucket
 */
async function createPullRequest(
  source: string,
  destination: string,
  title: string,
  description: string,
) {
  const prClient = getPullRequestClient();

  if (process.env.DRY_RUN === 'true') {
    // Avoid spamming people during test runs.
    // A WIP prefix avoids assigning reviewers to the PR.
    title = `[WIP] ${title}`;
  }

  const pullRequest = await prClient.create({
    title,
    description,
    source,
    destination,
  });

  return { url: pullRequest.links.html.href, id: pullRequest.id };
}

export async function closePullRequest(id: number) {
  const prClient = getPullRequestClient();
  return await prClient.decline(
    id,
    'Codemods failed to skip all the failed tests within this package.',
  );
}

/**
 * Populate the pull request with the skipped tests after running the codemods.
 */
export async function populatePullRequest(
  git: SimpleGit,
  skippedTestsBranch: string,
  skippedTests: Test[],
  verbose = false,
) {
  if (skippedTests.length === 0) {
    console.warn('No skipped tests to commit. Aborting early.');
    return false;
  }

  if (verbose) {
    console.log('Staging skipped test files...');
  }
  for (let test of skippedTests) {
    if (test.skipped) {
      // Stage the skipped tests
      await git.add(test.path);
    }
  }

  const stagedFilesInfo = await git.raw(['diff', '--cached', '--numstat']);
  if (!stagedFilesInfo) {
    console.error(
      'Nothing to commit despite apparently having skipped tests. Aborting early.',
    );
    // If we don't have files to commit, then the ammendment below would fail,
    // so we abort early.
    return false;
  }

  if (verbose) {
    console.log('Commit skipped tests...');
  }

  // The PR was opened with an empty commit. That's undesirable in our git history
  // so we rewrite it by amending the previous empty commit with the skipped tests
  // and a revised message.
  await git.commit(
    'CI automatically skipped inconsistent test(s).',
    undefined,
    { '--amend': true },
  );
  if (verbose) {
    console.log('Push to remote...');
  }
  // Because we've rewritten history, we force push to origin
  await git.raw(['push', '--force', 'origin', skippedTestsBranch]);
  console.log('Changes are now upstream on remote.');
  return true;
}

export async function attemptLandPullRequest(id: number, verbose = false) {
  if (!id) {
    console.warn('Unable to land a pull request without an ID.');
    return;
  }
  const { BOT_APPROVER_USER, BOT_APPROVER_PASSWORD } = process.env;
  if (!BOT_APPROVER_USER || !BOT_APPROVER_PASSWORD) {
    console.warn('Unable to approve pull request without credentials.');
    return;
  }
  if (verbose) {
    console.log('Approving PR...');
  }
  try {
    // The account used to open a PR can't be used to approve it, so we spawn a new
    // client with alternate credentials than `getPullRequestClient`.
    const prClient = new PullRequestClient({
      auth: {
        username: BOT_APPROVER_USER || '',
        password: BOT_APPROVER_PASSWORD || '',
      },
      repoFullName: 'atlassian/atlassian-frontend',
    });
    const approval = await prClient.approve(id);
    if (approval.approved !== true) {
      throw new Error(JSON.stringify(approval));
    }
  } catch (err) {
    console.log('Failed to approve PR: ', err);
  }

  if (verbose) {
    console.log('Creating land request for PR...');
  }
  try {
    const result = await createLandRequest(id, landkidCustomToken);
    if (result.status !== 200) {
      const { status, statusText, data } = result;
      throw new Error(`${status}: ${statusText}. ${data}`);
    }
  } catch (err) {
    console.log('Failed to queue PR', err);
  }

  console.log(
    `Pull request #${id} has been approved, and a land request has been requested (pending green builds).`,
  );
}
