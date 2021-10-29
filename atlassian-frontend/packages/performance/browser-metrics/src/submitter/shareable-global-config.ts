import {
  AppConfig,
  BMEventsType,
  BrowserMetricsConfig,
  BundleEvalTimingsConfig,
  FeatureFlagsClient,
  FeatureFlagValue,
  GlobalEventTypeConfig,
  PageVisibleValueOrigin,
  ResourceTimingsConfig,
  ShareableGlobalConfig,
  SSRConfig,
} from '../types';

export type ShareableGlobalConfigPerEventType = {
  [BMEventsType.PAGE_LOAD]: ShareableGlobalConfig;
  [BMEventsType.PAGE_SEGMENT_LOAD]: ShareableGlobalConfig;
  [BMEventsType.CUSTOM]: ShareableGlobalConfig;
  [BMEventsType.INLINE_RESULT]: ShareableGlobalConfig;
  [BMEventsType.WEB_VITALS]: ShareableGlobalConfig;
};

type GlobalPart = {
  app: AppConfig;
  product: string;
  region: string;
  resourceTimings: ResourceTimingsConfig;
  bundleEvalTimings?: BundleEvalTimingsConfig;
  ffClient: FeatureFlagsClient;
  hostname: string;
  ssr?: SSRConfig;
  webVitals?: {
    enabled?: boolean;
    timeout?: number;
  };
};

const makeFeatureFlags = (
  allFeatureFlags: string[] | undefined,
  eventTypeFeatureFlags: string[] | undefined,
): string[] => {
  const featureFlagsForType = [];
  if (allFeatureFlags) {
    featureFlagsForType.push(...allFeatureFlags);
  }

  if (eventTypeFeatureFlags) {
    featureFlagsForType.push(...eventTypeFeatureFlags);
  }

  return featureFlagsForType;
};

const makeGlobalConfigPerType = (
  global: GlobalPart,
  ffClient: FeatureFlagsClient,
  allEventsConfig?: GlobalEventTypeConfig,
  eventConfig?: GlobalEventTypeConfig,
): ShareableGlobalConfig => {
  const allEventsConfigCustom = allEventsConfig && allEventsConfig.custom;
  const eventConfigCustom = eventConfig && eventConfig.custom;
  const custom =
    ((allEventsConfigCustom || eventConfigCustom) && {
      ...allEventsConfigCustom,
      ...eventConfigCustom,
    }) ||
    undefined;

  const allEventsConfigPlugins = allEventsConfig && allEventsConfig.plugins;
  const eventConfigPlugins = eventConfig && eventConfig.plugins;
  const plugins =
    ((allEventsConfigPlugins || eventConfigPlugins) && [
      ...(allEventsConfigPlugins || []),
      ...(eventConfigPlugins || []),
    ]) ||
    undefined;

  const pageVisibleValueOrigin =
    eventConfig?.pageVisibleValueOrigin ??
    allEventsConfig?.pageVisibleValueOrigin ??
    PageVisibleValueOrigin.documentHidden;

  return Object.freeze({
    ...global,
    featureFlags: Object.freeze(
      makeFeatureFlags(
        allEventsConfig && allEventsConfig.featureFlags,
        eventConfig && eventConfig.featureFlags,
      ).reduce((acc: { [key: string]: FeatureFlagValue }, value: string) => {
        acc[value] = ffClient.getValue(value);
        return acc;
      }, {}),
    ),
    custom,
    plugins,
    histogram: eventConfig?.histogram,
    pageVisibleValueOrigin,
  });
};

export const makeShareableGlobalConfig = async (
  globalConfig: BrowserMetricsConfig,
): Promise<ShareableGlobalConfigPerEventType> => {
  const ffClient = await globalConfig.plugins.featureFlags.client;

  const global: GlobalPart = {
    app: globalConfig.info.app,
    product: globalConfig.info.product,
    region: globalConfig.info.region,
    resourceTimings: globalConfig.plugins.resourceTimings,
    bundleEvalTimings: globalConfig.plugins.bundleEvalTimings,
    ffClient,
    hostname: globalConfig.info.hostname || window.location.hostname,
    ssr: globalConfig.ssr,
    webVitals: {
      enabled: globalConfig.events[BMEventsType.WEB_VITALS]?.enabled,
      timeout: globalConfig.events[BMEventsType.WEB_VITALS]?.timeout,
    },
  };

  return {
    [BMEventsType.PAGE_LOAD]: makeGlobalConfigPerType(
      global,
      ffClient,
      globalConfig.events.all,
      globalConfig.events[BMEventsType.PAGE_LOAD],
    ),
    [BMEventsType.PAGE_SEGMENT_LOAD]: makeGlobalConfigPerType(
      global,
      ffClient,
      globalConfig.events.all,
      globalConfig.events[BMEventsType.PAGE_SEGMENT_LOAD],
    ),
    [BMEventsType.INLINE_RESULT]: makeGlobalConfigPerType(
      global,
      ffClient,
      globalConfig.events.all,
      globalConfig.events[BMEventsType.INLINE_RESULT],
    ),
    [BMEventsType.CUSTOM]: makeGlobalConfigPerType(
      global,
      ffClient,
      globalConfig.events.all,
      globalConfig.events[BMEventsType.CUSTOM],
    ),
    [BMEventsType.WEB_VITALS]: makeGlobalConfigPerType(
      global,
      ffClient,
      globalConfig.events.all,
      globalConfig.events[BMEventsType.WEB_VITALS],
    ),
  };
};
