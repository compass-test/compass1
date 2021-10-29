import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { CompletionStatus } from '@atlassiansox/cross-flow-api-internals';
import { AnalyticsWebClientInterface } from './analytics-helpers/types';
import { PluginCollection } from '@atlassiansox/cross-flow-base-types';

export type MaybePromise<T> = T | Promise<T>;

export type OriginType =
  | 'confluence'
  | 'bitbucket'
  | 'start'
  | 'jira'
  | 'trello'
  | 'trusted-admin'
  | 'admin';

interface IframeEvent {
  context: UIAnalyticsEvent['context'];
  payload: UIAnalyticsEvent['payload'];
}

export type OnUIAnalyticsEvent = (event: IframeEvent) => void;

export type TenantDefinition = { cloudId?: string };

export type Environment = 'staging' | 'production';

export enum UtmCampaign {
  'atlassian-switcher' = 'atlassian_switcher',
}

export type UtmCampaignType = keyof typeof UtmCampaign;

export interface RedirectToWacDefinition {
  redirectToWac?: boolean;
  env?: Environment;
}

export type CrossFlowProviderProps = RedirectToWacDefinition &
  TenantDefinition & {
    analyticsClient: MaybePromise<AnalyticsWebClientInterface>;
    locale: string;
    originProduct: OriginType;
    plugins?: PluginCollection;
    edgePrefix?: string;
    onError?: (error: Error) => void;
  };

export type ConsumerProps = {
  onComplete?: (status: CompletionStatus) => void;
  onError?: (error: any) => void;
};

export type { AnalyticsWebClientInterface };
