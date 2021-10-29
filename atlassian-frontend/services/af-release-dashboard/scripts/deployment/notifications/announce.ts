import { ENVIRONMENT, getEnvironment } from '../../../src/server/constants';
import SlackClient from './slack/client';
import AnalyticsClient, { getAnalyticsPayload } from './analytics';

export type Status = 'BROKEN' | 'OPERATIONAL';

export function getStatus(isStale: boolean): Status {
  return isStale ? 'BROKEN' : 'OPERATIONAL';
}

export async function announceChange(status: Status, dryRun = false) {
  const env = getEnvironment();
  const isProduction = env === ENVIRONMENT.PROD;
  const analyticsClient = new AnalyticsClient({
    dev: !isProduction,
    dry: dryRun,
  });
  await analyticsClient.sendEvent(getAnalyticsPayload(status));

  if (isProduction) {
    console.log('Announce change on Slack...');
    const slackClient = new SlackClient(dryRun);
    await slackClient.sendDeploymentNotification(status, false);
  } else {
    console.log(
      `Skipping announcement on Slack for non-production environment: ${env}.`,
    );
  }
}
