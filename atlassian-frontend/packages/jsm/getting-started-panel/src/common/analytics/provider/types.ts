import { AnalyticsEventPayload } from '@atlaskit/analytics-next';
import { EventType } from '@atlassian/analytics-bridge';
import { Environment } from '../../types';

export type ProductInfo = {
  env: Environment;
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
