import React, { Fragment } from 'react';
import { Field, FormSection } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import {
  validateLength,
  displayErrorMessages,
} from '../../utils/form-validation-helper';

const PersonalInformation = () => {
  return (
    <FormSection title="Personal information">
      <p>
        You will be recorded as the signatory on this license agreement. Ensure
        that you are authorized to do this.
      </p>
      <Field
        name="signee_first_name"
        label="Signee first name"
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
        name="signee_last_name"
        label="Signee last name"
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
        name="signee_title"
        label="Signee title"
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
    </FormSection>
  );
};

export default PersonalInformation;
