import { sendOperationalAnalyticsEvent } from './analytics/analytics-web-client';

export type ProjectSpaceLinkData = Partial<{
  spaceKey: string;
  projectKey: string;
}>;

export const fetchFailed = (source: string, err: Error) => {
  sendOperationalAnalyticsEvent({
    source,
    action: 'failed',
    actionSubject: 'fetch',
    attributes: { errorMessage: err.message || 'Unknown error' },
  });
};

export const fetchSuccess = (
  source: string,
  data: ProjectSpaceLinkData = {},
) => {
  const { spaceKey, projectKey } = data;
  sendOperationalAnalyticsEvent({
    source,
    action: 'success',
    actionSubject: 'fetch',
    attributes: { spaceKey, projectKey },
  });
};
