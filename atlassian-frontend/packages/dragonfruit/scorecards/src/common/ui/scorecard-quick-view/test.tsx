import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import {
  CompassComponentType,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardFragment } from '../../../common/ui/types';

import ScorecardQuickView from './main';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('ScorecardQuickView', () => {
  describe('testId property', () => {
    const testId = 'scorecard-quick-view';
    const scorecard: ScorecardFragment = {
      id: 'fake-id',
      name: 'Foo',
      description: 'Foo Description',
      componentType: CompassComponentType.SERVICE,
      importance: CompassScorecardImportance.REQUIRED,
      owner: {
        name: 'John Doe',
        picture: 'https://gravatar.com/avatar/john.doe.png',
      },
      scorecardScore: {
        totalScore: 5,
        maxTotalScore: 10,
      },
      criterias: [],
    };

    test('Should be found by data-testid', async () => {
      const { getByTestId } = render(
        <CompassTestProvider>
          <ScorecardQuickView
            componentId={'dummyId'}
            scorecard={scorecard}
            onScorecardFullViewOpen={() => {}}
            testId={testId}
          />
        </CompassTestProvider>,
      );

      expect(getByTestId(testId)).toBeTruthy();
    });

    test('Should fire analytics event when expanding QuickView', async () => {
      const { getByTestId } = render(
        <CompassTestProvider>
          <ScorecardQuickView
            componentId={'dummyId'}
            scorecard={scorecard}
            onScorecardFullViewOpen={() => {}}
            testId={testId}
          />
        </CompassTestProvider>,
      );

      const toggle = getByTestId('scorecard-quick-view.toggle');

      // Expand the card
      act(() => {
        userEvent.click(toggle);
      });

      expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'button',
          }),
        }),
        'scorecardExpand',
        expect.objectContaining({
          componentId: 'dummyId',
          componentType: CompassComponentType.SERVICE.toString(),
          scorecardName: 'Foo',
          scorecardScore: 5,
        }),
      );
    });
  });
});
