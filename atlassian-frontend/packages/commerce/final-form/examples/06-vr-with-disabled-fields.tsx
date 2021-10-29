import React from 'react';

import Button from '@atlaskit/button';
import TexField from '@atlaskit/textfield';

import { Field, FieldContainer, Form } from '../src';

const onSubmit = async (values: any) => window.alert(JSON.stringify(values));

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
              <Field name="last-name" label="Last Name">
                {({ fieldProps }) => <TexField {...fieldProps} />}
              </Field>
              <Field isDisabled name="country" label="Country">
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
