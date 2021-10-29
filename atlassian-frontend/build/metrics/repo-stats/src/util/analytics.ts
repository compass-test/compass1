import { analyticsClient } from '@atlassiansox/analytics-node-client';
import { RepoStatsEvent, Config } from '../types';

export const sendAnalytics = async (
  analyticsEvents: RepoStatsEvent[],
  config: Config,
) => {
  const analyticsEnv = config.prod ? 'prod' : 'dev';
  const client = analyticsClient({
    env: analyticsEnv,
    product: config.product,
  });

  return await Promise.all(
    analyticsEvents.map(event => {
      // @ts-ignore
      return client.sendTrackEvent({
        anonymousId: 'unknown',
        trackEvent: {
          tags: ['atlaskit'],
          source: '@repo/repo-stats',
          action: 'updated',
          actionSubject: 'repository',
          attributes: event,
          origin: 'console',
          platform: 'bot',
        },
      });
    }),
  );
};
