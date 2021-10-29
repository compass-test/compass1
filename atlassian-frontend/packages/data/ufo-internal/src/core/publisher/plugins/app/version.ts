import { AppConfig } from '../../../../types';

type PluginData = {
  'app:web:version': string;
  'app:ssr:version'?: string;
};

export const appVersion = (config: AppConfig): PluginData => {
  const pluginData: PluginData = {
    'app:web:version': config.version.web,
  };
  if (config.version.ssr) {
    pluginData['app:ssr:version'] = config.version.ssr;
  }

  return pluginData;
};
