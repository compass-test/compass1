import React, { ChangeEvent } from 'react';

import { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';

export interface Props {
  name: string;
  defaultValue?: number | null;
}

export const ThresholdField = ({ name, defaultValue }: Props) => {
  return (
    <Field
      name={name}
      defaultValue={defaultValue ?? undefined}
      label="Diff"
      isRequired
    >
      {({ fieldProps }) => (
        <TextField
          {...fieldProps}
          type="number"
          width="xsmall"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            fieldProps.onChange(Number(e.target.value));
          }}
        />
      )}
    </Field>
  );
};
