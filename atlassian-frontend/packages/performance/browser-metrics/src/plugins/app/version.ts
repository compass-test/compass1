import {
  BaseMetricDataWithStartAndStop,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

type PluginData = {
  'app:web:version': string;
  'app:ssr:version'?: string;
};

export const appVersion = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
): PluginData => {
  const pluginData: PluginData = {
    'app:web:version': globalConfig.app.version.web,
  };
  if (globalConfig.app.version.ssr) {
    pluginData['app:ssr:version'] = globalConfig.app.version.ssr;
  }

  return pluginData;
};
