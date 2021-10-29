import React, { ReactElement } from 'react';

import { CompassRelationshipType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_COMPONENT,
  MOCKED_SEARCH_RESULTS,
} from '../../../../../../common/mocks';

import { AddRelationshipForm } from './main';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const AddRelationshipFormExample = () => {
  const resolvers = () => ({
    Mutation: {
      compass: () => ({
        createRelationship: {
          success: true,
        },
      }),
    },
  });

  return (
    <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS} resolvers={resolvers}>
      <div style={{ width: '600px' }}>
        <AddRelationshipForm
          currentComponent={MOCKED_COMPONENT}
          relationshipType={CompassRelationshipType.DEPENDS_ON}
          existingRelationships={[]}
          onSuccess={() => null}
          onCancel={() => null}
        />
      </div>
    </ApolloAutoMockProvider>
  );
};

export const AddRelationshipFormErrorExample = () => {
  const resolvers = () => ({
    Mutation: {
      compass: () => ({
        createRelationship: {
          success: false,
        },
      }),
    },
  });

  return (
    <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS} resolvers={resolvers}>
      <div style={{ width: '600px' }}>
        <AddRelationshipForm
          currentComponent={MOCKED_COMPONENT}
          relationshipType={CompassRelationshipType.DEPENDS_ON}
          existingRelationships={[]}
          onSuccess={() => null}
          onCancel={() => null}
        />
      </div>
    </ApolloAutoMockProvider>
  );
};
