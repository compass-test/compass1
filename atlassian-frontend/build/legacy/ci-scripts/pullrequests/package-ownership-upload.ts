/**
 * Calls package-ownership lambda to execute first step:
 *    - uploads relevant information for the service to perform the ownership check for Landkid
 *    - optionally adds reviewers to PR
 */
import path from 'path';
import axios from 'axios';
import meow from 'meow';
import minimatch from 'minimatch';
import httpleaseAsap from 'httplease-asap';
import git from '@atlaskit/build-utils/git';
import { getChangedPackagesFromChangedFiles } from '@atlaskit/build-utils/packages';
import { containsBranchPrefix } from '@atlaskit/build-utils/branchPrefixes';
import { AFPackage } from '@atlaskit/build-utils/types';

type Opts = {
  reviewers: boolean;
  comment: boolean;
};

type EnvironmentVariables = {
  BITBUCKET_PR_DESTINATION_BRANCH: string;
  BITBUCKET_PR_ID: string;
  BITBUCKET_COMMIT: string;
  BITBUCKET_BRANCH: string;
  PACKAGE_OWNERSHIP_ASAP_KEY: string;
  PACKAGE_OWNERSHIP_URL: string;
};

function validateEnvironmentVariables(
  env: Partial<EnvironmentVariables>,
): env is EnvironmentVariables {
  return !!(
    env.BITBUCKET_PR_DESTINATION_BRANCH &&
    env.BITBUCKET_PR_ID &&
    env.BITBUCKET_COMMIT &&
    env.BITBUCKET_BRANCH &&
    env.PACKAGE_OWNERSHIP_ASAP_KEY &&
    env.PACKAGE_OWNERSHIP_URL
  );
}

const ReviewerAssigneeMethod = {
  RANDOM: 'random',
  ENTIRE_TEAM: 'entire-team',
};
const excludeFiles = ['tsconfig.entry-points.json'];
const repoConfigGlobs = [
  '*' /* all root level files */,
  'patches/*',
  '.storybook/*',
  '.changeset/!(*.md)',
];

const isRepoConfigChange = (fileName: string) =>
  !excludeFiles.includes(fileName) &&
  repoConfigGlobs.some(glob => minimatch(fileName, glob));

function checkForRepoConfigChange(changedFiles: string[]) {
  const repoConfigChanges = changedFiles
    // Turn into list for file path from root (e.g. ['build', 'ci-scripts', 'package.json])
    .map(file => path.relative(process.cwd(), file))
    // Filter for files at root (or in specific folders)
    .filter(isRepoConfigChange);
  if (repoConfigChanges.length) {
    console.log('Detected changes to repo config files:', repoConfigChanges);
    return true;
  }
  return false;
}

/**
 * By default a single random reviewer is assigned from each team.
 * You can opt into the entire team being assigned as reviewers
 * if you branch has a prefix of `team-review/` or `auto-skipped-tests/`.
 */
function getReviewerMethod() {
  const { BITBUCKET_BRANCH } = process.env;
  if (!BITBUCKET_BRANCH) {
    return ReviewerAssigneeMethod.RANDOM;
  }
  if (
    containsBranchPrefix(BITBUCKET_BRANCH, [
      'team-review/',
      'auto-skipped-tests/',
    ])
  ) {
    return ReviewerAssigneeMethod.ENTIRE_TEAM;
  }
  return ReviewerAssigneeMethod.RANDOM;
}

async function main(opts: Partial<Opts> = {}) {
  if (!validateEnvironmentVariables(process.env)) {
    throw new Error('Pipelines variables are not defined');
  }

  const {
    BITBUCKET_PR_DESTINATION_BRANCH,
    BITBUCKET_PR_ID,
    BITBUCKET_COMMIT,
    PACKAGE_OWNERSHIP_ASAP_KEY,
    PACKAGE_OWNERSHIP_URL,
  } = process.env;

  const changedFiles: string[] = await git.getChangedFilesSince(
    await git.getRef(BITBUCKET_PR_DESTINATION_BRANCH),
    true,
  );

  const changedPackages: { name: string; team?: string }[] = (
    await getChangedPackagesFromChangedFiles(changedFiles)
  ).map((pkg: AFPackage) => ({
    name: pkg.name,
    team: pkg.config.atlassian && pkg.config.atlassian.team,
  }));

  if (checkForRepoConfigChange(changedFiles)) {
    changedPackages.push({
      name: 'repo-config',
      team: 'AFP: Monorepo',
    });
  }

  console.log(`Uploading metadata for this pull request: ${BITBUCKET_PR_ID}`);

  console.log(
    `Attempting to add reviewers for these packages:\n${JSON.stringify(
      changedPackages,
      null,
      2,
    )}`,
  );

  const jwtConfig = Object.assign(
    {
      issuer: 'micros/package-ownership',
      audience: 'micros/package-ownership',
    },
    httpleaseAsap.parseDataUri(PACKAGE_OWNERSHIP_ASAP_KEY),
  );
  const authHeader = httpleaseAsap.createAuthHeaderGenerator(jwtConfig)();

  const response = await axios.post(
    `${PACKAGE_OWNERSHIP_URL}/upload-metadata?prId=${BITBUCKET_PR_ID}&commit=${BITBUCKET_COMMIT}`,
    {
      changedPackages,
      addReviewers: !!opts.reviewers,
      addComment: !!(opts.reviewers && opts.comment),
      reviewerMethod: getReviewerMethod(),
    },
    {
      headers: {
        authorization: authHeader,
      },
    },
  );
  console.log(response.data);
}

if (require.main === module) {
  const cli = meow(
    `
      Usage:
        $ yarn ts-node build/legacy/ci-scripts/package-ownership-upload.ts

      Options
        --reviewers, -r   Add reviewers to the pull request. A random team member (default) or the entire team (opt-in), for each team that owns a changed package
        --comment,   -c   Add a comment describing what reviewers were addded and why (won't do anything if -r flag is not true)
    `,
    {
      description: 'Executes first step of the package-ownership lambda',
      flags: {
        reviewers: {
          alias: 'r',
          type: 'boolean',
        },
        comment: {
          alias: 'c',
          type: 'boolean',
        },
      },
    },
  );

  main({ ...cli.flags }).catch(e => {
    if (e.response) {
      console.error(e.response);
    } else {
      console.error(e);
    }
    process.exit();
  });
}
