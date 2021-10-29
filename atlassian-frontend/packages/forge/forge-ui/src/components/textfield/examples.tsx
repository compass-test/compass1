import React from 'react';
import { action } from '@storybook/addon-actions';
import { FormProps } from '@atlassian/forge-ui-types';
import TextField from './';
import { Form as DefaultForm } from '../form';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';

const Form = createExampleComponent<FormProps<any>>(DefaultForm);

export default createDefaultExport();

export const basic = () => <TextField label="username" name="username" />;

export const placeholder = () => (
  <TextField label="email" name="email" placeholder="Enter an email" />
);

export const description = () => (
  <TextField
    label="username"
    name="username"
    placeholder="Enter a name"
    description="This is description"
  />
);

export function Variants() {
  return (
    <Form onSubmit={action('onSubmit')}>
      <TextField label="Email" name="email" type="email" />
      <TextField label="Number" name="num" type="number" />
      <TextField label="Telephone" name="tel" type="tel" />
      <TextField label="Text" name="text" type="text" />
    </Form>
  );
}

export function VariantsRequired() {
  return (
    <Form onSubmit={action('onSubmit')}>
      <TextField label="Email" name="email" type="email" isRequired />
      <TextField label="Number" name="num" type="number" isRequired />
      <TextField label="Telephone" name="tel" type="tel" isRequired />
      <TextField label="Text" name="text" type="text" isRequired />
    </Form>
  );
}

export function autocompleteDisabled() {
  return (
    <>
      <h1>All fields have auto-completion disabled</h1>
      <Form onSubmit={action('onSubmit')}>
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete={'off'}
        />
        <TextField
          label="Number"
          name="num"
          type="number"
          autoComplete={'off'}
        />
        <TextField
          label="Telephone"
          name="tel"
          type="tel"
          autoComplete={'off'}
        />
        <TextField label="Text" name="text" type="text" autoComplete={'off'} />
      </Form>
    </>
  );
}
