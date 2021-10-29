import React, { useCallback } from 'react';

import Button from '@atlaskit/button';
import { Field, FieldProps } from '@atlaskit/form';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import TextField from '@atlaskit/textfield';
import { R400 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { Percentile, ToplineType } from '@atlassian/performance-portal-common';
import {
  SelectField,
  SelectFieldOptionType,
} from '@atlassian/performance-portal-form-utils';

import { MetricFormData, MetricFormData_Goals } from '../../../../types';
import {
  PageLoadToplineType,
  ToplineAggregation,
  // eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
} from '../__generated__/metricEditorFieldsFragment.graphql';

import {
  GoalWrapper,
  SectionTitle,
  SectionTitleLabel,
  Wrapper,
} from './styled';

type Props = {
  fieldProps: FieldProps<MetricFormData['goals']>;
};

const percentileOptions: SelectFieldOptionType<ToplineAggregation>[] = [
  { label: 'p50', value: 'p50' },
  { label: 'p75', value: 'p75' },
  { label: 'p90', value: 'p90' },
];

const toplineTypeOptions: SelectFieldOptionType<PageLoadToplineType>[] = [
  { label: 'FMP', value: 'FMP' },
  { label: 'TTI', value: 'TTI' },
];

const JiraPageLoadGoals: MetricFormData_Goals[] = [
  {
    name: '1.0',
    value: 3000,
    percentile: Percentile.p50,
    toplineType: ToplineType.FMP,
    isDeleted: false,
  },
  {
    name: '1.0',
    value: 3000,
    percentile: Percentile.p75,
    toplineType: ToplineType.FMP,
    isDeleted: false,
  },
  {
    name: '1.0',
    value: 3000,
    percentile: Percentile.p90,
    toplineType: ToplineType.FMP,
    isDeleted: false,
  },
  {
    name: '1.0',
    value: 4000,
    percentile: Percentile.p50,
    toplineType: ToplineType.TTI,
    isDeleted: false,
  },
  {
    name: '1.0',
    value: 4000,
    percentile: Percentile.p75,
    toplineType: ToplineType.TTI,
    isDeleted: false,
  },
  {
    name: '1.0',
    value: 4000,
    percentile: Percentile.p90,
    toplineType: ToplineType.TTI,
    isDeleted: false,
  },
];

const Goals = ({ fieldProps }: Props) => {
  const goals = fieldProps.value;

  const addGoalHandler = useCallback(() => {
    fieldProps.onChange([
      ...(goals ?? []),
      {
        name: '',
        value: 0,
        percentile: Percentile.p90,
        toplineType: ToplineType.FMP,
        isDeleted: false,
      },
    ]);
  }, [fieldProps, goals]);

  const setJiraGoals = useCallback(() => {
    fieldProps.onChange([...goals, ...JiraPageLoadGoals]);
  }, [fieldProps, goals]);

  return (
    <Wrapper>
      <SectionTitle>
        <SectionTitleLabel>Goals</SectionTitleLabel>
        <Button
          appearance={'subtle'}
          iconAfter={<AddCircleIcon label="" />}
          onClick={addGoalHandler}
        />
        <Button appearance={'link'} onClick={setJiraGoals}>
          Jira goals
        </Button>
      </SectionTitle>
      {goals?.map((goal, i) => {
        if (goal.isDeleted === true) {
          return (
            <Field name={`goals[${i}].isDeleted`} defaultValue={goal.isDeleted}>
              {() => null}
            </Field>
          );
        }
        return (
          <GoalWrapper key={`${goal.id}`}>
            <Field
              name={`goals[${i}].name`}
              defaultValue={goal.name ?? undefined}
              label="Name"
              isRequired
            >
              {({ fieldProps }) => <TextField {...fieldProps} width="xsmall" />}
            </Field>

            <Field
              name={`goals[${i}].value`}
              defaultValue={goal.value}
              label="Goal"
              isRequired
            >
              {({ fieldProps }) => <TextField {...fieldProps} width="xsmall" />}
            </Field>
            <SelectField
              options={percentileOptions}
              name={`goals[${i}].percentile`}
              label="Percentile"
              defaultValue={goal.percentile}
              width={85}
              isRequired
            />
            <SelectField
              options={toplineTypeOptions}
              name={`goals[${i}].toplineType`}
              label="Topline Type"
              defaultValue={goal.toplineType}
              width={85}
              isRequired
            />

            <Field
              name={`goals[${i}].isDeleted`}
              defaultValue={goal.isDeleted as boolean}
            >
              {({ fieldProps }) => (
                <Button
                  appearance={'subtle'}
                  iconAfter={<CrossCircleIcon label="" primaryColor={R400} />}
                  onClick={() => {
                    fieldProps.onChange(true);
                  }}
                  style={{ marginTop: `${gridSize() * 4}px` }}
                />
              )}
            </Field>
          </GoalWrapper>
        );
      })}
    </Wrapper>
  );
};

export default Goals;
