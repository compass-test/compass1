import React from 'react';

import { DiProvider, injectable } from 'react-magnetic-di';

import {
  CompassScorecard,
  GetComponentScorecardWithScoresByIdQuery,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloLoadingProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useGetComponentScorecardWithScoresById } from '../../../services/get-component-scorecard-with-scores-by-id';

import { ScorecardFullView } from './main';
import {
  MOCK_COMPONENT_ID,
  MOCK_COMPONENT_NAME,
  MOCK_SCORECARD_ID,
  mockScorecardWithAllCompleteCriterias,
  mockScorecardWithAllInCompleteCriterias,
  mockScorecardWithMixedCriterias,
  onClose,
} from './mocks';

export const ScorecardFullViewLoading = () => {
  return (
    <CompassTestProvider>
      <ApolloLoadingProvider>
        <ScorecardFullView
          componentId={MOCK_COMPONENT_ID}
          componentName={MOCK_COMPONENT_NAME}
          scorecardId={MOCK_SCORECARD_ID}
          onClose={onClose}
        />
      </ApolloLoadingProvider>
    </CompassTestProvider>
  );
};

export const ScorecardFullViewError = () => {
  return (
    <CompassTestProvider>
      <ApolloNetworkErrorProvider>
        <ScorecardFullView
          componentId={MOCK_COMPONENT_ID}
          componentName={MOCK_COMPONENT_NAME}
          scorecardId={MOCK_SCORECARD_ID}
          onClose={onClose}
        />
      </ApolloNetworkErrorProvider>
    </CompassTestProvider>
  );
};

export const ScorecardFullViewAllComplete = () => {
  const mockGetComponentScorecardWithScoresByIdAllCompleteCriterias = () => {
    return {
      loading: false,
      error: undefined,
      data: {
        compass: {
          scorecard: mockScorecardWithAllCompleteCriterias,
        },
      } as GetComponentScorecardWithScoresByIdQuery,
    };
  };

  const useGetComponentScorecardWithScoresByIdMock = injectable(
    useGetComponentScorecardWithScoresById,
    mockGetComponentScorecardWithScoresByIdAllCompleteCriterias,
  );

  return (
    <DiProvider use={[useGetComponentScorecardWithScoresByIdMock]}>
      <CompassTestProvider>
        <ScorecardFullView
          componentId={MOCK_COMPONENT_ID}
          componentName={MOCK_COMPONENT_NAME}
          scorecardId={MOCK_SCORECARD_ID}
          onClose={onClose}
        />
      </CompassTestProvider>
    </DiProvider>
  );
};

export const ScorecardFullViewAllIncomplete = () => {
  const mockGetComponentScorecardWithScoresByIdAllInCompleteCriterias = () => {
    return {
      loading: false,
      error: undefined,
      data: {
        compass: {
          scorecard: mockScorecardWithAllInCompleteCriterias,
        },
      } as GetComponentScorecardWithScoresByIdQuery,
    };
  };

  const useGetComponentScorecardWithScoresByIdMock = injectable(
    useGetComponentScorecardWithScoresById,
    mockGetComponentScorecardWithScoresByIdAllInCompleteCriterias,
  );

  return (
    <DiProvider use={[useGetComponentScorecardWithScoresByIdMock]}>
      <CompassTestProvider>
        <ScorecardFullView
          componentId={MOCK_COMPONENT_ID}
          componentName={MOCK_COMPONENT_NAME}
          scorecardId={MOCK_SCORECARD_ID}
          onClose={onClose}
        />
      </CompassTestProvider>
    </DiProvider>
  );
};

export const ScorecardFullViewMixedComplete = () => {
  const mockGetComponentScorecardWithScoresByIdMixedCompleteCriterias = () => {
    return {
      loading: false,
      error: undefined,
      data: {
        compass: {
          scorecard: mockScorecardWithMixedCriterias as CompassScorecard,
        },
      } as GetComponentScorecardWithScoresByIdQuery,
    };
  };

  const useGetComponentScorecardWithScoresByIdMock = injectable(
    useGetComponentScorecardWithScoresById,
    mockGetComponentScorecardWithScoresByIdMixedCompleteCriterias,
  );

  return (
    <DiProvider use={[useGetComponentScorecardWithScoresByIdMock]}>
      <CompassTestProvider>
        <ScorecardFullView
          componentId={MOCK_COMPONENT_ID}
          componentName={MOCK_COMPONENT_NAME}
          scorecardId={MOCK_SCORECARD_ID}
          onClose={onClose}
        />
      </CompassTestProvider>
    </DiProvider>
  );
};
