import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CriteriaFragment } from '../../types';

import { QuickViewDetails } from './index';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('QuickViewDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('testId property', () => {
    test('Should be found by data-testid', () => {
      const testId = 'quickViewDetails';

      const criterias: CriteriaFragment[] = [
        {
          __typename: 'CompassHasDescriptionScorecardCriteria',
          id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
          weight: 100,
          scorecardCriteriaScore: {
            score: 1,
            maxScore: 1,
          },
        },
      ];
      const scorecardId = 'fake-id';
      const onScorecardFullViewOpen = () => {};

      const { getByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <QuickViewDetails
              testId={testId}
              componentId="fake-component-id"
              scorecardId={scorecardId}
              scorecardName="fake-scorecard-name"
              scorecardImportance={CompassScorecardImportance.REQUIRED}
              criterias={criterias}
              onScorecardFullViewOpen={onScorecardFullViewOpen}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(getByTestId(`${testId}.details`)).toBeTruthy();
    });
  });

  describe('criteria rows', () => {
    test('Should render incomplete and complete criteria sections with mock criteria data', () => {
      const criterias: CriteriaFragment[] = [
        {
          __typename: 'CompassHasDescriptionScorecardCriteria',
          id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
          weight: 50,
          scorecardCriteriaScore: {
            score: 1,
            maxScore: 1,
          },
        },
        {
          __typename: 'CompassHasOwnerScorecardCriteria',
          id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
          weight: 50,
          scorecardCriteriaScore: {
            score: 0,
            maxScore: 1,
          },
        },
      ];
      const scorecardId = 'fake-id';
      const onScorecardFullViewOpen = () => {};

      const { queryByText } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <QuickViewDetails
              componentId="fake-component-id"
              scorecardId={scorecardId}
              scorecardName="fake-scorecard-name"
              scorecardImportance={CompassScorecardImportance.REQUIRED}
              criterias={criterias}
              onScorecardFullViewOpen={onScorecardFullViewOpen}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(queryByText('Not completed')).toBeInTheDocument();
      // TODO: assert criteria text is what we'd expect

      expect(queryByText('Completed')).toBeInTheDocument();
      // TODO: assert criteria text is what we'd expect
    });

    test('Should render neither incomplete nor complete criteria sections with empty array', () => {
      const criterias: CriteriaFragment[] = [];
      const scorecardId = 'fake-id';
      const onScorecardFullViewOpen = () => {};

      const { queryByText } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <QuickViewDetails
              componentId="fake-component-id"
              scorecardId={scorecardId}
              scorecardName="fake-scorecard-name"
              scorecardImportance={CompassScorecardImportance.REQUIRED}
              criterias={criterias}
              onScorecardFullViewOpen={onScorecardFullViewOpen}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(queryByText('Not completed')).toBeNull();
      expect(queryByText('Completed')).toBeNull();
    });
  });

  describe('no criterias', () => {
    test('Should render NoCriteria', () => {
      const criterias: CriteriaFragment[] = [];
      const scorecardId = 'fake-id';
      const onScorecardFullViewOpen = () => {};

      const { getByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <QuickViewDetails
              componentId="fake-component-id"
              scorecardId={scorecardId}
              scorecardName="fake-scorecard-name"
              scorecardImportance={CompassScorecardImportance.REQUIRED}
              criterias={criterias}
              onScorecardFullViewOpen={onScorecardFullViewOpen}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(getByTestId('no-criteria')).toBeInTheDocument();
    });
  });

  describe('View scorecard button', () => {
    let criterias: CriteriaFragment[];
    let scorecardId: string;
    let onScorecardFullViewOpen: Function;

    beforeEach(() => {
      criterias = [
        {
          __typename: 'CompassHasDescriptionScorecardCriteria',
          id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
          weight: 100,
          scorecardCriteriaScore: {
            score: 1,
            maxScore: 1,
          },
        },
      ];
      scorecardId = 'fake-id';
      onScorecardFullViewOpen = jest.fn();
    });

    it('should render View scorecard button', () => {
      const result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <QuickViewDetails
              componentId="fake-component-id"
              scorecardId={scorecardId}
              scorecardName="fake-scorecard-name"
              scorecardImportance={CompassScorecardImportance.REQUIRED}
              criterias={criterias}
              onScorecardFullViewOpen={onScorecardFullViewOpen}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(
        result.queryByTestId('quick-view-details-view-scorecard-button'),
      ).toBeInTheDocument();

      // should be clickable
      fireEvent.click(result.getByText(/View scorecard/i));
      expect(onScorecardFullViewOpen).toHaveBeenCalled();
    });
  });

  describe('remove scorecard button', () => {
    const criterias: CriteriaFragment[] = [
      {
        __typename: 'CompassHasDescriptionScorecardCriteria',
        id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
        weight: 100,
        scorecardCriteriaScore: {
          score: 1,
          maxScore: 1,
        },
      },
    ];
    let onScorecardFullViewOpen: Function = () => {};

    it('should not display remove scorecard button', () => {
      const result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <QuickViewDetails
              componentId="fake-component-id"
              scorecardId="fake-scorecard-id"
              scorecardName="fake-scorecard-name"
              scorecardImportance={CompassScorecardImportance.REQUIRED}
              criterias={criterias}
              onScorecardFullViewOpen={onScorecardFullViewOpen}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(
        result.queryByTestId('quick-view-details-remove-button'),
      ).not.toBeInTheDocument();
    });

    describe('when the scorecardImportance is NOT REQUIRED', () => {
      it('should display remove scorecard button', () => {
        const result = render(
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <QuickViewDetails
                componentId="fake-component-id"
                scorecardId="fake-scorecard-id"
                scorecardName="fake-scorecard-name"
                scorecardImportance={CompassScorecardImportance.RECOMMENDED}
                criterias={criterias}
                onScorecardFullViewOpen={onScorecardFullViewOpen}
              />
            </ApolloAutoMockProvider>
          </CompassTestProvider>,
        );

        expect(
          result.queryByTestId('quick-view-details-remove-button'),
        ).toBeInTheDocument();
      });

      it('should fireUIAnalytics when remove scorecard button is clicked', () => {
        const result = render(
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <QuickViewDetails
                componentId="fake-component-id"
                scorecardId="fake-scorecard-id"
                scorecardName="fake-scorecard-name"
                scorecardImportance={CompassScorecardImportance.RECOMMENDED}
                criterias={criterias}
                onScorecardFullViewOpen={onScorecardFullViewOpen}
              />
            </ApolloAutoMockProvider>
          </CompassTestProvider>,
        );

        const removeButton = result.queryByTestId(
          'quick-view-details-remove-button',
        );

        expect(removeButton).toBeInTheDocument();
        removeButton?.click();

        expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
        expect(fireUIAnalytics).toHaveBeenCalledWith(
          expect.objectContaining({
            payload: expect.objectContaining({
              action: 'clicked',
              actionSubject: 'button',
            }),
          }),
          'removeScorecard',
          expect.objectContaining({
            componentId: 'fake-component-id',
            scorecardId: 'fake-scorecard-id',
            scorecardName: 'fake-scorecard-name',
            scorecardImportance: 'RECOMMENDED',
          }),
        );
      });
    });
  });
});
