import React, { Suspense } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { Handler } from '@atlassian/forge-ui-types';
import { render } from '@testing-library/react';
import { createMockClient, RequestHandler } from 'mock-apollo-client';
import UserPicker from '../';
import { usersQuery } from '../../../web-client/hooks/useUser';
import { Form } from '../../form';
import { IntlProvider } from 'react-intl';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const createMockedQueryProvider = (
  query: DocumentNode,
  handler: RequestHandler,
): React.FunctionComponent => ({ children }) => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(query, handler);
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};

describe('UserPicker component', () => {
  const dispatchMock = jest.fn();
  const onSubmit: Handler = {
    componentKey: 'Form',
    prop: 'onSubmit',
  };
  test('will render a default user when given an AAID', async () => {
    const MockQueryProvider = createMockedQueryProvider(
      usersQuery,
      async () => {
        return {
          data: {
            users: [
              {
                name: 'Ryan Braganza',
                picture: 'https://example.com/image.jpg',
                accountId: '123',
              },
            ],
          },
        };
      },
    );
    const UserPickerComponent = (
      <Suspense fallback={<div />}>
        <IntlProvider locale="en">
          <MockQueryProvider>
            <Form
              forgeDoc={{
                type: 'Form',
                props: {
                  onSubmit,
                },
                children: [
                  {
                    type: 'UserPicker',
                    key: 'UserPicker.0',
                    props: {
                      name: 'userId',
                      label: 'User ID',
                      defaultValue: '123',
                      isMulti: true,
                    },
                    children: [],
                  },
                ],
              }}
              dispatch={dispatchMock}
              render={(forgeDoc) => {
                if (forgeDoc.type === 'UserPicker') {
                  // @ts-ignore
                  return <UserPicker {...forgeDoc.props} key={forgeDoc.key} />;
                }
              }}
            />
          </MockQueryProvider>
        </IntlProvider>
      </Suspense>
    );
    const { findByText } = render(UserPickerComponent);
    const name = await findByText('Ryan Braganza');
    expect(name).toBeTruthy();
  });

  test('will render multiple default users when give array of AAID', async () => {
    const MockQueryProvider = createMockedQueryProvider(
      usersQuery,
      async () => {
        return {
          data: {
            users: [
              {
                name: 'Aman Singh',
                picture: 'https://example.com/image.jpg',
                accountId: '007',
              },
              {
                name: 'Dan',
                picture: 'https://example.com/image.jpg',
                accountId: '123',
              },
            ],
          },
        };
      },
    );
    const UserPickerComponent = (
      <Suspense fallback={<div />}>
        <IntlProvider locale="en">
          <MockQueryProvider>
            <Form
              forgeDoc={{
                type: 'Form',
                props: {
                  onSubmit,
                },
                children: [
                  {
                    type: 'UserPicker',
                    key: 'UserPicker.0',
                    props: {
                      name: 'userId',
                      label: 'User ID',
                      defaultValue: '123',
                      isMulti: true,
                    },
                    children: [],
                  },
                ],
              }}
              dispatch={dispatchMock}
              render={(forgeDoc) => {
                if (forgeDoc.type === 'UserPicker') {
                  // @ts-ignore
                  return <UserPicker {...forgeDoc.props} key={forgeDoc.key} />;
                }
              }}
            />
          </MockQueryProvider>
        </IntlProvider>
      </Suspense>
    );
    const { findByText } = render(UserPickerComponent);
    const name1 = await findByText('Aman Singh');
    expect(name1).toBeTruthy();
    const name2 = await findByText('Dan');
    expect(name2).toBeTruthy();
  });
});
