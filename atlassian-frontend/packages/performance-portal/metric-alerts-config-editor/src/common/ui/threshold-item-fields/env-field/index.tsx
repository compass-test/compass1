import React from 'react';

import { ENVIRONMENT_OPTIONS } from '@atlassian/performance-portal-common/constants';
import { SelectField } from '@atlassian/performance-portal-form-utils';

export interface Props {
  name: string;
  defaultValue?: string | null;
}

const OPTIONS = ENVIRONMENT_OPTIONS.map(({ label, value }) => ({
  label,
  value: value.toString(),
}));

export const EnvField = ({ name, defaultValue }: Props) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      label="Environment"
      isRequired
      options={OPTIONS}
      width={120}
    />
  );
};
