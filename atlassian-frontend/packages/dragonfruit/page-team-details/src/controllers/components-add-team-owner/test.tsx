import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { MockedTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { useSearchComponentsAddTeamOwner } from './index';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;

describe('SearchComponentsAddTeamOwner', () => {
  const MOCKED_NODES = [
    {
      component: {
        id: '48098507-7cc0-43d4-9931-fbaa100a9687',
        name: 'searchApi',
        type: CompassComponentType.SERVICE,
        ownerId: '1234',
        dataManager: {
          ecosystemAppId: '567890',
        },
        description: 'Description of component',
      },
    },
    {
      component: {
        id: '1a1f593e-32d4-4293-be44-cd32ad69b3c1',
        name: 'react',
        type: CompassComponentType.LIBRARY,
        ownerId: '1234',
        description: 'Description of component',
      },
    },
    {
      component: {
        id: '965286c2-be12-4131-9a8f-793be429eba6',
        name: 'compass',
        type: CompassComponentType.APPLICATION,
        ownerId: '1234',
        dataManager: {
          ecosystemAppId: '567890',
        },
        description: 'Description of component',
      },
    },
  ];

  const MOCKED_SEARCH_RESULTS = {
    CompassComponentQueryResult: () => ({
      __typename: 'CompassSearchComponentConnection',
      nodes: [...MOCKED_NODES],
    }),
  };

  const OPTIONS = [
    {
      label: 'searchApi',
      value: '48098507-7cc0-43d4-9931-fbaa100a9687',
      type: 'SERVICE',
      ownerId: '1234',
      description: 'Description of component',
      isManaged: true,
    },
    {
      label: 'react',
      value: '1a1f593e-32d4-4293-be44-cd32ad69b3c1',
      type: 'LIBRARY',
      ownerId: '1234',
      description: 'Description of component',
      isManaged: false,
    },
    {
      label: 'compass',
      description: 'Description of component',
      value: '965286c2-be12-4131-9a8f-793be429eba6',
      type: 'APPLICATION',
      ownerId: '1234',
      isManaged: true,
    },
  ];

  const OPTION_GROUP = [
    {
      leftColumnLabel: 'Component',
      rightColumnLabel: 'Owner',
      options: OPTIONS,
    },
  ];
  const MOCK_TEAM_ID = '6c80685b-2a5d-4d88-8365-68087a5c678d';

  test('query', async () => {
    const wrapper: React.FC = ({ children }) => (
      <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS}>
        <MockedTenantInfoProvider>
          <CompassTestProvider locale={'en'}>{children}</CompassTestProvider>
        </MockedTenantInfoProvider>
      </ApolloAutoMockProvider>
    );

    const { result } = renderHook(
      () => useSearchComponentsAddTeamOwner(MOCK_TEAM_ID),
      {
        wrapper,
      },
    );

    const componentOptions = await result.current.search('temp');

    expect(componentOptions).toEqual(OPTION_GROUP);
  });
});
