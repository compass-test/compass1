import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { MOCK_SCORECARD_APPLIEDTO_COMPONENTS_FIRST_PAGE } from '@atlassian/dragonfruit-scorecards';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { PageScorecardDetails } from './main';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('PageScorecardDetails', () => {
  let result: RenderResult;
  const testId = 'dragonfruit-page-scorecard-details.ui.content';

  describe('useGetScorecard successfully fetches data', () => {
    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider
            mocks={MOCK_SCORECARD_APPLIEDTO_COMPONENTS_FIRST_PAGE}
          >
            <PageScorecardDetails testId={testId} scorecardId="test-id" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    test('Should be found by data-testid', async () => {
      expect(result.getByTestId(testId)).toBeInTheDocument();
    });

    test('Should render scorecard metadata', async () => {
      expect(
        result.getByTestId(
          'dragonfruit-page-scorecard-details.ui.scorecard-metadata',
        ),
      ).toBeInTheDocument();
    });

    test('Should render component list table', async () => {
      expect(
        result.getByTestId(
          'dragonfruit-page-scorecard-details.ui.component-list.table--table',
        ),
      ).toBeInTheDocument();
    });

    test('Should fireUIAnalytics when the edit scorecard button is clicked', async () => {
      const editButton = result.getByTestId(
        'dragonfruit-page-scorecard-details.ui.scorecard-edit.button',
      );
      userEvent.click(editButton);
      expect(editButton).toBeInTheDocument();

      expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'button',
          }),
        }),
        'editScorecard',
        expect.objectContaining({
          scorecardId: 'test-id',
        }),
      );
    });

    test('Edit button should open edit scorecard modal', async () => {
      const editButton = result.getByTestId(
        'dragonfruit-page-scorecard-details.ui.scorecard-edit.button',
      );
      expect(editButton).toBeInTheDocument();
      userEvent.click(editButton);
      expect(
        await result.findByTestId(
          'scorecard-details-edit-scorecard-name-field-container',
        ),
      ).toBeInTheDocument();
    });
  });

  describe('useGetScorecard unsuccessful and returns error', () => {
    test('Should render error state when useGetScorecard GraphQL function returns an error', async () => {
      result = render(
        <CompassTestProvider>
          <ApolloNetworkErrorProvider>
            <PageScorecardDetails testId={testId} scorecardId="test-id" />
          </ApolloNetworkErrorProvider>
        </CompassTestProvider>,
      );

      expect(
        await result.findByTestId(
          'dragonfruit.page-scorecard-details.error-state',
        ),
      ).toBeInTheDocument();

      expect(
        await result.queryByTestId(
          'dragonfruit-page-scorecard-details.ui.scorecard-metadata',
        ),
      ).not.toBeInTheDocument();
      expect(
        await result.queryByTestId(
          'dragonfruit-page-scorecard-details.ui.component-list.table--table',
        ),
      ).not.toBeInTheDocument();
    });
  });
});
