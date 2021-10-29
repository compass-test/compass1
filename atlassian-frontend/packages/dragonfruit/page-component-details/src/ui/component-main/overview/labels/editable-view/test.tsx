import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CompassComponentLabelForUI } from '../../../../../common/types';

import { LabelsEditableView } from './index';

const MOCK_LABELS: Array<CompassComponentLabelForUI> = [
  {
    name: 'label1',
  },
];

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('LabelsEditableView', () => {
  describe('empty state', () => {
    test('should fire analytics event when opening edit view', async () => {
      const { getByTestId } = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider>
            <LabelsEditableView componentId="dummyId" labels={[]} />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      // Click on empty state to enter edit view
      act(() => {
        userEvent.click(
          getByTestId(
            'pollinator.page-component-details.labels-editable-view.empty-state',
          ),
        );
      });

      expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'opened',
            actionSubject: 'componentLabelsEditView',
          }),
        }),
      );
    });
  });

  describe('read view', () => {
    test('should fire analytics event when opening edit view', async () => {
      const { getByTestId } = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider>
            <LabelsEditableView componentId="dummyId" labels={MOCK_LABELS} />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      // Click on read view to enter edit view
      act(() => {
        userEvent.click(
          getByTestId(
            'pollinator.page-component-details.labels-editable-view.read-view',
          ),
        );
      });

      // Two events are fired at the moment because clicking on a label
      // causes the edit view to be opened. This may change in the future
      // if we introduce a different behaviour for clicking on a label.
      expect(fireUIAnalytics).toHaveBeenCalledTimes(2);
      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'opened',
            actionSubject: 'componentLabelsEditView',
          }),
        }),
      );
    });
  });
});
