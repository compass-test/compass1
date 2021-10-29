import React from 'react';
import { action } from '@storybook/addon-actions';
import { UserPickerProps, FormProps } from '@atlassian/forge-ui-types';
import { MockMentionProvider } from '@atlassian/aux-test-utils';
import { Form as DefaultForm } from '../form';
import { makeUserPicker } from './';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';
import { createMockClient } from 'mock-apollo-client';
import { usersQuery } from '../../web-client';

const Form = createExampleComponent<FormProps<any>>(DefaultForm);

export default createDefaultExport();

const mockClient = createMockClient();
mockClient.setRequestHandler(usersQuery, async ({ accountIds }) => {
  return {
    data: {
      users: [
        {
          accountId: '123',
          name: 'Ryan Braganza',
          picture:
            'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:6eb7858d-8169-4d19-b4b4-3e1b6b8627dd/7bc47cd5-30a8-4ed8-b6eb-26e97de79ed4/128',
        },
      ].filter(({ accountId }) => accountIds.includes(accountId)),
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

const defaultProps = {
  label: 'label',
  name: 'user',
};

export const basic = () => (
  <Form onSubmit={action('onSubmit')}>
    <UserPicker {...defaultProps} />
  </Form>
);

export const multiUserPicker = () => (
  <Form onSubmit={action('onSubmit')}>
    <UserPicker {...defaultProps} isMulti />
  </Form>
);

export const customPlaceholder = () => (
  <Form onSubmit={action('onSubmit')}>
    <UserPicker
      {...defaultProps}
      isMulti
      placeholder="Custom placeholder message"
    />
  </Form>
);

export const defaultValue = () => {
  return (
    <Form onSubmit={action('onSubmit')}>
      <UserPicker {...defaultProps} defaultValue="123" />
    </Form>
  );
};
