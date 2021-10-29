import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import AbstractSlackService from './AbstractSlackService';
import {
  getConfluenceSlackServiceAnalytics,
  getSlackServiceAnalytics,
} from './analytics';
import getConfluenceSlackConsentUrl from './getConfluenceSlackConsentUrl';
import { ConfluenceSlackServiceAnalytics } from './types';

export default class ConfluenceSlackService extends AbstractSlackService {
  private confluenceAnalytics: ConfluenceSlackServiceAnalytics;

  constructor(cloudId: string, createUIAnalyticsEvent: CreateUIAnalyticsEvent) {
    const analytics = getSlackServiceAnalytics(createUIAnalyticsEvent);
    super(cloudId, 'confluence', analytics);
    this.confluenceAnalytics = getConfluenceSlackServiceAnalytics(
      createUIAnalyticsEvent,
    );
  }

  async primeConsentUrl() {
    if (this.consentUrl) {
      return;
    }
    const location =
      typeof window === 'undefined' ? undefined : window.location;
    if (location) {
      const urlResult = await getConfluenceSlackConsentUrl(
        location,
        this.confluenceAnalytics,
        this.abortController.signal,
      );

      if (urlResult.ok) {
        this.consentUrl = urlResult.result;
      } else {
        throw new Error('Failed priming consent URL');
      }
    }
  }
}
