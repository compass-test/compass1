import labelReleaseTickets from '../../../labelJiraIssuesWithRelease';
import { Auth } from '../../../getPrsInRelease';
import { logger } from '../../index';
import { StepLabelTickets } from './types';

export const labelTicketsInRelease: StepLabelTickets = async (
  { currRelease, pullRequests, auth },
  { project, dev },
) => {
  logger.start('🏷  Labelling all tickets in release');
  await labelReleaseTickets(currRelease, pullRequests, auth as Auth, {
    projectKey: dev ? project || 'EDM' : project,
  });
  const projectMessage = project ? `in ${project} project` : '';
  logger.finish(`✅ All tickets ${projectMessage} labelled!`);
};
