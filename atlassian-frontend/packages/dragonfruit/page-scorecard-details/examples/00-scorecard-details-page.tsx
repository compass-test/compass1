import React from 'react';

import {
  CompassComponentType,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { PageScorecardDetails } from '../src/ui/scorecard-details';

const mocks = {
  CompassScorecardScore: () => ({
    __typename: 'CompassScorecardScore',
    totalScore: 90,
    maxTotalScore: 100,
  }),
  CompassScorecard: () => ({
    __typename: 'CompassScorecard',
    name: 'Scorecard for integration tests',
    importance: CompassScorecardImportance.RECOMMENDED,
    componentType: CompassComponentType.SERVICE,
    appliedToComponents: {
      __typename: 'CompassScorecardAppliedToComponentsConnection',
      nodes: [
        {
          __typename: 'CompassComponent',
          id: 'cool-component',
          name: 'Cool component',
          description: 'I am a cool component',
          ownerId: null,
          type: CompassComponentType.SERVICE,
        },
        {
          __typename: 'CompassComponent',
          id: 'another-cool-component',
          name: 'Another cool component',
          description: 'I am also a cool component',
          ownerId: null,
          type: CompassComponentType.SERVICE,
        },
      ],
    },
    owner: () => ({
      __typename: 'CustomerUser',
      name: 'Li Bai',
    }),
  }),
};

export default () => (
  <CompassTestProvider>
    <ApolloAutoMockProvider mocks={mocks}>
      <PageScorecardDetails
        scorecardId={'fakeId'}
        testId={'testing-component-list'}
      />
    </ApolloAutoMockProvider>
  </CompassTestProvider>
);
