import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_COMPONENT,
  MOCKED_SEARCH_RESULTS,
} from '../../../../../../common/mocks';

import { EmptyStateForm } from './main';

export const EmptyStateFormExample = () => {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS}>
        <EmptyStateForm
          currentComponent={MOCKED_COMPONENT}
          onSuccess={() => null}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};
