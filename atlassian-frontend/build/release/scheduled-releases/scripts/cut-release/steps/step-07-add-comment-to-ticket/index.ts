import { logger } from '../../index';
import { StepAddCommentToTicket } from './types';

export const addCommentToTicket: StepAddCommentToTicket = async (
  { currRelease, channelUrl, client },
  { dev },
) => {
  logger.start(`📝 Adding comment to Jira ticket`);
  if (!dev) {
    await client.addCommentToReleaseIssue(currRelease, channelUrl);
  } else {
    logger.success('Not adding comment in --dev mode! Too noisy otherwise 😭');
  }
  logger.finish(
    `✅ Comment added! A message will be sent automagically to #twp-release-announcements.`,
  );
};
