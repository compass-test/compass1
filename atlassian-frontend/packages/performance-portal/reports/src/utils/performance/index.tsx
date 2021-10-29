import { metrics } from '@atlassian/browser-metrics';

export const reportPageLoad = metrics.pageLoad({
  key: 'report',
});
