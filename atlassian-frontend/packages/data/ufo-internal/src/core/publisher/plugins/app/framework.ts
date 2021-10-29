import { AppConfig } from '../../../../types';

export const appFramework = (config: AppConfig) => {
  if (!config.framework) {
    return null;
  }
  return {
    'app:framework:name': config.framework.name,
    'app:framework:version': config.framework.version,
  };
};
