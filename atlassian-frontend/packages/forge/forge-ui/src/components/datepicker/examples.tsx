import React from 'react';
import { action } from '@storybook/addon-actions';
import { FormProps } from '@atlassian/forge-ui-types';
import DatePicker from './';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';
import { Form as DefaultForm } from '../form';

const Form = createExampleComponent<FormProps<any>>(DefaultForm);

export default createDefaultExport();

export const basic = () => <DatePicker name="calendar" label="Calendar" />;

export const placeholder = () => (
  <DatePicker name="calendar" label="Calendar" placeholder="enter date" />
);

export const description = () => (
  <DatePicker
    name="calendar"
    label="Calendar"
    description="This is description"
  />
);

export const defaultValue = () => (
  <DatePicker
    name="calendar-with-default"
    label="Calendar with default"
    defaultValue="2020-01-28"
  />
);

export const withIsRequired = () => {
  return (
    <>
      <h1 style={{ marginBottom: '1em' }}>
        Assert label renders with red asterisk and submit without value
        invalidates input
      </h1>
      <Form onSubmit={action('onSubmit')}>
        <DatePicker name="calendar-with-required" label="Calendar" isRequired />
      </Form>
    </>
  );
};
