import { PluginCollection } from '@atlassiansox/cross-flow-base-types';
import { CrossFlowExtensions } from '@atlassiansox/cross-flow-base-types';
import {
  ExperimentalOptions,
  JourneyTargetProductDefinition,
  CompletionStatus,
} from '@atlassiansox/cross-flow-api-internals';
import {
  OriginType,
  OnUIAnalyticsEvent,
  TenantDefinition,
  RedirectToWacDefinition,
} from '../types';

export type IntegrationViewProps = RedirectToWacDefinition &
  JourneyTargetProductDefinition &
  TenantDefinition & {
    locale: string;
    sourceComponent: string;
    sourceContext: string;
    originProduct: OriginType;

    experimentalOptions?: ExperimentalOptions;
    extensions?: CrossFlowExtensions;
    onAnalyticsEvent: OnUIAnalyticsEvent;
    onClose: (completionStatus: CompletionStatus) => void;
    onHandShake: (appName: string) => void;
    plugins: PluginCollection;
    edgePrefix?: string;
  };
