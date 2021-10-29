import chalk from 'chalk';

import { logger } from '../../index';
import { JIRA_INSTANCE_URL } from '../../clients/jira/constants';
import { StepTransitionRelease } from './types';

export const transitionReleaseTicket: StepTransitionRelease = async ({
  currRelease,
  status,
  client,
}) => {
  logger.start('🚢 Transitioning release ticket');
  const issue = await client.transitionRelease(currRelease, status);
  const issueLink = chalk.underline(`${JIRA_INSTANCE_URL}/browse/${issue.key}`);
  logger.finish(`✅ Ticket transitioned to stabilizing! Check ${issueLink}`);
  return issue;
};
