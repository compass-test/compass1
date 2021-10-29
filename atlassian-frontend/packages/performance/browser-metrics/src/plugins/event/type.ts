import { mapEventType } from '../../helper/map-event-type';
import { PerformanceEventConfig } from '../../types';

export const eventType = (config: PerformanceEventConfig) => {
  return {
    'event:type': mapEventType(config.type),
  };
};
