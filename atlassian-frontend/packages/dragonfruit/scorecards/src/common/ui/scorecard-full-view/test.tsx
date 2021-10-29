import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import { GetComponentScorecardWithScoresByIdQuery } from '@atlassian/dragonfruit-graphql';
import {
  ApolloLoadingProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useGetComponentScorecardWithScoresById } from '../../../services/get-component-scorecard-with-scores-by-id';

import ScorecardFullView from './main';
import {
  MOCK_COMPONENT_ID,
  MOCK_COMPONENT_NAME,
  MOCK_SCORECARD_ID,
  mockScorecardWithMixedCriterias,
  onClose,
} from './mocks';

describe('ScorecardFullView', () => {
  let result: RenderResult;

  describe('loading', () => {
    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloLoadingProvider>
            <ScorecardFullView
              componentId={MOCK_COMPONENT_ID}
              componentName={MOCK_COMPONENT_NAME}
              scorecardId={MOCK_SCORECARD_ID}
              onClose={onClose}
            />
          </ApolloLoadingProvider>
        </CompassTestProvider>,
      );
    });

    test('should be found by testId', async () => {
      expect(
        result.getByTestId('scorecard-full-view-loading'),
      ).toBeInTheDocument();
    });
  });

  describe('error', () => {
    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloNetworkErrorProvider>
            <ScorecardFullView
              componentId={MOCK_COMPONENT_ID}
              componentName={MOCK_COMPONENT_NAME}
              scorecardId={MOCK_SCORECARD_ID}
              onClose={onClose}
            />
          </ApolloNetworkErrorProvider>
        </CompassTestProvider>,
      );
    });

    test('should be found by testId', async () => {
      expect(
        result.getByTestId('scorecard-full-view-error'),
      ).toBeInTheDocument();
    });
  });

  describe('success', () => {
    const mockGetComponentScorecardWithScoresById = (
      componentId: string,
      scorecardId: string,
    ) => {
      return {
        loading: false,
        error: undefined,
        data: {
          compass: {
            scorecard: mockScorecardWithMixedCriterias,
          },
        } as GetComponentScorecardWithScoresByIdQuery,
      };
    };

    const useGetComponentScorecardWithScoresByIdMock = injectable(
      useGetComponentScorecardWithScoresById,
      mockGetComponentScorecardWithScoresById,
    );

    beforeEach(() => {
      result = render(
        <DiProvider use={[useGetComponentScorecardWithScoresByIdMock]}>
          <CompassTestProvider>
            <ScorecardFullView
              componentId={MOCK_COMPONENT_ID}
              componentName={MOCK_COMPONENT_NAME}
              scorecardId={MOCK_SCORECARD_ID}
              onClose={onClose}
            />
          </CompassTestProvider>
        </DiProvider>,
      );
    });

    test('should be found by testId', async () => {
      expect(result.getByTestId('scorecard-full-view')).toBeInTheDocument();
    });

    test('should have scorecard title', async () => {
      expect(
        result.getByTestId('scorecard-full-view-summary-scorecard-name'),
      ).toBeInTheDocument();
    });

    test('should have scorecard description', async () => {
      expect(
        result.getByTestId('scorecard-full-view-summary-scorecard-description'),
      ).toBeInTheDocument();
    });

    test('should have progress', async () => {
      expect(result.getByText('55')).toBeInTheDocument();
    });

    test('should have owner name', async () => {
      expect(result.getByText('John Doe')).toBeInTheDocument();
    });

    test('should have component name', async () => {
      expect(result.getByText(MOCK_COMPONENT_NAME)).toBeInTheDocument();
    });

    test('should have scorecard importance', async () => {
      expect(result.getByText('User Defined')).toBeInTheDocument();
    });

    test('should have not completed criteria', async () => {
      expect(result.getByText('NOT COMPLETED')).toBeInTheDocument();
      expect(result.getByText('Service has an owner team')).toBeInTheDocument();
      expect(result.getByText('Service has a dashboard')).toBeInTheDocument();
      expect(result.getByText('Service has a project')).toBeInTheDocument();
    });

    test('should have completed criteria', async () => {
      expect(result.getByText('COMPLETED')).toBeInTheDocument();
      expect(result.getByText('Service has a description')).toBeInTheDocument();
      expect(
        result.getByText('Service has a chat channel'),
      ).toBeInTheDocument();
      expect(result.getByText('Service has documentation')).toBeInTheDocument();
      expect(result.getByText('Service has a repository')).toBeInTheDocument();
    });

    test("should have the 'Manage scorecards' button", async () => {
      expect(result.getByText('Manage scorecards')).toBeInTheDocument();
    });
  });
});
