import {
  AnalyticsEventName,
  AnalyticsTrackData,
  AnalyticsUtils,
} from '@atlassian/proforma-common-core/jira-common-utils';

export class MockAnalyticsUtils implements AnalyticsUtils {
  track(event: AnalyticsEventName, data: AnalyticsTrackData): void {
    // eslint-disable-next-line no-console
    console.log(`Tracking event ${event}:`, data);
  }
}
