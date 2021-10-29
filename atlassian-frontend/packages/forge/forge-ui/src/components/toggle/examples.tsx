import React from 'react';
import { action } from '@storybook/addon-actions';
import { FormProps } from '@atlassian/forge-ui-types';
import Toggle from './';
import { Form as DefaultForm } from '../form';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';

const Form = createExampleComponent<FormProps<any>>(DefaultForm);

export default createDefaultExport();

export const basic = () => (
  <Form onSubmit={action('onSubmit')}>
    <Toggle name="toggle" label="Toggle" />
    <Toggle
      name="defaultChecked"
      label="Default Checked"
      defaultChecked={true}
    />
  </Form>
);
