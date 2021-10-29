import React from 'react';

import { SelectField } from '@atlassian/performance-portal-form-utils';

export const PERCENTILE_OPTIONS = [
  {
    label: 'p50',
    value: 50,
  },
  {
    label: 'p75',
    value: 75,
  },
  {
    label: 'p90',
    value: 90,
  },
];

export interface Props {
  name: string;
  defaultValue?: number | null;
}

export const PercentileField = ({ name, defaultValue }: Props) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      label="Percentile"
      isRequired
      options={PERCENTILE_OPTIONS}
      width={80}
    />
  );
};
