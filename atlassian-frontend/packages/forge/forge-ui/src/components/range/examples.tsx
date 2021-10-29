import React, { useState } from 'react';
import { FormProps } from '@atlassian/forge-ui-types';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';
import Range from './';
import { Form as DefaultForm } from '../form';

const Form = createExampleComponent<FormProps<any>>(DefaultForm);

export default createDefaultExport();

const Basic = () => {
  const [data, setData] = useState({});
  const handleSubmit = (formData: any) => setData(formData);
  return (
    <>
      <h1 style={{ marginBottom: '1em' }}>
        Check: Range renders, has no validation and outputs data on submit (even
        when pristine)
      </h1>
      <div
        style={{
          background: 'lightyellow',
          padding: '1em',
          marginBottom: '1em',
        }}
      >
        <p>
          <strong>Form data:</strong>
        </p>
        <code>{JSON.stringify(data)}</code>
      </div>

      <Form onSubmit={handleSubmit}>
        <Range name={'preference'} label={'Preference'} />
      </Form>
    </>
  );
};

export const basic = () => <Basic />;

export const WithMinAndMax = () => {
  const [data, setData] = useState({});
  const handleSubmit = (formData: any) => setData(formData);
  return (
    <>
      <h1 style={{ marginBottom: '1em' }}>
        Check: Range renders correctly respecting min/max values
      </h1>
      <div
        style={{
          background: 'lightyellow',
          padding: '1em',
          marginBottom: '1em',
        }}
      >
        <p>
          <strong>Form data:</strong>
        </p>
        <code>{JSON.stringify(data)}</code>
      </div>

      <Form onSubmit={handleSubmit}>
        <Range name={'preference'} label={'Preference'} min={1} max={10} />
      </Form>
    </>
  );
};

export const withMinAndMax = () => <WithMinAndMax />;
