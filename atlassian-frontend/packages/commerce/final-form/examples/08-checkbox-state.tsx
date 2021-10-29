import React, { useState } from 'react';

import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import TexField from '@atlaskit/textfield';

import { Field, FieldContainer, Form } from '../src';

const onSubmit = async (values: any) => window.alert(JSON.stringify(values));

export default () => {
  const [newDetailsChecked, setNewDetailsChecked] = useState<boolean>(false);
  const valuesOld = {
    'first-name': 'Lalo',
    country: 'Australia',
  };
  const valuesNew = {
    'first-name': 'Javier',
    'last-name': 'Perez',
    country: 'Mejico',
  };
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={newDetailsChecked ? valuesNew : valuesOld}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate={true}>
          <FieldContainer>
            <Field name="first-name" label="First Name">
              {({ fieldProps }) => <TexField {...fieldProps} />}
            </Field>
            <Field name="last-name" label="Last Name">
              {({ fieldProps }) => <TexField {...fieldProps} />}
            </Field>
            <Field name="country" label="Country">
              {({ fieldProps }) => <TexField {...fieldProps} />}
            </Field>

            <Checkbox
              label="Use new details"
              onChange={() => setNewDetailsChecked(!newDetailsChecked)}
            />
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </FieldContainer>
        </form>
      )}
    />
  );
};
