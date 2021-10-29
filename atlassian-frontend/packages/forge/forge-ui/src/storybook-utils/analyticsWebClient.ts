import { decorate } from '@storybook/addon-actions';
import { AnalyticsWebClient } from '@atlaskit/analytics-listeners';

// Logging first arg only
// eslint-disable-next-line no-console
const withConsoleLog = decorate([(args) => (console.log(args[0]), args)]);

const analyticsWebClient = {
  sendUIEvent: withConsoleLog.action('ui'),
  sendOperationalEvent: withConsoleLog.action('operational'),
  sendTrackEvent: withConsoleLog.action('track'),
  sendScreenEvent: withConsoleLog.action('screen'),
};

export const getAnalyticsWebClient = async (): Promise<AnalyticsWebClient> => {
  // We set a small delay here because storybook/addon-actions doesn't catch actions
  // which have been emitted on mount (e.g. the forgeUIExtension viewed event).
  await new Promise((res) => setTimeout(res));
  return analyticsWebClient;
};
