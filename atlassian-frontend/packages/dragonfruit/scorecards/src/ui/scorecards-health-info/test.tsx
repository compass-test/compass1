import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
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
  mockScorecardsWithScoresNoScorecards,
} from './mocks';

import { ScorecardsHealthInfo } from './index';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('Scorecards Health Info', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  let result: RenderResult;

  const TESTID_PREFIX = 'dragonfruit-scorecards.ui.scorecards-health-info';

  describe('when loading', () => {
    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloLoadingProvider>
            <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
          </ApolloLoadingProvider>
        </CompassTestProvider>,
      );
    });

    it('should render the loading state', () => {
      expect(
        result.getByTestId(`${TESTID_PREFIX}-loading`),
      ).toBeInTheDocument();
    });
  });

  describe('when error', () => {
    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloNetworkErrorProvider>
            <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
          </ApolloNetworkErrorProvider>
        </CompassTestProvider>,
      );
    });

    it('should render the error state', () => {
      expect(result.getByTestId(`${TESTID_PREFIX}-error`)).toBeInTheDocument();
    });
  });

  describe('when no scorecards', () => {
    beforeEach(() => {
      const mockGetComponentScorecardsWithScoresNoScorecards = () => {
        return {
          loading: false,
          error: undefined,
          data: {
            compass: {
              component: {
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

      result = render(
        <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
            </ApolloAutoMockProvider>
          </CompassTestProvider>
        </DiProvider>,
      );
    });

    it('should render the no scorecards state', () => {
      expect(
        result.getByTestId(`${TESTID_PREFIX}-no-scorecards`),
      ).toBeInTheDocument();
    });

    it('should render no scorecards', async () => {
      expect(await result.findByText('No scorecards')).toBeInTheDocument();
    });
  });

  describe('when there are unhealthy scorecards', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      const mockGetComponentScorecardsWithScoresAllUnHealthy = () => {
        return {
          loading: false,
          error: undefined,
          data: {
            compass: {
              component: {
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

      result = render(
        <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
            </ApolloAutoMockProvider>
          </CompassTestProvider>
        </DiProvider>,
      );
    });

    it('should render the scorecards summary', async () => {
      const scorecardsHealthInfoButton = result.getByTestId(
        `${TESTID_PREFIX}-scorecards-summary`,
      );
      expect(scorecardsHealthInfoButton).toBeInTheDocument();

      scorecardsHealthInfoButton.click();

      const scorecardsHealthInlineDialog = await result.getByTestId(
        `${TESTID_PREFIX}-scorecards`,
      );
      expect(scorecardsHealthInlineDialog.textContent).toContain(
        '5 of 5 scorecards need attention',
      );
    });
  });

  describe('when there are scorecards', () => {
    beforeEach(() => {
      const mockGetComponentScorecardsWithScoresAllHealthy = () => {
        return {
          loading: false,
          error: undefined,
          data: {
            compass: {
              component: {
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

      result = render(
        <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
            </ApolloAutoMockProvider>
          </CompassTestProvider>
        </DiProvider>,
      );
    });

    it('should render the all healthy scorecards summary', async () => {
      const scorecardsHealthInfoButton = result.getByTestId(
        `${TESTID_PREFIX}-scorecards-summary`,
      );
      expect(scorecardsHealthInfoButton).toBeInTheDocument();

      scorecardsHealthInfoButton.click();

      const scorecardsHealthInlineDialog = await result.getByTestId(
        `${TESTID_PREFIX}-scorecards`,
      );
      expect(scorecardsHealthInlineDialog.textContent).toContain(
        '5 of 5 scorecards in good health',
      );
    });

    it('should fireUIAnalytics on click of scorecards health info', () => {
      const scorecardsHealthInfoButton = result.getByTestId(
        `${TESTID_PREFIX}-scorecards-summary`,
      );
      scorecardsHealthInfoButton.click();

      expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'button',
          }),
        }),
        'scorecardsHealthInfo',
        expect.objectContaining({
          componentId: MOCK_COMPONENT_ID,
          summary: '5 of 5 scorecards in good health',
        }),
      );
    });

    it('should fireUIAnalytics on click of scorecard full view', () => {
      const scorecardsHealthInfoButton = result.getByTestId(
        `${TESTID_PREFIX}-scorecards-summary`,
      );
      scorecardsHealthInfoButton.click();

      const scorecardFullViewButton = result.getByText('Scorecard 1');
      scorecardFullViewButton.click();

      expect(fireUIAnalytics).toHaveBeenCalledTimes(2);
      expect(fireUIAnalytics).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'button',
          }),
        }),
        'scorecardFullView',
        expect.objectContaining({
          componentId: MOCK_COMPONENT_ID,
          scorecardId:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-000000000000',
        }),
      );
    });
  });

  describe('error boundary', () => {
    beforeEach(() => {
      const mockGetComponentScorecardsWithScoresWithException = () => {
        // this is just to simulate some sort of exception being thrown
        throw new TypeError();
      };

      const useGetComponentScorecardsWithScoresMock = injectable(
        useGetComponentScorecardsWithScores,
        mockGetComponentScorecardsWithScoresWithException,
      );

      result = render(
        <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <ScorecardsHealthInfo componentId={MOCK_COMPONENT_ID} />
            </ApolloAutoMockProvider>
          </CompassTestProvider>
        </DiProvider>,
      );
    });

    it('should render the error boundary', () => {
      expect(
        result.getByTestId(`${TESTID_PREFIX}-error-boundary`),
      ).toBeInTheDocument();
    });
  });
});
