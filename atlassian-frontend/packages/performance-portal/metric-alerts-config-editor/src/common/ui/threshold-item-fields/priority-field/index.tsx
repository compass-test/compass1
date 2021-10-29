import React from 'react';

import {
  SelectField,
  SelectFieldOptionType,
} from '@atlassian/performance-portal-form-utils';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { AlertConfigPriority } from '../../../../ui/thresholds-section/threshold-list/threshold-item/simple-edit-threshold-item/__generated__/simpleEditThresholdItemFragment.graphql';

const OPTIONS: SelectFieldOptionType<AlertConfigPriority>[] = [
  { value: 'P1', label: 'P1' },
  { value: 'P2', label: 'P2' },
  { value: 'P3', label: 'P3' },
  { value: 'P4', label: 'P4' },
  { value: 'P5', label: 'P5' },
];

export interface Props {
  name: string;
  defaultValue?: AlertConfigPriority | null;
}

export const PriorityField = ({ name, defaultValue }: Props) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      label="Priority"
      isRequired
      options={OPTIONS}
      width={80}
    />
  );
};
