import React from 'react';

import { PageLoadType } from '@atlassian/performance-portal-common/types';
import { SelectField } from '@atlassian/performance-portal-form-utils';

const OPTIONS = [
  {
    label: 'combined',
    value: PageLoadType.COMBINED.toString(),
  },
  {
    label: 'initial',
    value: PageLoadType.INITIAL.toString(),
  },
  {
    label: 'transition',
    value: PageLoadType.TRANSITION.toString(),
  },
];

export interface Props {
  name: string;
  defaultValue?: string | null;
}

export const PageLoadTypeField = ({ name, defaultValue }: Props) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      label="Page Load Type"
      isRequired
      options={OPTIONS}
      width={120}
    />
  );
};
