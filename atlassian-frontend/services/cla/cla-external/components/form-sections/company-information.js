import React, { Fragment } from 'react';
import { Field, FormSection } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import {
  validateLength,
  displayErrorMessages,
} from '../../utils/form-validation-helper';

const CompanyInformation = () => {
  return (
    <FormSection title="Company information">
      <Field
        name="corporation_name"
        label="Corporation name"
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
        name="address"
        label="Corporation address"
        defaultValue=""
        isRequired
      >
        {({ fieldProps }) => (
          <Fragment>
            <TextArea {...fieldProps} minimumRows={4} />
          </Fragment>
        )}
      </Field>
    </FormSection>
  );
};

export default CompanyInformation;
