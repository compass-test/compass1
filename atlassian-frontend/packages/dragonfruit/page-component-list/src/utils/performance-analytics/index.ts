import { metrics } from '@atlassian/browser-metrics';

export const ServicesPageLoad = metrics.pageLoad({
  key: 'services',
});

export const LibrariesPageLoad = metrics.pageLoad({
  key: 'libraries',
});

export const ApplicationsPageLoad = metrics.pageLoad({
  key: 'applications',
});

export const OtherComponentsPageLoad = metrics.pageLoad({
  key: 'other-components',
});
