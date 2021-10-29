import {
  getThresholdItemDefaultValue,
  SupportedEventType,
} from '../common/utils/threshold-item-default-value';
import { ThresholdItemFormValue } from '../types';

import { UpdateAlertConfigInput } from './__generated__/useFormSubmit_batchSaveAlertConfigs_Mutation.graphql';
import { omitUndefined } from './omit-undefined';

export const toUpdateAlertConfigInput = (eventType: SupportedEventType) => ({
  id: thresholdId,
  env,
  pageLoadType,
  metricType,
  percentile,
  cohortType,
  cohortValue,
  thresholdValue,
  thresholdType,
  comparisonType,
  priority,
  ignoreWeekend,
}: ThresholdItemFormValue): UpdateAlertConfigInput => {
  const cleanFormValue = omitUndefined({
    env,
    pageLoadType,
    metricType,
    percentile,
    cohortType,
    cohortValue,
    thresholdValue,
    thresholdType,
    comparisonType,
    priority,
    ignoreWeekend,
  });

  return {
    id: thresholdId!,
    patch: {
      ...getThresholdItemDefaultValue(eventType),
      ...cleanFormValue,
    },
  };
};
