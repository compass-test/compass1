import {
  BaseMetricDataWithStartAndStop,
  CustomValue,
  CustomValues,
  PerformanceEventConfig,
} from '../../types';

export const customData = (
  _config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
) => {
  const custom: CustomValues = {};
  let changed = false;
  if (data.custom) {
    Object.entries(data.custom as { [key: string]: CustomValue }).forEach(
      ([key, value]) => {
        changed = true;
        custom[`custom:${key}`] = value;
      },
    );
  }
  return changed ? custom : null;
};
