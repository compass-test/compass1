import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import AbstractSlackService from './AbstractSlackService';
import { getSlackServiceAnalytics } from './analytics';
import getJiraSlackConsentUrl from './getJiraSlackConsentUrl';

export default class JiraSlackService extends AbstractSlackService {
  constructor(cloudId: string, createUIAnalyticsEvent: CreateUIAnalyticsEvent) {
    const analytics = getSlackServiceAnalytics(createUIAnalyticsEvent);
    super(cloudId, 'jira', analytics);
  }

  async primeConsentUrl() {
    if (!this.consentUrl) {
      this.consentUrl = getJiraSlackConsentUrl(location);
    }
  }
}
