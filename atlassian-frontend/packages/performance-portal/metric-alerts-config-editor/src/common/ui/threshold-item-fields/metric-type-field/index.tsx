import React from 'react';

import { graphql, useFragment } from 'react-relay';

import { ToplineType } from '@atlassian/performance-portal-common/types';
import { SelectField } from '@atlassian/performance-portal-form-utils';

import type { metricTypeFieldFragment$key } from './__generated__/metricTypeFieldFragment.graphql';

const EVENT_TYPE_OPTIONS = {
  PAGE_LOAD: [
    { value: ToplineType.TTI.toString(), label: 'TTI' },
    { value: ToplineType.FMP.toString(), label: 'FMP' },
  ],
  PAGE_SEGMENT_LOAD: [
    { value: ToplineType.TTI.toString(), label: 'TTI' },
    { value: ToplineType.FMP.toString(), label: 'FMP' },
  ],
  INLINE_RESULT: [
    { value: 'result', label: 'Result' },
    { value: 'response', label: 'Response' },
  ],
  CUSTOM: [{ value: 'duration', label: 'Duration' }],
};

export interface Props {
  name: string;
  defaultValue?: string | null;
  data: metricTypeFieldFragment$key;
}

export const MetricTypeField = (props: Props) => {
  const { name, defaultValue } = props;

  const data = useFragment(
    graphql`
      fragment metricTypeFieldFragment on BrowserMetric {
        eventType
      }
    `,
    props.data,
  );

  if (!data.eventType) {
    throw new Error('unexpected error nullish eventType');
  }

  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      label="Metric Type"
      isRequired
      options={
        EVENT_TYPE_OPTIONS[
          data.eventType?.toString() as keyof typeof EVENT_TYPE_OPTIONS
        ]
      }
      width={100}
    />
  );
};
