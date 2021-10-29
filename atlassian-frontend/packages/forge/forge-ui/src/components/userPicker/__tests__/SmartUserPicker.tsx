import React, { Suspense } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { render } from '@testing-library/react';
import { createMockClient } from 'mock-apollo-client';
import UserPicker from '../';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

// NOTE: having the following test in the single file, where the default userpicker component test resides,
// was causing some mocking issue.
jest.mock('@atlaskit/user-picker', () => {
  const originalModule = jest.requireActual('@atlaskit/user-picker');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => <div>AKUserPicker</div>),
    SmartUserPicker: jest.fn(() => <div>AKSmartUserPicker</div>),
  };
});

describe('Smart UserPicker component', () => {
  const mockClient = createMockClient();

  const UserPickerComponent = (
    <Suspense fallback={<div />}>
      <ApolloProvider client={mockClient}>
        <UserPicker name="userId" label="User ID" defaultValue="123" />
      </ApolloProvider>
    </Suspense>
  );

  test('will render the correct userpicker component based on forge context availability', async () => {
    const smartProps = {
      accountId: 'userid123',
      cloudId: '497ea592-beb4-43c3-9137-a6e5fa301088',
      productKey: 'jira' as const,
    };

    const SmartUserPicker = (
      <Suspense fallback={<div />}>
        <ApolloProvider client={mockClient}>
          <UserPicker
            name="userId"
            label="User ID"
            defaultValue="123"
            {...smartProps}
          />
        </ApolloProvider>
      </Suspense>
    );

    // Smart user picker
    const smartUpRender = render(SmartUserPicker);
    const nameAkSmart = await smartUpRender.findByText('AKSmartUserPicker');
    expect(nameAkSmart).toBeTruthy();

    // default user picker
    const upRender = render(UserPickerComponent);
    const up = await upRender.findByText('AKUserPicker');
    expect(up).toBeTruthy();
  });
});
