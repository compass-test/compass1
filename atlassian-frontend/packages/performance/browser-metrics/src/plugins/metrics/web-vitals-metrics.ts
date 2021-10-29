import { PageVisibleState } from '../../metric/base-metric';
import { visibilityChangeObserver } from '../../observer/visibility-change-observer';
import { webVitalsObserver } from '../../observer/web-vitals-observer';
import {
  BaseMetricDataWithStartAndStop,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';
import { pageVisibleValue } from '../page-visible/value';

export const webVitalsMetrics = async (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  let pageVisibleState = data.pageVisibleState;
  const setPageVisibleStateToMixed = () => {
    pageVisibleState = PageVisibleState.MIXED;
  };
  visibilityChangeObserver.subscribe(setPageVisibleStateToMixed);
  const webVitalMetrics = await webVitalsMetricCustomTimeout(
    globalConfig.webVitals?.timeout || 30000,
  );
  visibilityChangeObserver.unsubscribe(setPageVisibleStateToMixed);
  return {
    ...webVitalMetrics,
    'pageVisible:state': pageVisibleState,
    ...pageVisibleValue(config, data, globalConfig),
  };
};

// exported to allow testing
export const webVitalsMetricCustomTimeout = async (timeout: number) => {
  // always wait for TTCI
  await webVitalsObserver.ttciDetermined;
  // wait up to $timeout ms longer for web-vitals until returning
  const timeoutWindow = new Promise((resolve) => setTimeout(resolve, timeout));
  await Promise.race([timeoutWindow, webVitalsObserver.webVitalsDetermined]);
  return webVitalsObserver.data;
};
