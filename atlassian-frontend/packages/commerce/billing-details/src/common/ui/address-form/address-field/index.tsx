import React, { ReactChild, ReactElement } from 'react';

import { FieldProps } from '@atlaskit/form';
import { ErrorMessage, Field } from '@atlassian/commerce-final-form';

import { AddressFormField, AddressFormValues } from '../../../types';
import { validateRequiredField } from '../../../utils';

export const AddressField = <FieldKey extends AddressFormField>({
  name,
  label,
  required = false,
  children,
}: {
  name: FieldKey;
  label: ReactChild;
  required?: boolean;
  children: (
    fieldProps: FieldProps<AddressFormValues[FieldKey]>,
  ) => ReactElement;
}): ReactElement => {
  return (
    <Field<AddressFormValues[FieldKey]>
      name={name}
      label={label}
      isRequired={required}
      validate={required ? validateRequiredField : undefined}
    >
      {({ fieldProps, meta: { error, submitError, touched } }) => {
        const scopeError = error || submitError;
        return (
          <>
            {children(fieldProps)}
            {scopeError && touched && (
              <ErrorMessage fieldId={fieldProps.id}>{scopeError}</ErrorMessage>
            )}
          </>
        );
      }}
    </Field>
  );
};
