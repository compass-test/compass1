import { AnalyticsEventPayload } from '@atlaskit/analytics-next';
import { EventType } from '@atlassian/analytics-bridge';

export type ProductInfo = {
  env: string;
  product: string;
  subproduct?: string; // should only be used by Jira
  version?: string;
  origin?: string; // defaults to WEB if not specified
  platform?: string; // defaults to WEB if not specified
  embeddedProduct?: string;
  locale?: string;
};

export type Settings = {
  historyReplaceFn?: (url: string) => string;
  useStargate?: boolean;
  maxRetryAttempts?: number;
  minRetryDelay?: number;
  apiKey?: string;
  apiHost?: string;
  sessionExpiryTime?: number;
};

export type CustomAnalyticsEvent = {
  type: EventType | void;
  payload: AnalyticsEventPayload;
};
