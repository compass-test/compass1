import React from 'react';

import { graphql, useFragment } from 'react-relay';

import { MetricTypeField } from '../../../../../common/ui/threshold-item-fields/metric-type-field';
import { PercentileField } from '../../../../../common/ui/threshold-item-fields/percentile-field';
import { PriorityField } from '../../../../../common/ui/threshold-item-fields/priority-field';
import { ThresholdField } from '../../../../../common/ui/threshold-item-fields/threshold-field';
import { ThresholdTypeField } from '../../../../../common/ui/threshold-item-fields/threshold-type-field';
import {
  getThresholdItemDefaultValue,
  isSupportedEventType,
} from '../../../../../common/utils/threshold-item-default-value';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { FieldWrapper } from '../styled';

import type { simpleEditThresholdItem_metricData_Fragment$key } from './__generated__/simpleEditThresholdItem_metricData_Fragment.graphql';
import type { simpleEditThresholdItemFragment$key } from './__generated__/simpleEditThresholdItemFragment.graphql';
export interface Props {
  data: simpleEditThresholdItemFragment$key | null;
  metricData: simpleEditThresholdItem_metricData_Fragment$key;
  index: number;
}
export const SimpleEditThresholdItem = (props: Props) => {
  const { index } = props;

  const data = useFragment(
    graphql`
      fragment simpleEditThresholdItemFragment on AlertConfig {
        metricType
        percentile
        thresholdValue
        thresholdType
        priority
      }
    `,
    props.data,
  );

  const metricData = useFragment(
    graphql`
      fragment simpleEditThresholdItem_metricData_Fragment on Metric {
        ... on BrowserMetric {
          eventType
        }
        ...metricTypeFieldFragment
      }
    `,
    props.metricData,
  );

  if (!isSupportedEventType(metricData.eventType)) {
    throw new Error('unexpected event type');
  }

  const defaultValueObj =
    data ?? getThresholdItemDefaultValue(metricData.eventType);

  return (
    <>
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
        <PriorityField
          name={`thresholds[${index}].priority`}
          defaultValue={defaultValueObj.priority}
        />
      </FieldWrapper>
    </>
  );
};
