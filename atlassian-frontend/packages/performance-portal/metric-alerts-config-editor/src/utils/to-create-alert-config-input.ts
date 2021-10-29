import {
  getThresholdItemDefaultValue,
  SupportedEventType,
} from '../common/utils/threshold-item-default-value';
import { ThresholdItemFormValue } from '../types';

import { CreateAlertConfigInput } from './__generated__/useFormSubmit_batchSaveAlertConfigs_Mutation.graphql';
import { omitUndefined } from './omit-undefined';

export const toCreateAlertConfigInput = (
  metricId: string,
  eventType: SupportedEventType,
) => ({
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
}: ThresholdItemFormValue): CreateAlertConfigInput => {
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
    ...getThresholdItemDefaultValue(eventType),
    ...cleanFormValue,
    metricId,
  } as CreateAlertConfigInput;
};
