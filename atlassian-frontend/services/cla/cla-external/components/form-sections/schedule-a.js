import React, { Fragment, useState } from 'react';
import { Field, FormSection, FormFooter, ErrorMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import { emailRegex } from '../../utils/constants';
import {
  validateLength,
  validateLengthAndCharacters,
  displayErrorMessages,
} from '../../utils/form-validation-helper';
import { contributorContainerStyles } from './schedule-a.styles';

const ScheduleA = () => {
  const [contributorFields, setContributorFields] = useState([{ value: null }]);

  function addContributor() {
    const values = [...contributorFields];
    values.push({ value: null });
    setContributorFields(values);
  }

  function removeContributor(index) {
    const values = [...contributorFields];
    values.splice(index, 1);
    setContributorFields(values);
  }

  return (
    <FormSection title="Schedule A">
      <p>
        Initial list of designated employees. All fields are required for each
        employee.
      </p>

      {contributorFields.map((field, index) => {
        const contributorKey = `${field}-${index}`;
        return (
          <div key={contributorKey} className="cla-contributor-container">
            <Field
              name={`github_name_${index}`}
              label="GitHub username"
              defaultValue=""
              isRequired
              validate={validateLengthAndCharacters}
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField {...fieldProps} />
                  {displayErrorMessages(error)}
                </Fragment>
              )}
            </Field>
            <Field
              name={`first_name_${index}`}
              label="First name"
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
              name={`last_name_${index}`}
              label="Last name"
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
              name={`email_${index}`}
              label="Email"
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
            {index > 0 && (
              <FormFooter>
                <Button
                  onClick={() => removeContributor(index)}
                  appearance="subtle"
                >
                  Remove
                </Button>
              </FormFooter>
            )}
          </div>
        );
      })}

      <FormFooter>
        <Button onClick={addContributor}>Add another contributor</Button>
      </FormFooter>
      <style jsx>{contributorContainerStyles}</style>
    </FormSection>
  );
};

export default ScheduleA;
