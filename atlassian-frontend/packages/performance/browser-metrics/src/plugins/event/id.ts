import { PerformanceEventConfig } from '../../types';

export const eventId = (config: PerformanceEventConfig) => {
  return {
    'event:id': config.key,
  };
};
