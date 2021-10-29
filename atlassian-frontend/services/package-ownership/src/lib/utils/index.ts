import { Logger } from '../Logger';
import { config } from '../../config';
import { PullRequest, ReviewerInfo } from '../../types';

export const PREFIX_IGNORED =
  'This PR has been ignored due to its source branch prefix';
export const TAG_IGNORED = 'This PR has been ignored due to a tag in its title';

/**
 * If the PR is to be ignored, returns the string to be used as a response message.
 * Otherwise, returns undefined.
 */
export const ignorePr = ({
  prId,
  commit,
  title,
  sourceBranch,
}: PullRequest): string | undefined => {
  if (
    config.ignoreBranchPrefixes &&
    config.ignoreBranchPrefixes.some(prefix =>
      prefix instanceof RegExp
        ? sourceBranch.match(prefix)
        : sourceBranch.startsWith(prefix),
    )
  ) {
    Logger.info('Ignoring PR due to source branch prefix', {
      prId,
      commit,
      sourceBranch,
    });
    return PREFIX_IGNORED;
  }

  if (
    config.ignorePrTags &&
    config.ignorePrTags.some(tag =>
      tag instanceof RegExp ? title.match(tag) : title.includes(tag),
    )
  ) {
    Logger.info('Ignoring PR due to tag in title', {
      prId,
      commit,
      title,
    });
    return TAG_IGNORED;
  }

  return undefined;
};

export const COMMENT_HEADER =
  'These reviewers have been assigned to review the packages owned by their teams:\n\n';

export const formatComment = (newReviewerInfo: ReviewerInfo) => {
  const footer = config.commentFooter ? `\n\n***\n${config.commentFooter}` : '';

  const packages = Object.entries(newReviewerInfo)
    .map(([team, { packages, reviewers }]) => {
      const packageList = packages.map(pkg => `\`${pkg}\``).join(', ');
      const reviewerSelected = `${reviewers
        .map(rev => `@{${rev.aaid}}`)
        .join(', ')} from **${team}**`;
      return `* ${packageList}: ${reviewerSelected}`;
    })
    .join('\n');

  return COMMENT_HEADER + packages + footer;
};
