import React from 'react';

import { DiProvider, injectable } from 'react-magnetic-di';

import { GetComponentScorecardsWithScoresQuery } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { useGetComponentScorecardsWithScores } from '../src/services/get-component-scorecards-with-scores';
import { ScorecardsHealthInfo } from '../src/ui/scorecards-health-info';
import {
  MOCK_COMPONENT_ID,
  mockScorecardsWithScoresMixedHealthy,
} from '../src/ui/scorecards-health-info/mocks';

const mockGetComponentScorecardsWithScoresMixedHealthy = () => {
  return {
    loading: false,
    error: undefined,
    data: {
      compass: {
        component: {
          scorecards: mockScorecardsWithScoresMixedHealthy,
        },
      },
    } as GetComponentScorecardsWithScoresQuery,
  };
};

const useGetComponentScorecardsWithScoresMock = injectable(
  useGetComponentScorecardsWithScores,
  mockGetComponentScorecardsWithScoresMixedHealthy,
);

export default function MixedHealthyScorecards() {
  return (
    <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </DiProvider>
  );
}
