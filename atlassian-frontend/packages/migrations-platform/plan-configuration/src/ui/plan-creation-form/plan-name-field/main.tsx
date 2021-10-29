import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';

import { messages } from './messages';
import PlanNameValidationMessage from './plan-name-validation-message';
import { PlanNameFieldProps } from './types';

const PlanNameField: React.FC<PlanNameFieldProps & InjectedIntlProps> = ({
  intl: { formatMessage },
  value,
  label = formatMessage(messages.label),
  isRequired = false,
  validation = 'None',
  onChange,
  ...otherTextFieldProps
}) => {
  return (
    <Field<string, HTMLInputElement>
      name="migration-plan-name"
      label={label}
      isRequired={isRequired}
    >
      {({ fieldProps }) => (
        <>
          <TextField
            {...fieldProps}
            {...otherTextFieldProps}
            defaultValue={value}
            onChange={(event) => {
              if (onChange) {
                onChange(event.currentTarget.value);
              }
            }}
            placeholder={formatMessage(messages.placeholder)}
            testId="migration-plan-name-text-field"
          />
          <PlanNameValidationMessage validation={validation} />
        </>
      )}
    </Field>
  );
};

export default injectIntl(PlanNameField);
