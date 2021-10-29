/**
 * Validates the target branch of a PR depending on whether it includes changes to packages on scheduled releases.
 * Should only be run on pull request pipelines
 * Comments in 2 cases:
 *  1. if the target branch is master and there are changes to packages on scheduled releases
 *    - develop should be targeted
 *  2. if the target branch is develop/RC and there are no changes to packages on scheduled releases
 *    - master can be targeted
 */
import { PullRequestClient } from '@atlaskit/build-utils/bitbucket';
import { getChangedPackages } from '@atlaskit/build-utils/packages';
import { AFPackage } from '@atlaskit/build-utils/types';

type EnvironmentVariables = {
  BITBUCKET_BRANCH: string;
  BITBUCKET_PR_DESTINATION_BRANCH: string;
  BITBUCKET_PR_ID: number;
  BITBUCKET_USER: string;
  BITBUCKET_PASSWORD: string;
  BITBUCKET_REPO_FULL_NAME: string;
};

function validateEnvironmentVariables(
  env: Partial<EnvironmentVariables>,
): env is EnvironmentVariables {
  return !!(
    env.BITBUCKET_BRANCH &&
    env.BITBUCKET_PR_DESTINATION_BRANCH &&
    env.BITBUCKET_PR_ID &&
    env.BITBUCKET_USER &&
    env.BITBUCKET_PASSWORD &&
    env.BITBUCKET_REPO_FULL_NAME
  );
}

const getChangedPackagesOnScheduledReleases = async (
  sourceBranch: string,
  destinationBranch: string,
) => {
  const changedPackages: AFPackage[] = await getChangedPackages(
    sourceBranch,
    destinationBranch,
  );

  return changedPackages
    .filter(
      pkg =>
        pkg.config.atlassian &&
        pkg.config.atlassian.releaseModel === 'scheduled',
    )
    .map(pkg => pkg.name);
};

const COMMENT_PREFIX = ':warning: This pull request is targeting';

// Comment for each branch that the PR is targeting
const createCommentHeader = (destinationBranch: string) => {
  let changes = 'no changes';
  let shouldTarget = 'master';
  if (destinationBranch === 'master') {
    changes = 'changes';
    shouldTarget = 'develop';
  }
  return `\`${destinationBranch}\` with ${changes} to packages on scheduled releases, in most cases the target should be \`${shouldTarget}\`.`;
};

const COMMENT_FOOTER =
  'See [go/af-when-to-merge-to-master](http://go.atlassian.com/af-when-to-merge-to-master) for more information.';

const upsertComment = async (
  prClient: PullRequestClient,
  prId: number,
  packages: string[],
  destinationBranch: string,
) => {
  const commentSections = [createCommentHeader(destinationBranch)];
  if (destinationBranch === 'master') {
    const packagesList = packages.map(pkg => `* \`${pkg}\``).join('\n');
    commentSections.push('\n' + packagesList + '\n');
  }
  commentSections.push(COMMENT_FOOTER);
  await prClient.upsertComment(
    prId,
    COMMENT_PREFIX,
    commentSections.join('\n'),
  );
};

async function main() {
  if (!validateEnvironmentVariables(process.env)) {
    throw new Error('PR Pipelines variables are not defined');
  }

  const {
    BITBUCKET_BRANCH,
    BITBUCKET_PR_DESTINATION_BRANCH,
    BITBUCKET_PR_ID,
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
  } = process.env;

  if (BITBUCKET_BRANCH.startsWith('release-candidate/')) {
    console.log(
      'No need to check for packages on scheduled releases on an RC PR',
    );
    process.exit();
  }

  const targetsMaster = BITBUCKET_PR_DESTINATION_BRANCH === 'master';
  // Behaviour is same for targeting develop or RC
  const targetsDevelop =
    BITBUCKET_PR_DESTINATION_BRANCH === 'develop' ||
    BITBUCKET_PR_DESTINATION_BRANCH.startsWith('release-candidate/');

  if (!targetsMaster && !targetsDevelop) {
    console.log(
      'Target branch is not master, develop, on an RC, no need to check for packages on scheduled releases',
    );
    process.exit();
  } else {
    console.log(`Target branch is ${BITBUCKET_PR_DESTINATION_BRANCH}`);
  }

  const changedOnScheduledReleases = await getChangedPackagesOnScheduledReleases(
    BITBUCKET_BRANCH,
    BITBUCKET_PR_DESTINATION_BRANCH,
  );

  const haveChanged = changedOnScheduledReleases.length > 0;

  if (haveChanged) {
    console.log(
      'Changed packages on scheduled releases found:',
      changedOnScheduledReleases,
    );
  } else {
    console.log('No changed packages on scheduled releases');
  }

  if (
    // Only comment if PR has changes to scheduled releases and targets master
    !(targetsMaster && haveChanged) &&
    // Or if there are no changes and PR targets develop/RC
    !(targetsDevelop && !haveChanged)
  ) {
    console.log('No comment required');
    process.exit();
  }

  const prClient = new PullRequestClient({
    repoFullName: BITBUCKET_REPO_FULL_NAME,
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
  });

  await upsertComment(
    prClient,
    BITBUCKET_PR_ID,
    changedOnScheduledReleases,
    BITBUCKET_PR_DESTINATION_BRANCH,
  );

  console.log('Comment added');
}

if (require.main === module) {
  main().catch(e => {
    if (e.response) {
      console.error(e.response);
    } else {
      console.error(e);
    }
  });
}
