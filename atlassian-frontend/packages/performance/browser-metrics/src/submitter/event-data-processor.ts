import { logger } from '../logger';
import { BaseMetricData } from '../metric/base-metric';
import { BasePageLoadMetricData } from '../metric/base-page-load-metric';
import {
  isPageLoadMetricData,
  isPageSegmentLoadMetricData,
} from '../metric/types';
import { appFramework } from '../plugins/app/framework';
import { appVersion } from '../plugins/app/version';
import { bmVersion } from '../plugins/bm/version';
import { customData } from '../plugins/custom';
import { eventId } from '../plugins/event/id';
import { eventInitial } from '../plugins/event/initial';
import { eventKey } from '../plugins/event/key';
import { eventLocalTime } from '../plugins/event/local-time';
import { eventProduct } from '../plugins/event/product';
import { eventRegion } from '../plugins/event/region';
import { eventRoute } from '../plugins/event/route';
import { eventType } from '../plugins/event/type';
import { featureFlags } from '../plugins/feature-flags';
import { hostname } from '../plugins/hostname';
import { customEventMetrics } from '../plugins/metrics/custom-event-metrics';
import { initialPageLoadMetrics } from '../plugins/metrics/initial-page-load-metrics';
import { interactionMetrics } from '../plugins/metrics/interaction-metrics';
import { navigationMetrics } from '../plugins/metrics/navigation-metrics';
import { pageLoadMetrics } from '../plugins/metrics/page-load-metrics';
import { pageSegmentLoadMetrics } from '../plugins/metrics/page-segment-load-metrics';
import { webVitalsMetrics } from '../plugins/metrics/web-vitals-metrics';
import { pageVisibleState } from '../plugins/page-visible/state';
import { pageVisibleValue } from '../plugins/page-visible/value';
import { productCustomData } from '../plugins/product/custom';
import { ssrFeatureFlags } from '../plugins/ssr/feature-flags';
import { ssrSuccess } from '../plugins/ssr/success';
import { telemetryBrowser } from '../plugins/telemetry/browser';
import { telemetryCpu } from '../plugins/telemetry/cpus';
import { telemetryMemory } from '../plugins/telemetry/memory';
import { telemetryNetwork } from '../plugins/telemetry/network';
import { appTimings } from '../plugins/timings/app';
import { bundleEvalTimings } from '../plugins/timings/bundle-eval';
import { resourceTimings } from '../plugins/timings/resource';
import { Plugin } from '../plugins/types';
import {
  BasePageLoadMetricDataWithStartAndStop,
  BMEventsType,
  ShareableGlobalConfig,
} from '../types';

const defaultSet = [
  eventKey,
  eventType,
  eventProduct,
  eventRoute,
  eventId,
  eventLocalTime,
  eventRegion,
  appFramework,
  appVersion,
  bmVersion,
  telemetryBrowser,
  telemetryCpu,
  telemetryMemory,
  telemetryNetwork,
  customData,
  featureFlags,
  hostname,
  productCustomData,
  appTimings,
  resourceTimings,
];

const pageLoadCommon = [
  ...defaultSet,
  pageVisibleState,
  pageVisibleValue,
  eventInitial,
  pageLoadMetrics,
  bundleEvalTimings,
];

const initialPageLoadSet = [
  ...pageLoadCommon,
  initialPageLoadMetrics,
  navigationMetrics,
  ssrSuccess,
  ssrFeatureFlags,
];

const spaTransitionSet = [...pageLoadCommon];

const pageSegmentLoadSet = [
  ...defaultSet,
  pageSegmentLoadMetrics,
  pageVisibleState,
  pageVisibleValue,
  eventInitial,
  bundleEvalTimings,
];
const interactionSet = [
  ...defaultSet,
  pageVisibleState,
  pageVisibleValue,
  interactionMetrics,
];
const customMetricSet = [
  ...defaultSet,
  pageVisibleState,
  pageVisibleValue,
  customEventMetrics,
];
// pageVisibleState and pageVisibleValue has been handled within webVitalsMetrics.
const webVitalsMetricSet = [...defaultSet, webVitalsMetrics];

export const eventDataProcessor = async (
  globalConfig: ShareableGlobalConfig,
  data: BaseMetricData | BasePageLoadMetricData,
) => {
  if (data.start === null || data.stop === null) {
    logger.log(
      `eventDataProcessor: Metric "${data.key}" start or stop are incorrect; start: ${data.start}; stop: ${data.stop}`,
    );
    return null;
  }

  let set: Plugin[] = [];
  if (
    data.config.type === BMEventsType.PAGE_LOAD &&
    isPageLoadMetricData(data) &&
    data.isInitial
  ) {
    set = initialPageLoadSet;
  }

  if (
    data.config.type === BMEventsType.PAGE_LOAD &&
    isPageLoadMetricData(data) &&
    !data.isInitial
  ) {
    set = spaTransitionSet;
  }

  if (
    data.config.type === BMEventsType.PAGE_SEGMENT_LOAD &&
    isPageSegmentLoadMetricData(data)
  ) {
    set = pageSegmentLoadSet;
  }

  if (data.config.type === BMEventsType.INLINE_RESULT) {
    set = interactionSet;
  }

  if (data.config.type === BMEventsType.CUSTOM) {
    set = customMetricSet;
  }

  if (data.config.type === BMEventsType.WEB_VITALS) {
    set = webVitalsMetricSet;
  }

  //TODO if type is different - do not send at all

  const plugins = [];

  for (const plugin of set) {
    const result = await plugin(
      data.config,
      data as BasePageLoadMetricDataWithStartAndStop, // some plugins support page load specific data with special check
      globalConfig,
    );
    plugins.push(result);
  }

  const pluginResults = await Promise.all(plugins);

  const generated: { [key: string]: boolean | string | number | Object } = {};
  pluginResults.forEach((pluginResult) => {
    if (pluginResult === null) {
      return;
    }

    Object.keys(pluginResult).forEach((key) => {
      const keyResult = pluginResult[key];
      if (keyResult !== null && keyResult !== undefined) {
        generated[key] = keyResult;
      }
    });
  });

  return generated;
};
