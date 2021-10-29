/* eslint-disable no-console */
/**
 * This script handles the post deployment steps of the storybook product-search-dialog
 * It assumes that the storybook has been built & deployed to static service already.
 */

import getStorybookUrls from './utils/get-storybook-url';
import { getPrId } from './utils/get-pr-id';
import { PullRequestClient } from '@atlaskit/build-utils/bitbucket';

const addStorybookComment = async () => {
  const {
    BITBUCKET_BRANCH,
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
  } = process.env;

  const isMaster = BITBUCKET_BRANCH === 'master';
  const { STORYBOOK_URL, MASTER_STORYBOOK_URL } = await getStorybookUrls();

  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(`The storybook can be accessed here: ${STORYBOOK_URL}`);

  if (isMaster) {
    console.log(
      `The storybook can also be accessed here: ${MASTER_STORYBOOK_URL}`,
    );
  }

  if (BITBUCKET_REPO_FULL_NAME && BITBUCKET_USER && BITBUCKET_PASSWORD) {
    const prId = await getPrId();

    if (prId) {
      console.log(
        `Upserting comment to PR: https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/${prId}`,
      );

      const prClient = new PullRequestClient({
        repoFullName: BITBUCKET_REPO_FULL_NAME,
        auth: {
          username: BITBUCKET_USER,
          password: BITBUCKET_PASSWORD,
        },
      });

      const prefix = `Storybook has been built and deployed:`;

      await prClient.upsertComment(prId, prefix, `${STORYBOOK_URL}`);
    }
  }

  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  process.exit(0);
};

addStorybookComment().catch((e) => {
  console.error(e);
  process.exit(1);
});
