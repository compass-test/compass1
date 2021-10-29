import { ApolloProvider } from '@apollo/react-hooks';
import {
  SELECTED_SPACE_QUERY,
  SPACE_PICKER_QUERY,
} from '@atlassian/confluence-space-picker';
import { AkForm } from '@atlassian/forge-ui';
import { createExampleComponent } from '@atlassian/aux-test-utils';
import { createMockClient } from 'mock-apollo-client';
import React, { Suspense } from 'react';
import { makeSpacePicker } from './SpacePicker';

const client = createMockClient();
const MS_SPACE = {
  id: 'MS',
  key: 'MS',
  name: 'Microsoft',
  links: {
    base: 'https://example.com',
  },
  icon: {
    path: 'icon.svg',
  },
  containsExternalCollaborators: false,
};

client.setRequestHandler(SELECTED_SPACE_QUERY, async () => ({
  data: {
    selectedSpaces: {
      nodes: [MS_SPACE],
    },
  },
}));

client.setRequestHandler(SPACE_PICKER_QUERY, async () => {
  await new Promise((res) => setTimeout(res, 1000));
  const queryResult = {
    favoriteSpaces: {
      nodes: [MS_SPACE],
    },
    searchedSpaces: {
      count: 1,
      nodes: [
        {
          space: MS_SPACE,
        },
      ],
    },
    recentlyVisitedSpaces: [MS_SPACE],
  };

  return {
    data: queryResult,
    refetch: () =>
      Promise.resolve({
        data: queryResult,
      }),
  };
});

const SpacePicker = createExampleComponent(makeSpacePicker({ client }));

export const SingleSpacePickerExample = () => (
  <Suspense fallback="loading">
    <ApolloProvider client={client}>
      <AkForm onSubmit={() => {}}>
        {({ formProps }) => (
          <form {...formProps}>
            <SpacePicker name="space" label="Select single space" />
          </form>
        )}
      </AkForm>
    </ApolloProvider>
  </Suspense>
);
