import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  PageVisibleState,
  PageVisibleValueOrigin,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

export const pageVisibleValue = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  const value =
    globalConfig.pageVisibleValueOrigin ===
    PageVisibleValueOrigin.documentHidden
      ? !document.hidden || false
      : data.pageVisibleState === PageVisibleState.VISIBLE;
  return {
    'pageVisible:value': value,
  };
};
