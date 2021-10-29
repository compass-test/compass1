import React from 'react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentList } from './main';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => {
      return <CompassTestProvider>{storyFn()}</CompassTestProvider>;
    },
  ],
};

export const ScorecardAppliedToComponents = () => {
  const mocks = {
    CompassScorecardScore: () => ({
      __typename: 'CompassScorecardScore',
      totalScore: 90,
      maxTotalScore: 100,
    }),
    CompassScorecard: () => ({
      appliedToComponents: {
        __typename: 'CompassScorecardAppliedToComponentsConnection',
        nodes: [
          {
            __typename: 'CompassComponent',
            id: 'fake-component-foo',
            name: 'Moo - Scorecard',
            description: 'I am a Moo component',
            ownerId: null,
          },
          {
            __typename: 'CompassComponent',
            id: 'fake-component-bar',
            name: 'Bar - Scorecard',
            description: 'I am a Bar component',
            ownerId: null,
          },
        ],
      },
    }),
  };

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks}>
        <ComponentList
          componentType={CompassComponentType.OTHER}
          scorecardARI={
            'ari:cloud:compass:2376f937-d647-4506-9ac8-b3e1bf664575:scorecard/2fdd88e4-4414-4a89-be5c-129b66b85fee/fake-scorecard-id'
          }
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};
