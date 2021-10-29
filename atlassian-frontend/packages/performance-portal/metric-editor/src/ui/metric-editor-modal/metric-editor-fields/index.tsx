import React, { useMemo } from 'react';

import { graphql, useFragment } from 'react-relay';

import { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { EventType } from '@atlassian/performance-portal-common';
import {
  SelectField,
  SelectFieldOptionType,
} from '@atlassian/performance-portal-form-utils';

import { MetricFormData } from '../../../types';

import type {
  BrowserMetricEventType,
  metricEditorFieldsFragment$key,
  Product,
} from './__generated__/metricEditorFieldsFragment.graphql';
import Goals from './goals';
import TeamField from './team-field';

type Props = {
  data: metricEditorFieldsFragment$key | null;
};

const productOptions: SelectFieldOptionType<Product>[] = [
  { label: 'Jira', value: 'JIRA' },
  { label: 'Confluence', value: 'CONFLUENCE' },
  { label: 'Opsgenie', value: 'OPSGENIE' },
  { label: 'Team Central', value: 'WATERMELON' },
  { label: 'Compass', value: 'COMPASS' },
  { label: 'AdminHub', value: 'ADMIN' },
  { label: 'Developer.A.C', value: 'DAC' },
];

const eventTypeOptions: SelectFieldOptionType<BrowserMetricEventType>[] = [
  { label: 'Page Load', value: EventType.PAGE_LOAD },
  { label: 'Page Segment Load', value: EventType.PAGE_SEGMENT_LOAD },
  { label: 'Inline Result (Interaction)', value: EventType.INLINE_RESULT },
  { label: 'Custom', value: EventType.CUSTOM },
  { label: 'Web Vitals', value: EventType.WEB_VITALS },
];

export const MetricEditorFields = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment metricEditorFieldsFragment on Metric {
        name
        product
        key
        owner {
          ... on Team {
            id
          }
        }
        slackChannel
        ... on PageLoadMetric {
          eventType
          toplineGoals {
            id
            name
            value
            percentile
            toplineType
          }
        }
      }
    `,
    props.data,
  );

  const formFieldInitialValues: Partial<MetricFormData> = useMemo(
    () => ({
      'metric-name': data?.name ?? undefined,
      product: data?.product ?? undefined,
      'event-id': data?.key ?? undefined,
      'team-id': data?.owner?.id ?? undefined,
      'slack-channel': data?.slackChannel ?? undefined,
      'event-type': data?.eventType ?? undefined,
      goals:
        data?.toplineGoals?.map((g) => ({
          id: g.id ?? undefined,
          name: g.name!,
          value: g.value!,
          percentile: g.percentile!,
          toplineType: g.toplineType!,
          isDeleted: false,
        })) ?? undefined,
    }),
    [
      data?.eventType,
      data?.key,
      data?.name,
      data?.owner?.id,
      data?.product,
      data?.slackChannel,
      data?.toplineGoals,
    ],
  );

  return (
    <>
      <Field
        name="metric-name"
        defaultValue={formFieldInitialValues['metric-name']}
        label="Metric name"
        isRequired
      >
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>

      <SelectField<Product>
        options={productOptions}
        name="product"
        label="Product"
        defaultValue={formFieldInitialValues.product}
        isRequired
      />

      <Field
        name="event-id"
        defaultValue={formFieldInitialValues['event-id']}
        label="Event Id"
        isRequired
      >
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>

      <TeamField
        name="team-id"
        defaultValue={formFieldInitialValues['team-id']}
        label="Team Id"
      />

      <Field
        name="slack-channel"
        defaultValue={formFieldInitialValues['slack-channel']}
        label="Slack channel"
      >
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>

      <SelectField<BrowserMetricEventType>
        options={eventTypeOptions}
        name="event-type"
        label="Event type"
        defaultValue={formFieldInitialValues['event-type']}
        isRequired
      />

      <Field name="goals" defaultValue={formFieldInitialValues.goals ?? []}>
        {({ fieldProps }) => {
          return <Goals fieldProps={fieldProps} />;
        }}
      </Field>
    </>
  );
};
