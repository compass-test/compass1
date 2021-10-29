import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import ConfluenceSlackService from './ConfluenceSlackService';
import JiraSlackService from './JiraSlackService';
import { SlackService } from './SlackService';
import { AtlassianSlackProduct } from './types';

export function slackServiceFactory(
  cloudId: string,
  product: AtlassianSlackProduct,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
): SlackService {
  switch (product) {
    case 'jira':
      return new JiraSlackService(cloudId, createAnalyticsEvent);
    case 'confluence':
      return new ConfluenceSlackService(cloudId, createAnalyticsEvent);
  }
}
