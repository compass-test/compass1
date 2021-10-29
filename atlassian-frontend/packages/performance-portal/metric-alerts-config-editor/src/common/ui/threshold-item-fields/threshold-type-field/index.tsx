import React from 'react';

import {
  SelectField,
  SelectFieldOptionType,
} from '@atlassian/performance-portal-form-utils';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { AlertConfigThresholdType } from '../../../../ui/thresholds-section/threshold-list/threshold-item/simple-edit-threshold-item/__generated__/simpleEditThresholdItemFragment.graphql';

const OPTIONS: SelectFieldOptionType<AlertConfigThresholdType>[] = [
  { value: 'ABSOLUTE_DIFF', label: 'ms' },
  { value: 'PERCENT_DIFF', label: '%' },
];

export interface Props {
  name: string;
  defaultValue?: AlertConfigThresholdType | null;
}

export const ThresholdTypeField = ({ name, defaultValue }: Props) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      label=" "
      isRequired
      options={OPTIONS}
      width={80}
    />
  );
};
