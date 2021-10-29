import path from 'path';

import simpleGit from 'simple-git/promise';

import { TEST_REPORT_DIR } from '../constants';
import {
  attemptLandPullRequest,
  closePullRequest,
  openPullRequestForPackage,
  populatePullRequest,
} from '../pull-request/pull-request';
import { BitbucketApi } from '../pull-request/utils/bitbucket';
import { analyticsClient, getAnalyticsPayload } from '../utils/analytics';

import { getParsedTests } from './parse-tests';
import { skipFailedTests } from './skip-failed-tests';

export default async function main(reportsPath: string = TEST_REPORT_DIR) {
  // Read the failed test reports
  console.log('Read reports from directory:\n', path.resolve(reportsPath));
  if (reportsPath.endsWith('/')) {
    // Trim trailing slash from folder path
    reportsPath = reportsPath.slice(0, -1);
  }
  const packageTests = await getParsedTests(reportsPath);
  const packages = Object.entries(packageTests);

  // Create a git instance for PR manipulation
  const git = simpleGit();

  // Store current branch name for later restoration
  const originalBranch = await git.revparse(['--abbrev-ref', 'HEAD']);

  // Loop through each package that has failed tests
  for (let [packageName, skippedTests] of packages) {
    // Create an empty pull request up front. We do this so that we can include the PR url in the
    // Jira tickets we create to compliment each (soon to be) skipped test.
    const { url, branch, id: prId } = await openPullRequestForPackage(
      git,
      packageName,
      skippedTests.total,
    );

    if (!process.env.CI) {
      /**
       * Local testing workaround:
       *
       * When refactoring files in this package, we face a conundrum where it's
       * difficult to validate the changes ahead of merging the PR, due to having
       * to switch branches during the testing process (which discards the changes).
       *
       * We create a new branch off origin/master which means any changes in the
       * feature branch are lost upon switching.
       *
       * To avoid this problem, we cherry pick the feature branch's changes into our
       * new branch to ensure they're retained. This has the consequence that the
       * generated pull request will contain not only the skipped tests, but also
       * the feature branch changes, but that's only a temporary state during active
       * development which dissapears once the feature branch is merged.
       */
      console.log(
        `Cherry picking changes from local feature branch: ${originalBranch}`,
      );
      // Cherry pick in all commits from the feature branch that aren't merged into master yet
      await git.raw(['cherry-pick', `@..${originalBranch}`]);
    }

    // Run Codemods over failed tests to skip them. Jira ticket creation also occurs at this point.
    const [
      unskippedVrTests,
      unskippedIntegrationTests,
      unskippedMobileTests,
    ] = await Promise.all([
      skipFailedTests('vr', url, skippedTests.vr),
      skipFailedTests('integration', url, skippedTests.integration),
      skipFailedTests('mobile', url, skippedTests.mobile),
    ]);

    const testsSkippedByCodemods = [
      ...(skippedTests.vr || []),
      ...(skippedTests.integration || []),
      ...(skippedTests.mobile || []),
    ].filter(test => test.skipped === true);

    if (testsSkippedByCodemods.length) {
      // Populate the pull request with the skipped tests
      const populated = await populatePullRequest(
        git,
        branch,
        testsSkippedByCodemods,
      );
      if (populated) {
        // Confirm the remote PR is up to date ahead of attempting to land it.
        const latestCommit = (await git.raw(['rev-parse', 'HEAD'])).trim();
        const ready = await BitbucketApi.waitForCommit(latestCommit, 6, 10000);
        if (ready) {
          // Although the commit is known to be upstream when `ready` is true,
          // attempts to approve the PR immediately get thwarted, because
          // Bitbucket thinks the approval has occured before the new commit
          // has fully propagated its systems, which invalidates the approval.
          // To counteract this quirk, we arbitrarily wait 20 seconds before
          // attempting to approve and land.
          await new Promise(resolve => setTimeout(resolve, 20000));
          // Approve the PR, and ask it to “Land when able” (pending all green builds).
          await attemptLandPullRequest(prId, true);
        } else {
          console.error(
            `Unable to auto-approve and land pull request because we can't confirm the latest commit (${latestCommit}) is upstream.`,
          );
        }
      }
    } else {
      console.log(
        `Pull request #${prId} for ${packageName} has no changes and will be closed`,
      );
      // If there's nothing to commit, we close the empty PR as it's redundant.
      const closed = await closePullRequest(prId);
      if (!closed) {
        console.warn(`Failed to close pull request ${prId}`);
      }
    }

    if (unskippedVrTests) {
      unskippedVrTests.forEach(test =>
        analyticsClient.sendEvent(
          getAnalyticsPayload(test, 'codemod_failed', { testType: 'vr' }),
        ),
      );
    }
    if (unskippedIntegrationTests) {
      unskippedIntegrationTests.forEach(test =>
        analyticsClient.sendEvent(
          getAnalyticsPayload(test, 'codemod_failed', {
            testType: 'integration',
          }),
        ),
      );
    }
    if (unskippedMobileTests) {
      unskippedMobileTests.forEach(test =>
        analyticsClient.sendEvent(
          getAnalyticsPayload(test, 'codemod_failed', {
            testType: 'mobile',
          }),
        ),
      );
    }
  }

  // Restore original branch
  await git.raw(['checkout', originalBranch]);
}

if (require.main === module) {
  if (process.argv.length !== 3) {
    console.error(
      `Must provide path to reports directory containing generated JUnit JSON files.`,
    );
    process.exit(1);
  } else {
    const reportsPath = process.argv[2];
    main(reportsPath).catch(err => {
      console.error(err);
      process.exit(1);
    });
  }
}
