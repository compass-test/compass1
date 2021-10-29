import React, { Fragment } from 'react';
import { Field, FormSection, ErrorMessage } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { emailRegex } from '../../utils/constants';
import {
  validateLength,
  displayErrorMessages,
} from '../../utils/form-validation-helper';

const PointOfContact = () => {
  return (
    <FormSection title="Point of contact">
      <Field
        name="point_of_contact_first_name"
        label="Point of contact first name"
        defaultValue=""
        isRequired
        validate={validateLength}
      >
        {({ fieldProps, error }) => (
          <Fragment>
            <TextField {...fieldProps} />
            {displayErrorMessages(error)}
          </Fragment>
        )}
      </Field>
      <Field
        name="point_of_contact_last_name"
        label="Point of contact last name"
        defaultValue=""
        isRequired
        validate={validateLength}
      >
        {({ fieldProps, error }) => (
          <Fragment>
            <TextField {...fieldProps} />
            {displayErrorMessages(error)}
          </Fragment>
        )}
      </Field>
      <Field
        name="point_of_contact_title"
        label="Point of contact title"
        defaultValue=""
        isRequired
        validate={validateLength}
      >
        {({ fieldProps, error }) => (
          <Fragment>
            <TextField {...fieldProps} />
            {displayErrorMessages(error)}
          </Fragment>
        )}
      </Field>
      <Field
        name="point_of_contact_email"
        label="Point of contact email"
        defaultValue=""
        isRequired
        validate={value =>
          value && !emailRegex.test(value) ? 'INVALID_EMAIL' : undefined
        }
      >
        {({ fieldProps, error }) => (
          <Fragment>
            <TextField {...fieldProps} />
            {error === 'INVALID_EMAIL' && (
              <ErrorMessage>Invalid email</ErrorMessage>
            )}
          </Fragment>
        )}
      </Field>
    </FormSection>
  );
};

export default PointOfContact;
