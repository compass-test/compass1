import { GasPurePayload } from '@atlaskit/analytics-gas-types';

import {
  BaseMetric,
  BaseMetricData,
  BaseMetricStartArguments,
  PageVisibleState,
} from './metric/base-metric';
import { BasePageLoadMetricData } from './metric/base-page-load-metric';

export type { Metric } from './metric/metric';
export type {
  BasePageSegmentLoadMetricData,
  BasePageSegmentLoadMetricMergeData,
  PageSegmentLoadMetric,
} from './metric/page-segment-load';
export type {
  MetaPageLoadStartParams,
  PageLoadMetaMetric,
} from './metric/page-load-meta-metric';
export type {
  BaseMetric,
  BaseMetricData,
  BaseMetricMergeData,
  BaseMetricStartArguments,
  BaseMetricStopArguments,
  MetricState,
  OnCancelCallback,
  OnStopCallback,
} from './metric/base-metric';

export { PageVisibleState } from './metric/base-metric';

export type { WebVitalsMetric } from './metric/web-vitals-metric';

export enum BMEventsType {
  PAGE_LOAD = 'PAGE_LOAD',
  PAGE_SEGMENT_LOAD = 'PAGE_SEGMENT_LOAD',
  INLINE_RESULT = 'INLINE_RESULT',
  CUSTOM = 'CUSTOM',
  WEB_VITALS = 'WEB_VITALS',
}

export enum StorableBMEventsType {
  PAGE_LOAD = 'page-load',
  PAGE_SEGMENT_LOAD = 'page-segment-load',
  INLINE_RESULT = 'inline-result',
  CUSTOM = 'custom',
  WEB_VITALS = 'web-vitals',
}

export enum BMPageLoadMetrics {
  fmp = 'fmp',
  tti = 'tti',
}

export enum BMPageSegmentLoadMetrics {
  fmp = 'fmp',
  tti = 'tti',
}

export enum BMInteractionMetrics {
  response = 'response',
  result = 'result',
}

export enum PageSegmentPageLoadMetricsOptions {
  OFF = 'OFF',
  IF_PRESENT = 'IF_PRESENT',
  WAIT_UNTIL_PRESENT = 'WAIT_UNTIL_PRESENT',
}

export interface GlobalConfig {
  plugins?: [];
}

export interface SLOMetric {
  metric: BMPageLoadMetrics | BMPageSegmentLoadMetrics | BMInteractionMetrics;
  threshold: number;
  goal?: number;
}

export type Timing =
  | {
      key: string;
      startMark: string;
      endMark: string;
      component?: string;
    }
  | {
      key: string;
      endMark: string;
      component?: string;
    }
  | {
      key: string;
      startMark: string;
      component?: string;
    };

export type BasePageLoadHistogramConfig = {
  [BMPageLoadMetrics.fmp]: string;
  [BMPageLoadMetrics.tti]: string;
};

export type PageLoadHistogramConfig = {
  initial: BasePageLoadHistogramConfig;
  transition: BasePageLoadHistogramConfig;
};

export type BasePageSegmentLoadHistogramConfig = {
  [BMPageSegmentLoadMetrics.fmp]: string;
  [BMPageSegmentLoadMetrics.tti]: string;
};

export type PageSegmentLoadHistogramConfig = {
  initial: BasePageSegmentLoadHistogramConfig;
  transition: BasePageSegmentLoadHistogramConfig;
};

export type InteractionHistogramConfig = {
  [BMInteractionMetrics.result]: string;
  [BMInteractionMetrics.response]: string;
};

export type CustomHistogramConfig = {
  duration: string;
};

export type HistogramConfigTypes =
  | PageLoadHistogramConfig
  | PageSegmentLoadHistogramConfig
  | InteractionHistogramConfig
  | CustomHistogramConfig;

export type CustomValue =
  | string
  | number
  | boolean
  | { [key: string]: CustomValue };
export type CustomValues = { [key: string]: CustomValue };
export interface CustomPluginArgs {
  start: number;
  stop: number;
  key: string;
}
export type CustomPlugin = (args: CustomPluginArgs) => CustomValues | null;

export enum PageVisibleFields {
  pageVisibleState = 'page-visible-state',
  pageVisibleValue = 'page-visible-value',
}

export enum PageVisibleValueOrigin {
  documentHidden = 'document-hidden',
  pageVisibleState = 'page-visible-state',
}

export interface sfxEvents {
  activeTab: PageVisibleFields;
}

export interface GlobalEventTypeConfig {
  featureFlags?: string[];
  custom?: CustomValues;
  plugins?: Array<CustomPlugin>;
  histogram?: HistogramConfigTypes;
  sfxEvents?: sfxEvents;
  pageVisibleValueOrigin?: PageVisibleValueOrigin;
}

export interface PageLoadGlobalEventTypeConfig extends GlobalEventTypeConfig {
  histogram?: PageLoadHistogramConfig;
}

export interface PageSegmentLoadGlobalEventTypeConfig
  extends GlobalEventTypeConfig {
  histogram?: PageSegmentLoadHistogramConfig;
}

export interface InteractionGlobalEventTypeConfig
  extends GlobalEventTypeConfig {
  histogram?: InteractionHistogramConfig;
}

export interface WebVitalsGlobalEventTypeConfig extends GlobalEventTypeConfig {
  enabled?: boolean;
  timeout?: number;
}

export interface GenericGlobalEventTypeConfig extends GlobalEventTypeConfig {
  histogram?: CustomHistogramConfig;
}

export interface PerformanceMetric {
  type: BMEventsType;
  start: () => void;
  stop: () => void;
  mark: (mark: string) => void;
  onStop: (fn: (config: any, data: any) => void) => void;
  getData(): any;
  getConfig(): any;
}

export type Slo = { threshold: number };
export type DetailedPageLoadSlo = { initial: Slo; transition: Slo };
export type DetailedPageSegmentLoadSlo = { initial: Slo; transition: Slo };
export type PageLoadSlo = Slo | DetailedPageLoadSlo;
export type PageSegmentLoadSlo = Slo | DetailedPageSegmentLoadSlo;
export type PageLoadMetricsSlo = {
  fmp?: PageLoadSlo;
  tti?: PageLoadSlo;
};

export type PageSegmentLoadMetricsSlo = {
  fmp?: PageSegmentLoadSlo;
  tti?: PageSegmentLoadSlo;
};

export type InteractionMetricsSlo = {
  response?: Slo;
  result?: Slo;
};

export const isDetailedPageLoadSlo = (
  data: DetailedPageLoadSlo | Slo,
): data is DetailedPageLoadSlo => {
  return Boolean((data as DetailedPageLoadSlo).initial);
};

export const isDetailedPageSegmentLoadSlo = (
  data: DetailedPageSegmentLoadSlo | Slo,
): data is DetailedPageSegmentLoadSlo => {
  return Boolean((data as DetailedPageSegmentLoadSlo).initial);
};

export const isPageLoadMetricsSlo = (
  data: InteractionMetricsSlo | PageLoadMetricsSlo,
): data is PageLoadMetricsSlo => {
  const obj = data as PageLoadMetricsSlo;
  return Boolean(obj.fmp !== undefined || obj.tti !== undefined);
};

export const isInteractionMetricsSlo = (
  data: InteractionMetricsSlo | PageLoadMetricsSlo,
): data is InteractionMetricsSlo => {
  const obj = data as InteractionMetricsSlo;
  return Boolean(obj.result !== undefined || obj.response !== undefined);
};

export interface PerformanceEventConfigParam {
  key: string;
  type: BMEventsType;
  featureFlags?: string[];
  custom?: CustomValues;
  timings?: Timing[];
  until?: BaseMetric | BaseMetric[];
  include?: BaseMetric[];
  virtual?: boolean;
  debug?: boolean;
}

export interface PerformanceEventConfig extends PerformanceEventConfigParam {
  slo?: InteractionMetricsSlo;
}

export type PerformanceEventConfigTypes =
  | PageLoadPerformanceEventConfig
  | PageSegmentLoadPerformanceEventConfig
  | InteractionPerformanceEventConfig
  | CustomPerformanceEventConfig;

export interface PageLoadPerformanceEventConfig
  extends PerformanceEventConfigParam {
  ssr?: {
    doneAsFmp?: boolean;
    includeFeatureFlags?: IncludeSSRFeatureFlagsConfig;
  };
  slo?: PageLoadMetricsSlo;
  histogram?: PageLoadHistogramConfig;
}

export interface PageSegmentLoadPerformanceEventConfig
  extends PerformanceEventConfigParam {
  ssr?: {
    doneAsFmp?: boolean;
  };
  slo?: PageSegmentLoadMetricsSlo;
  histogram?: PageSegmentLoadHistogramConfig;
  includePageLoadTimings?: PageSegmentPageLoadMetricsOptions;
}

export interface InteractionPerformanceEventConfig
  extends PerformanceEventConfigParam {
  slo?: InteractionMetricsSlo;
  histogram?: InteractionHistogramConfig;
}

export interface CustomPerformanceEventConfig
  extends PerformanceEventConfigParam {
  slo?: Slo;
  histogram?: CustomHistogramConfig;
}

export interface WebVitalsPerformanceEventConfig {
  key: string;
  route: string | null;
  startTime: number | null;
  stopTime: number | null;
  pageVisibleState: PageVisibleState;
}

export interface PageLoadStartParams extends BaseMetricStartArguments {
  isInitial: boolean;
}

export type FeatureFlagValue = string | number | boolean;

export type FeatureFlagsClient = {
  getValue(ff: string): FeatureFlagValue;
};

export type FeatureFlagsClientPromise = Promise<FeatureFlagsClient>;

export type ReportedTiming = { startTime: number; duration: number };

export type ReportedTimings = {
  [key: string]: ReportedTiming;
};

export type SSRReportedTimings = {
  total: ReportedTiming;
  [key: string]: ReportedTiming;
};

export interface AppConfig {
  version: { web: string; ssr?: string };
  framework?: { name: string; version: string };
}

export interface ResourceTimingsConfig {
  sanitiseEndpoints: (url: string) => string;
  mapResources: (url: string) => string;
  experimental__reportEvaluatedTimingHeaders?: boolean;
  hasTimingHeaders?: (url: string) => boolean;
  xhrFilter?: (url: string) => boolean;
}

export interface BundleEvalTimingsConfig {
  mapPerformanceMark: (mark: string) => { name: string; type: string } | null;
  additionalTimings?: (startTime: number) => ReportedTimings | null;
}

export interface SSRFeatureFlags {
  [key: string]: FeatureFlagValue;
}

export type GetDoneMark = () => number | null;

export enum IncludeSSRFeatureFlagsConfig {
  NEVER = 'never',
  WHEN_FMP = 'when-fmp',
  WHEN_AVAILABLE = 'when-available',
}

export type GetSSRFeatureFlags = () =>
  | (SSRFeatureFlags | null)
  | Promise<SSRFeatureFlags | null>;

export interface SSRConfig {
  getTimings?: () => SSRReportedTimings | null;
  getFeatureFlags?: GetSSRFeatureFlags;
  getDoneMark?: GetDoneMark;
  includeFeatureFlags?: IncludeSSRFeatureFlagsConfig;
}

export interface ShareableGlobalConfig {
  app: AppConfig;
  product: string;
  region: string;
  hostname?: string;
  resourceTimings: ResourceTimingsConfig;
  bundleEvalTimings?: BundleEvalTimingsConfig;
  ffClient: FeatureFlagsClient;
  ssr?: SSRConfig;
  webVitals?: {
    enabled?: boolean;
    timeout?: number;
  };
  featureFlags: { [key: string]: string | number | boolean };
  pageVisibleValueOrigin: PageVisibleValueOrigin;
  custom?: CustomValues;
  plugins?: Array<CustomPlugin>;
  histogram?: HistogramConfigTypes;
}

export interface BaseMetricDataWithStartAndStop extends BaseMetricData {
  start: number;
  stop: number;
}

export interface PageSegmentLoadMetricDataWithStartAndStop
  extends BaseMetricDataWithStartAndStop {
  isInitial: boolean;
}

export interface BasePageLoadMetricDataWithStartAndStop
  extends BasePageLoadMetricData {
  start: number;
  stop: number;
}

export type GasV3Payload = {
  actionSubject: 'performance';
  attributes: unknown;
  source: 'performance';
  action: 'measured';
};

export interface BrowserMetricsConfig {
  info: {
    app: AppConfig;
    hostname?: string;
    product: string;
    region: string;
  };
  plugins: {
    resourceTimings: ResourceTimingsConfig;
    bundleEvalTimings?: BundleEvalTimingsConfig;
    featureFlags: {
      client: FeatureFlagsClientPromise;
    };
  };
  events: {
    all?: GlobalEventTypeConfig;
    [BMEventsType.PAGE_LOAD]?: PageLoadGlobalEventTypeConfig;
    [BMEventsType.PAGE_SEGMENT_LOAD]?: PageSegmentLoadGlobalEventTypeConfig;
    [BMEventsType.INLINE_RESULT]?: InteractionGlobalEventTypeConfig;
    [BMEventsType.CUSTOM]?: GenericGlobalEventTypeConfig;
    [BMEventsType.WEB_VITALS]?: WebVitalsGlobalEventTypeConfig;
  };
  endpoints: {
    eventPipelineClient: Promise<{
      sendOperationalEvent: (payload: GasPurePayload) => void;
    }>;
    metalClient?: Promise<{ metric: { submit: (payload: unknown) => void } }>;
  };
  ssr?: SSRConfig;

  debug?: boolean;
}
