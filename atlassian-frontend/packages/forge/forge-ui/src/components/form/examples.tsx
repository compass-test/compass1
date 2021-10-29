import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import {
  FormProps,
  ButtonProps,
  UserPickerProps,
} from '@atlassian/forge-ui-types';
import { MockMentionProvider } from '@atlassian/aux-test-utils';

import { CheckboxGroup } from '../checkbox';
import DatePicker from '../datepicker';
import { Form as DefaultForm } from '../form';
import FormCondition from '../formCondition';
import { RadioGroup } from '../radio';
import { Select } from '../select';
import TextArea from '../textarea';
import TextField from '../textfield';
import Toggle from '../toggle';
import Range from '../range';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';
import { Button as DefaultButton } from '../button/Button';
import { createMockClient } from 'mock-apollo-client';
import { usersQuery } from '../../web-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { makeUserPicker } from '../userPicker';

const Form = createExampleComponent<FormProps<any>>(DefaultForm);
const Button = createExampleComponent<ButtonProps>(DefaultButton);

export default createDefaultExport();

// Initial setup for UserPicker component
const mockClient = createMockClient();
mockClient.setRequestHandler(usersQuery, async () => {
  return {
    data: {
      users: [
        {
          accountId: '123',
          name: 'Ryan Braganza',
          picture:
            'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:6eb7858d-8169-4d19-b4b4-3e1b6b8627dd/7bc47cd5-30a8-4ed8-b6eb-26e97de79ed4/128',
        },
        {
          accountId: '456',
          name: 'Aman Singh',
          picture: 'https://example.com',
        },
      ],
    },
  };
});

const DefaultUserPicker = makeUserPicker({
  client: mockClient,
  accountId: 'userid123',
  cloudId: '497ea592-beb4-43c3-9137-a6e5fa301088',
  productKey: 'jira' as const,
  mentionProvider: Promise.resolve(new MockMentionProvider()),
});

const UserPicker = createExampleComponent<UserPickerProps>(DefaultUserPicker);

function BasicValidateAndSubmit() {
  const [data, setData] = useState({});
  const handleSubmit = (formData: any) => setData(formData);

  return (
    <ApolloProvider client={mockClient}>
      <h1 style={{ marginBottom: '1em' }}>
        Form and elements render, validates and outputs data on submit
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
        <TextField name="name" label="name" isRequired />
        <TextField name="email" label="email" type="email" isRequired />
        <TextField name="number" label="number" type="number" isRequired />
        <TextField name="tel" label="tel" type="tel" isRequired />
        <TextArea name="message" label="Message" isRequired />
        <CheckboxGroup
          name="product"
          label="Products"
          options={[
            { label: 'Jira', value: 'jira', defaultChecked: true },
            { label: 'Confluence', value: 'confluence' },
          ]}
        />
        <RadioGroup
          name="fav-donut"
          label="Favourite donut"
          options={[
            { name: 'fav-donut', label: 'Chocolate', value: 'chocolate' },
            { name: 'fav-donut', label: 'Strawberry', value: 'strawberry' },
            { name: 'fav-donut', label: 'Cinnamon', value: 'cinnamon' },
          ]}
          isRequired
        />
        <DatePicker name="calendar" label="Calendar" isRequired />
        <Select
          label="Other favourite donut"
          name="other-fav-donut"
          options={[
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Strawberry', value: 'strawberry' },
            { label: 'Cinnamon', value: 'cinnamon' },
          ]}
          isRequired
        />
        <Range name={'preference'} label={'Preference'} />
        <UserPicker
          label="Single User"
          name="singleUser"
          defaultValue="123"
          isRequired
        />
        <UserPicker
          label="Multi User"
          name="multiUser"
          defaultValue={['123', '456']}
          isMulti
          isRequired
        />
      </Form>
    </ApolloProvider>
  );
}

export const basicValidateAndSubmit = () => <BasicValidateAndSubmit />;

export const actionButtons = () => {
  const productOptions = [
    { label: 'Jira', value: 'jira', defaultChecked: true },
    { label: 'Confluence', value: 'confluence' },
  ];

  return (
    <Form onSubmit={action('onSubmit')}>
      <TextField name="username" label="username" />
      <CheckboxGroup label="Products" name="product" options={productOptions} />
      <Button text="Go back" key="actionButton.0" onClick={action('go-back')} />
      <Button text="Cancel" key="actionButton.1" onClick={action('cancel')} />
    </Form>
  );
};

export const conditionalFormFields = () => {
  const handleSubmit = action('conditional form submitted');
  return (
    <ApolloProvider client={mockClient}>
      <h2>Not persisted</h2>
      <Form onSubmit={handleSubmit}>
        <TextField name="username" label="username" />
        <CheckboxGroup
          name="product"
          label="More options"
          options={[{ label: 'Run a JQL query', value: 'true' }]}
        />
        <FormCondition when="product" is={['true']}>
          <TextField label="JQL Query" name="query" />
        </FormCondition>
      </Form>
      <h2>Persisted</h2>
      <Form onSubmit={handleSubmit}>
        <TextField name="username" label="username" />
        <CheckboxGroup
          name="product"
          label="More options"
          options={[{ label: 'Run a JQL query', value: 'true' }]}
        />
        <FormCondition areChildrenPersisted={true} when="product" is={['true']}>
          <TextField label="JQL Query" name="query" />
        </FormCondition>
      </Form>
      <h2>Transforming some data</h2>
      <Form onSubmit={handleSubmit}>
        <UserPicker name="user" label="User" />
        <TextField name="username" label="username" />
        <FormCondition areChildrenPersisted={true} when="user" is="123">
          <TextField label="JQL Query" name="query" />
        </FormCondition>
        <Toggle name="toggle" label="Toggle" />
        <FormCondition when="toggle" is={true}>
          <TextField label="Toggle is true" name="toggletrue" />
        </FormCondition>
      </Form>
    </ApolloProvider>
  );
};
