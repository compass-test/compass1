import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  CustomPerformanceEventConfig,
  InteractionPerformanceEventConfig,
  PageLoadPerformanceEventConfig,
  ShareableGlobalConfig,
} from '../types';

type PluginResult = {
  [key: string]: string | number | boolean | Object | undefined;
} | null;

type PageLoadPlugin = (
  config: PageLoadPerformanceEventConfig,
  data: BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => PluginResult | Promise<PluginResult>;

type InteractionPlugin = (
  config: InteractionPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => PluginResult | Promise<PluginResult>;

type CustomPlugin = (
  config: CustomPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => PluginResult | Promise<PluginResult>;

export type Plugin = PageLoadPlugin | InteractionPlugin | CustomPlugin;
