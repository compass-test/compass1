import React from 'react';

import { graphql, useFragment } from 'react-relay';

import { CohortField } from '../../../../../common/ui/threshold-item-fields/cohort-field';
import { ComparisonTypeField } from '../../../../../common/ui/threshold-item-fields/comparison-type-field';
import { EnvField } from '../../../../../common/ui/threshold-item-fields/env-field';
import { IgnoreWeekendField } from '../../../../../common/ui/threshold-item-fields/ignore-weekend-field';
import { MetricTypeField } from '../../../../../common/ui/threshold-item-fields/metric-type-field';
import { PageLoadTypeField } from '../../../../../common/ui/threshold-item-fields/page-load-type-field';
import { PercentileField } from '../../../../../common/ui/threshold-item-fields/percentile-field';
import { PriorityField } from '../../../../../common/ui/threshold-item-fields/priority-field';
import { SplitField } from '../../../../../common/ui/threshold-item-fields/split-field';
import { ThresholdField } from '../../../../../common/ui/threshold-item-fields/threshold-field';
import { ThresholdTypeField } from '../../../../../common/ui/threshold-item-fields/threshold-type-field';
import {
  getThresholdItemDefaultValue,
  isSupportedEventType,
} from '../../../../../common/utils/threshold-item-default-value';
import { ThresholdItemFormValue } from '../../../../../types';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { FieldWrapper } from '../styled';

import type { advancedEditThresholdItem_alertConfig_Fragment$key } from './__generated__/advancedEditThresholdItem_alertConfig_Fragment.graphql';
import type { advancedEditThresholdItem_metricData_Fragment$key } from './__generated__/advancedEditThresholdItem_metricData_Fragment.graphql';

export interface Props {
  index: number;
  thresholdFormValue: ThresholdItemFormValue;
  alertConfigData: advancedEditThresholdItem_alertConfig_Fragment$key | null;
  metricData: advancedEditThresholdItem_metricData_Fragment$key;
  setFieldValue: (name: string, value: any) => void;
}
export const AdvanceEditThresholdItem = (props: Props) => {
  const { index, thresholdFormValue, setFieldValue } = props;

  const alertConfigData = useFragment(
    graphql`
      fragment advancedEditThresholdItem_alertConfig_Fragment on AlertConfig {
        env
        pageLoadType
        metricType
        percentile
        cohortType
        cohortValue
        thresholdValue
        thresholdType
        comparisonType
        priority
        ignoreWeekend
      }
    `,
    props.alertConfigData,
  );

  const metricData = useFragment(
    graphql`
      fragment advancedEditThresholdItem_metricData_Fragment on Metric {
        ... on BrowserMetric {
          eventType
        }
        ...splitFieldFragment
        ...cohortFieldFragment
        ...metricTypeFieldFragment
      }
    `,
    props.metricData,
  );

  if (!isSupportedEventType(metricData.eventType)) {
    throw new Error('unexpected event type');
  }

  const defaultValueObj =
    alertConfigData ?? getThresholdItemDefaultValue(metricData.eventType);

  return (
    <>
      <FieldWrapper>
        <EnvField
          name={`thresholds[${index}].env`}
          defaultValue={defaultValueObj.env}
        />
      </FieldWrapper>
      {(metricData.eventType === 'PAGE_LOAD' ||
        metricData.eventType === 'PAGE_SEGMENT_LOAD') && (
        <FieldWrapper>
          <PageLoadTypeField
            name={`thresholds[${index}].pageLoadType`}
            defaultValue={defaultValueObj.pageLoadType}
          />
        </FieldWrapper>
      )}

      <FieldWrapper>
        <MetricTypeField
          name={`thresholds[${index}].metricType`}
          defaultValue={defaultValueObj.metricType}
          data={metricData}
        />
      </FieldWrapper>
      <FieldWrapper>
        <PercentileField
          name={`thresholds[${index}].percentile`}
          defaultValue={defaultValueObj.percentile}
        />
      </FieldWrapper>
      <FieldWrapper>
        <SplitField
          name={`thresholds[${index}].cohortType`}
          data={metricData}
          defaultValue={defaultValueObj.cohortType}
        />
      </FieldWrapper>
      <FieldWrapper>
        <CohortField
          name={`thresholds[${index}].cohortValue`}
          defaultValue={defaultValueObj.cohortValue}
          data={metricData}
          selectedCohortType={thresholdFormValue.cohortType}
          setFieldValueFn={setFieldValue}
        />
      </FieldWrapper>
      <FieldWrapper>
        <ThresholdField
          name={`thresholds[${index}].thresholdValue`}
          defaultValue={defaultValueObj.thresholdValue}
        />
      </FieldWrapper>
      <FieldWrapper>
        <ThresholdTypeField
          name={`thresholds[${index}].thresholdType`}
          defaultValue={defaultValueObj.thresholdType}
        />
      </FieldWrapper>
      <FieldWrapper>
        <ComparisonTypeField
          name={`thresholds[${index}].comparisonType`}
          defaultValue={defaultValueObj.comparisonType}
        />
      </FieldWrapper>
      <FieldWrapper>
        <PriorityField
          name={`thresholds[${index}].priority`}
          defaultValue={defaultValueObj.priority}
        />
      </FieldWrapper>
      <FieldWrapper>
        <IgnoreWeekendField
          name={`thresholds[${index}].ignoreWeekend`}
          defaultValue={defaultValueObj.ignoreWeekend}
        />
      </FieldWrapper>
    </>
  );
};
