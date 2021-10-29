import React from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { CheckboxField } from '@atlaskit/form';

export interface Props {
  name: string;
  defaultValue?: boolean | null;
}

export const IgnoreWeekendField = ({ name, defaultValue }: Props) => {
  return (
    <CheckboxField
      name={name}
      defaultIsChecked={defaultValue ?? true}
      label="Ignore Weekend?"
    >
      {({ fieldProps }) => <Checkbox {...fieldProps} />}
    </CheckboxField>
  );
};
