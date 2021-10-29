import spawn from 'projector-spawn';
import axios from 'axios';
import { tag } from '@atlaskit/build-utils/git';
import { PullRequest } from '@atlaskit/build-utils/bitbucket/types';
// @atlaskit/scheduled-releases package exists but it is not published to npm.
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import { ReleaseBranchPrefix } from '../../release/scheduled-releases/constants';

const { BITBUCKET_USER, BITBUCKET_PASSWORD } = process.env;

async function main() {
  // Error if creds for BB aren't present
  if (!BITBUCKET_USER || !BITBUCKET_PASSWORD) {
    throw new Error(
      'Bitbucket credentials BITBUCKET_USER and/or BITBUCKET_PASSWORD missing.',
    );
  }

  // Check if latest commit is merge commit
  const lastCommitMsg: string = (
    await spawn('git', ['log', '-1', '--pretty=%B'])
  ).stdout.trim();

  const releaseCommitPattern: RegExp = /pull request #(\d+) merged by Landkid after a successful build rebased on master$/;

  const releaseCommitMessage: RegExpMatchArray | null = lastCommitMsg.match(
    releaseCommitPattern,
  );
  if (!releaseCommitMessage) {
    console.log(
      `Not a release branch: Last commit does not contain Landkid-style merge message`,
    );
    return;
  }

  // Get branch from the PR of that merge commit
  const prNumber: string = releaseCommitMessage[1];
  const url: string = `https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/pullrequests/${prNumber}`;

  let response;
  try {
    response = await axios.get<PullRequest>(url, {
      auth: {
        username: BITBUCKET_USER,
        password: BITBUCKET_PASSWORD,
      },
    });
  } catch (error) {
    const errorDetails = {
      name: 'BadRequestError',
      message: `Could not look up PR in Bitbucket. Returned status ${error.response.status}. `,
      status: error.response.status,
      bbResponse: error,
    };
    throw errorDetails;
  }

  const branch = response.data.source.branch.name;

  // Is branch RC? If so, grab release name. Otherwise, exit early
  if (branch.startsWith(ReleaseBranchPrefix)) {
    // Tag the commit with the release name
    const releaseName: string = branch.replace(ReleaseBranchPrefix, '');
    await tag(`release/${releaseName}`);
    console.log(`Successfully tagged commit with 'release/${releaseName}'`);
  } else {
    console.log(
      `Not a release branch: Merged branch does not start with '${ReleaseBranchPrefix}'`,
    );
  }
} // end main()

if (require.main === module) {
  main().catch(e => {
    console.log(e.message);
    process.exit(1);
  });
}
