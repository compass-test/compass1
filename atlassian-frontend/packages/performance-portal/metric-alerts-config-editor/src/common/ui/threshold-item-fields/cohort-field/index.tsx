import React, { useEffect, useMemo } from 'react';

import { graphql, useFragment } from 'react-relay';

import { SelectField } from '@atlassian/performance-portal-form-utils';

import type { cohortFieldFragment$key } from './__generated__/cohortFieldFragment.graphql';

export interface Props {
  name: string;
  defaultValue?: string | null;
  selectedCohortType?: string | null;
  data: cohortFieldFragment$key;
  setFieldValueFn: (name: string, value: any) => void;
}

export const CohortField = (props: Props) => {
  const { name, defaultValue, selectedCohortType, setFieldValueFn } = props;
  const data = useFragment(
    graphql`
      fragment cohortFieldFragment on BrowserMetric {
        knownCohortValues {
          cohortType
          cohortValues
        }
      }
    `,
    props.data,
  );

  const options = useMemo(() => {
    if (!selectedCohortType) {
      return [];
    }
    if (selectedCohortType === 'ALL') {
      return [
        {
          label: 'all',
          value: 'all',
        },
      ];
    }
    return (
      data.knownCohortValues
        ?.find(({ cohortType }) => {
          return cohortType.toLowerCase() === selectedCohortType?.toLowerCase();
        })
        ?.cohortValues?.map((cohortValue) => ({
          label: cohortValue,
          value: cohortValue,
        })) ?? []
    );
  }, [data.knownCohortValues, selectedCohortType]);

  useEffect(() => {
    const newValue =
      selectedCohortType === 'ALL' ? 'all' : options?.[0]?.value ?? null;

    setFieldValueFn(name, newValue);
  }, [selectedCohortType, name, options, setFieldValueFn]);

  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      label="Cohort"
      isRequired
      options={options}
      width={120}
    />
  );
};
