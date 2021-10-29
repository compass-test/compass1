import React, { ReactElement } from 'react';

import {
  CompassComponentType,
  CompassRelationship,
  CompassRelationshipDirection,
  CompassRelationshipType,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { RelationshipList } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

const FAKE_RELATIONSHIPS: CompassRelationship[] = [
  {
    type: CompassRelationshipType.DEPENDS_ON,
    endNode: {
      id: '1',
      type: CompassComponentType.APPLICATION,
      name: 'compass',
      changeMetadata: {},
    },
    changeMetadata: {},
  },
  {
    type: CompassRelationshipType.DEPENDS_ON,
    endNode: {
      id: '4',
      type: CompassComponentType.SERVICE,
      name: 'sentry',
      changeMetadata: {},
    },
    changeMetadata: {},
  },
  {
    type: CompassRelationshipType.DEPENDS_ON,
    endNode: {
      id: '7',
      type: CompassComponentType.LIBRARY,
      name: 'apollo',
      changeMetadata: {},
    },
    changeMetadata: {},
  },
  {
    type: CompassRelationshipType.DEPENDS_ON,
    endNode: {
      id: '10',
      type: CompassComponentType.OTHER,
      name:
        'Ocean man, take me by the hand, Lead me to the land that you understand, Ocean man, the voyage to the corner of the globe, Is a real trip',
      changeMetadata: {},
    },
    changeMetadata: {},
  },
];

export const RelationshipListExample = () => {
  return (
    <div style={{ maxWidth: 700 }}>
      <ApolloAutoMockProvider>
        <RelationshipList
          direction={CompassRelationshipDirection.OUTWARD}
          relationships={FAKE_RELATIONSHIPS}
        />
      </ApolloAutoMockProvider>
    </div>
  );
};

export const RelationshipListWithOneItemExample = () => {
  return (
    <div style={{ maxWidth: 700 }}>
      <ApolloAutoMockProvider>
        <RelationshipList
          direction={CompassRelationshipDirection.OUTWARD}
          relationships={FAKE_RELATIONSHIPS.slice(0, 1)}
        />
      </ApolloAutoMockProvider>
    </div>
  );
};

export const RelationshipListDisabledExample = () => {
  return (
    <div style={{ maxWidth: 700 }}>
      <ApolloAutoMockProvider>
        <RelationshipList
          direction={CompassRelationshipDirection.OUTWARD}
          relationships={FAKE_RELATIONSHIPS}
          isDisabled
        />
      </ApolloAutoMockProvider>
    </div>
  );
};
