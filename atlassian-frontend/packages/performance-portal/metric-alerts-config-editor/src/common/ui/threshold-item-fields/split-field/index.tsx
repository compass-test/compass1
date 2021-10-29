import React, { useMemo } from 'react';

import { graphql, useFragment } from 'react-relay';

import { COHORT_TYPE_LABELS } from '@atlassian/performance-portal-common/constants';
import { SelectField } from '@atlassian/performance-portal-form-utils';

import type { splitFieldFragment$key } from './__generated__/splitFieldFragment.graphql';

const ALL_OPTIONS = Object.entries(COHORT_TYPE_LABELS).map(
  ([value, label]) => ({
    label,
    value,
  }),
);

export interface Props {
  name: string;
  defaultValue?: string | null;
  data: splitFieldFragment$key;
}

export const SplitField = (props: Props) => {
  const { name, defaultValue } = props;
  const data = useFragment(
    graphql`
      fragment splitFieldFragment on BrowserMetric {
        availableCohortTypes
      }
    `,
    props.data,
  );
  const availableCohortTypesString = useMemo(
    () =>
      data.availableCohortTypes
        ?.filter((v) => v != null)
        .map((v) => v!.toString()) ?? [],
    [data.availableCohortTypes],
  );

  const filteredOptions = useMemo(() => {
    if (!availableCohortTypesString) {
      return ALL_OPTIONS;
    }
    return ALL_OPTIONS.filter(({ value }) =>
      availableCohortTypesString.includes(value),
    );
  }, [availableCohortTypesString]);

  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      label="Split"
      isRequired
      options={filteredOptions}
      width={120}
    />
  );
};
