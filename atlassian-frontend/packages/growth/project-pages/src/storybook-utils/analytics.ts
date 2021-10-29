/* eslint-disable no-console */
import { AnalyticsWebClient } from '@atlassiansox/confluence-table-tree';

export const consoleAnalyticsClient: AnalyticsWebClient = {
  sendUIEvent: (...args) => console.log('sendUIEvent ', ...args),
  sendTrackEvent: (...args) => console.log('sendTrackEvent ', ...args),
  sendOperationalEvent: (...args) =>
    console.log('sendOperationalEvent ', ...args),
  sendScreenEvent: (...args) => console.log('sendScreenEvent ', ...args),
};
