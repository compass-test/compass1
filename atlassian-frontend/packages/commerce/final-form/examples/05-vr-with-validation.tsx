import React from 'react';

import Button from '@atlaskit/button';
import TexField from '@atlaskit/textfield';

import { ErrorMessage, Field, FieldContainer, Form } from '../src';

const onSubmit = async (values: any) => window.alert(JSON.stringify(values));

export const validateRequiredField = (value?: string): string | void => {
  if (!value) {
    return 'Required field';
  }

  return;
};

export default () => {
  return (
    <div data-testid="examples">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate={true}>
            <FieldContainer>
              <Field name="first-name" label="First Name">
                {({ fieldProps }) => <TexField {...fieldProps} />}
              </Field>
              <Field
                isRequired
                validate={validateRequiredField}
                name="last-name"
                label="Last Name"
              >
                {({ fieldProps, meta: { error, submitError, touched } }) => {
                  const scopeError = error || submitError;

                  return (
                    <>
                      <TexField {...fieldProps} />
                      {scopeError && touched && (
                        <ErrorMessage>{scopeError}</ErrorMessage>
                      )}
                    </>
                  );
                }}
              </Field>
              <Field name="country" label="Country">
                {({ fieldProps }) => <TexField {...fieldProps} />}
              </Field>
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </FieldContainer>
          </form>
        )}
      />
    </div>
  );
};
