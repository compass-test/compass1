import React, { useMemo } from 'react';

import { graphql, useFragment } from 'react-relay';

import { Field } from '@atlaskit/form';

import type { thresholdsSectionFragment$key } from './__generated__/thresholdsSectionFragment.graphql';
import { ThresholdList } from './threshold-list';

interface Props {
  data: thresholdsSectionFragment$key;
  setFieldValue: (name: string, value: any) => void;
}

export const ThresholdSection = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment thresholdsSectionFragment on Metric {
        ...thresholdList_metric_Fragment
        alertConfigs {
          id
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
          ...thresholdList_alertConfigs_Fragment
        }
      }
    `,
    props.data,
  );

  const defaultValue = useMemo(() => {
    // copy to new instance of mutable object
    return data.alertConfigs?.map(
      ({
        id,
        env,
        pageLoadType,
        metricType,
        percentile,
        cohortType,
        cohortValue,
        thresholdType,
        thresholdValue,
        comparisonType,
        priority,
        ignoreWeekend,
      }) => ({
        id,
        env,
        pageLoadType,
        metricType,
        percentile,
        cohortType,
        cohortValue,
        thresholdType,
        thresholdValue,
        comparisonType,
        priority,
        ignoreWeekend,
      }),
    );
  }, [data.alertConfigs]);

  return (
    <Field name="thresholds" defaultValue={defaultValue}>
      {({ fieldProps }) => {
        return (
          <ThresholdList
            alertConfigsData={data.alertConfigs}
            metricData={data}
            fieldProps={fieldProps}
            setFieldValue={props.setFieldValue}
          />
        );
      }}
    </Field>
  );
};
