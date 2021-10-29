import React, { Suspense } from 'react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { render } from '@testing-library/react';
import { createMockClient } from 'mock-apollo-client';
import { SPACE_PICKER_QUERY } from '../src/graphql/queries';
import { SpacePicker } from '../src/SpacePicker';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

describe('SpacePicker component', () => {
  const mockClient = createMockClient();
  const mockSpaceData = {
    favoriteSpaces: {
      nodes: [
        {
          name: 'Peter Yu',
          key: 'PY',
          id: 'PY',
          operations: [],
          homepage: {
            id: 'HP',
            title: 'homepage,',
          },
          containsExternalCollaborators: false,
        },
        {
          name: 'Nathan Hur',
          key: 'NH',
          id: 'NH',
          operations: [],
          homepage: {
            id: 'HP',
            title: 'homepage,',
          },
          containsExternalCollaborators: false,
        },
      ],
    },
    recentlyVisitedSpaces: [
      {
        name: 'Peter Yu',
        key: 'PY',
        id: 'PY',
        operations: [],
        homepage: {
          id: 'HP',
          title: 'homepage,',
        },
        containsExternalCollaborators: false,
      },
    ],
    searchedSpaces: {
      nodes: [],
    },
  };
  const mockRefetch = () =>
    Promise.resolve({ data: mockSpaceData, refetch: mockRefetch });

  mockClient.setRequestHandler(SPACE_PICKER_QUERY, async () => {
    return {
      data: mockSpaceData,
      refetch: mockRefetch,
    };
  });

  test('will render SpacePicker with placeholder text', async () => {
    const { findByText } = await render(
      <Suspense fallback="loading">
        <SpacePicker client={mockClient} />
      </Suspense>,
    );

    const spacePicker = await findByText('Select a space');
    expect(spacePicker).toBeTruthy();
  });
});
