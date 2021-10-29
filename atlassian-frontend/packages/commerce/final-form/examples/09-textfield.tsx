import React from 'react';

import Button from '@atlaskit/button';
import TextArea from '@atlaskit/textarea';

import { Field, FieldContainer, Form } from '../src';

const onSubmit = async (values: any) => window.alert(JSON.stringify(values));

export default () => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate={true}>
          <FieldContainer>
            <Field<string, HTMLTextAreaElement> name="ideas">
              {({ fieldProps }) => (
                <TextArea
                  {...fieldProps}
                  minimumRows={3}
                  placeholder="Please tell us more about your ideas"
                />
              )}
            </Field>

            <div>
              <Button type="submit">Submit</Button>
            </div>
          </FieldContainer>
        </form>
      )}
    />
  );
};
