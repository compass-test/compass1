import React from 'react';

import { DiProvider, injectable } from 'react-magnetic-di';

import { GetComponentScorecardsWithScoresQuery } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloLoadingProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { useGetComponentScorecardsWithScores } from '../../services/get-component-scorecards-with-scores';

import {
  MOCK_COMPONENT_ID,
  mockScorecardsWithScoresAllHealthy,
  mockScorecardsWithScoresAllUnHealthy,
  mockScorecardsWithScoresMixedHealthy,
  mockScorecardsWithScoresNoScorecards,
} from './mocks';

import { ScorecardsHealthInfo } from './index';

export const Loading = () => {
  return (
    <CompassTestProvider>
      <ApolloLoadingProvider>
        <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
      </ApolloLoadingProvider>
    </CompassTestProvider>
  );
};

export const Error = () => {
  return (
    <CompassTestProvider>
      <ApolloNetworkErrorProvider>
        <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
      </ApolloNetworkErrorProvider>
    </CompassTestProvider>
  );
};

export const NoScorecards = () => {
  const mockGetComponentScorecardsWithScoresNoScorecards = () => {
    return {
      loading: false,
      error: undefined,
      data: {
        compass: {
          component: {
            name: 'Awesome Component',
            scorecards: mockScorecardsWithScoresNoScorecards,
          },
        },
      } as GetComponentScorecardsWithScoresQuery,
    };
  };

  const useGetComponentScorecardsWithScoresMock = injectable(
    useGetComponentScorecardsWithScores,
    mockGetComponentScorecardsWithScoresNoScorecards,
  );

  return (
    <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </DiProvider>
  );
};

export const AllHealthyScorecards = () => {
  const mockGetComponentScorecardsWithScoresAllHealthy = () => {
    return {
      loading: false,
      error: undefined,
      data: {
        compass: {
          component: {
            name: 'Awesome Component',
            scorecards: mockScorecardsWithScoresAllHealthy,
          },
        },
      } as GetComponentScorecardsWithScoresQuery,
    };
  };

  const useGetComponentScorecardsWithScoresMock = injectable(
    useGetComponentScorecardsWithScores,
    mockGetComponentScorecardsWithScoresAllHealthy,
  );

  return (
    <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </DiProvider>
  );
};

export const AllUnHealthyScorecards = () => {
  const mockGetComponentScorecardsWithScoresAllUnHealthy = () => {
    return {
      loading: false,
      error: undefined,
      data: {
        compass: {
          component: {
            name: 'Awesome Component',
            scorecards: mockScorecardsWithScoresAllUnHealthy,
          },
        },
      } as GetComponentScorecardsWithScoresQuery,
    };
  };

  const useGetComponentScorecardsWithScoresMock = injectable(
    useGetComponentScorecardsWithScores,
    mockGetComponentScorecardsWithScoresAllUnHealthy,
  );

  return (
    <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </DiProvider>
  );
};

export const MixedHealthyScorecards = () => {
  const mockGetComponentScorecardsWithScoresMixedHealthy = () => {
    return {
      loading: false,
      error: undefined,
      data: {
        compass: {
          component: {
            name: 'Awesome Component',
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

  return (
    <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </DiProvider>
  );
};

export const ErrorBoundedScoreCards = () => {
  const mockGetComponentScorecardsWithScoresWithException = () => {
    // this is just to simulate some sort of exception being thrown
    throw new TypeError();
  };

  const useGetComponentScorecardsWithScoresMock = injectable(
    useGetComponentScorecardsWithScores,
    mockGetComponentScorecardsWithScoresWithException,
  );

  return (
    <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </DiProvider>
  );
};
