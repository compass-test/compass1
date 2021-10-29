import chalk from 'chalk';

import { logger } from '../../index';
import { StepCreatePullRequest } from './types';
import {
  BITBUCKET_REPO_SLUG_FORK,
  BITBUCKET_REPO_SLUG,
} from '../../clients/bitbucket/constants';

export const createPullRequest: StepCreatePullRequest = async (
  { client, currRelease },
  { dev },
) => {
  logger.start(`🔥 Creating pull request against \`master\``);
  const repoSlug = dev ? BITBUCKET_REPO_SLUG_FORK : BITBUCKET_REPO_SLUG;
  const pullRequest = await client.createPullRequest(currRelease, repoSlug);
  const pullRequestLink = chalk.underline(pullRequest.links.html.href);
  logger.finish(`✅ Pull request created at ${pullRequestLink}!`);
  return pullRequest;
};
