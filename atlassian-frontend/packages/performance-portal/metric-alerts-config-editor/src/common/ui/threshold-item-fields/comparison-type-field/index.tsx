import React from 'react';

import {
  SelectField,
  SelectFieldOptionType,
} from '@atlassian/performance-portal-form-utils';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { ComparisonType } from '../../../../ui/thresholds-section/threshold-list/threshold-item/advanced-edit-threshold-item/__generated__/advancedEditThresholdItem_alertConfig_Fragment.graphql';

const OPTIONS: SelectFieldOptionType<ComparisonType>[] = [
  { value: 'WoW', label: 'WoW' },
  { value: 'DoD', label: 'DoD' },
];

export interface Props {
  name: string;
  defaultValue?: ComparisonType | null;
}

export const ComparisonTypeField = ({ name, defaultValue }: Props) => {
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
