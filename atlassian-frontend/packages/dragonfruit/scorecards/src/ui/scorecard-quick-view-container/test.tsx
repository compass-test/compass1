import React from 'react';

import { render } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import {
  ApolloAutoMockProvider,
  ApolloLoadingProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { useGetComponentScorecardsWithScores } from '../../services/get-component-scorecards-with-scores';

import {
  ComponentWithErrorForScorecardWithScoreMockData,
  ComponentWithMultipleScorecardWithScoreMockData,
  ComponentWithNoScorecardsWithScoreMockData,
  ComponentWithOneScorecardWithScoreMockData,
} from './mocks';

import ScorecardQuickViewContainer from './index';

describe('ScorecardQuickViewContainer', () => {
  test('should display a spinner when the app is in loading state', async () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloLoadingProvider>
          <ScorecardQuickViewContainer componentId="fake-com ponent-1" />
        </ApolloLoadingProvider>
      </CompassTestProvider>,
    );

    // Assert the spinner is displayed
    expect(
      getByTestId('dragonfruit-scorecard-quick-view-container-spinner'),
    ).toBeInTheDocument();
  });

  test('Should display one scorecard if component has one scorecard', async () => {
    const useGetComponentScorecardsWithScoresMock = injectable(
      useGetComponentScorecardsWithScores,
      ComponentWithOneScorecardWithScoreMockData,
    );

    const { getByTestId } = render(
      <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <ScorecardQuickViewContainer componentId="fake-component-1" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );

    // Currently the testId of the ScorecardQuickView components are set to `scorecard={index}`
    expect(getByTestId('scorecard-0')).toBeInTheDocument();
  });

  test('Should display all the scorecards if component has multiple scorecards', async () => {
    const useGetComponentScorecardsWithScoresMock = injectable(
      useGetComponentScorecardsWithScores,
      ComponentWithMultipleScorecardWithScoreMockData,
    );

    const { getByTestId } = render(
      <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <ScorecardQuickViewContainer componentId="fake-component-1" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );

    // Currently the testId of the ScorecardQuickView components are set to `scorecard={index}`
    expect(getByTestId('scorecard-0')).toBeInTheDocument();
    expect(getByTestId('scorecard-1')).toBeInTheDocument();
    expect(getByTestId('scorecard-2')).toBeInTheDocument();
  });

  describe('handle errors', () => {
    const useGetComponentScorecardsWithScoresMock = injectable(
      useGetComponentScorecardsWithScores,
      () => {
        throw new Error('Trigger Error Boundary');
      },
    );

    test('Error boundary should catch unexpected errors', async () => {
      const { queryByText } = render(
        <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
          <CompassTestProvider>
            <ScorecardQuickViewContainer componentId="fake-component-1" />
          </CompassTestProvider>
          ,
        </DiProvider>,
      );

      expect(queryByText('Oops! Something went wrong')).toBeInTheDocument();
    });
  });

  test('should display LoadFailure when the QuickViewContainer fails to fetch a scorecard', async () => {
    const testId = 'dragonfruit-scorecard-quick-view-load-failure';
    const useGetComponentScorecardsWithScoresMock = injectable(
      useGetComponentScorecardsWithScores,
      ComponentWithErrorForScorecardWithScoreMockData,
    );

    const { getByTestId } = render(
      <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <ScorecardQuickViewContainer componentId="fake-component-1" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  test('should display empty state when no scorecards found in the backend', async () => {
    const useGetComponentScorecardsWithScoresMock = injectable(
      useGetComponentScorecardsWithScores,
      ComponentWithNoScorecardsWithScoreMockData,
    );

    const { getByTestId, queryByTestId } = render(
      <DiProvider use={[useGetComponentScorecardsWithScoresMock]}>
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <ScorecardQuickViewContainer componentId="fake-component-1" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );

    // Currently the testId of the ScorecardQuickView components are set to `scorecard={index}`
    // In this case we're asserting the negative case that no scorecards are present
    expect(queryByTestId('scorecard-0')).toBeNull();
    expect(getByTestId('no-scorecards')).toBeInTheDocument();
  });
});
